import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { getReadTimeMinutes } from './read-time-utils';
import { fetchUmamiPathsPageviews, type UmamiTimeRangeKey } from './umami-api';

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string;
    lastUpdated?: string;
    images: string[];
    excerpt: string;
    status: string;
    readTimeMinutes: number;
    tags: string[];
    viewCount?: number;
    score?: number;
    isPromoted?: boolean;
}

export interface BlogPost extends BlogPostMeta {
    content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PublishedBlogSitemapEntry {
    slug: string;
    lastUpdated?: string;
    /** Absolute or relative image URLs from frontmatter (for image sitemap). */
    images?: string[];
}

/** Lightweight list of published blog slugs + lastUpdated + images for sitemap (no Umami). */
export async function getPublishedBlogSlugsForSitemap(): Promise<PublishedBlogSitemapEntry[]> {
    const entries = await fs.readdir(BLOG_DIR);
    const files = entries.filter((file) => file.endsWith('.mdx'));
    const results = await Promise.all(
        files.map(async (file): Promise<PublishedBlogSitemapEntry | null> => {
            const slug = file.replace(/\.mdx$/, '');
            const fullPath = path.join(BLOG_DIR, file);
            const source = await fs.readFile(fullPath, 'utf8');
            const { data } = matter(source);
            const status = (data.status as string) || 'draft';
            if (status !== 'published') return null;
            const lastUpdated = (data.lastUpdated as string) || undefined;
            let images: string[] | undefined;
            if (Array.isArray(data.images) && data.images.length > 0) {
                images = (data.images as string[]).filter((u) => typeof u === 'string' && u.trim());
            } else if (typeof data.image === 'string' && data.image.trim().length > 0) {
                images = [data.image.trim()];
            }
            return { slug, ...(lastUpdated && { lastUpdated }), ...(images?.length && { images }) };
        })
    );
    return results.filter((p): p is PublishedBlogSitemapEntry => p != null);
}

export type BlogSortBy = 'date' | 'views' | 'score';

export interface GetBlogPostsOptions {
    sortBy?: BlogSortBy;
    viewsPeriod?: UmamiTimeRangeKey;
    promoteLowViews?: number;
}

/** Days threshold for recency scoring */
const RECENCY_14_DAYS = 14;
const RECENCY_30_DAYS = 30;
const UNDERDOG_AGE_DAYS = 60;
const UNDERDOG_VIEW_THRESHOLD = 100;

/** Calculate days since a date string */
function daysSince(dateStr: string): number {
    if (!dateStr) return Infinity;
    const d = new Date(dateStr);
    const now = new Date();
    return (now.getTime() - d.getTime()) / (24 * 60 * 60 * 1000);
}

export interface CalculateScoreParams {
    date: string;
    lastUpdated?: string;
    viewCount: number;
    similarityScore?: number;
}

/**
 * Hybrid scoring for blog posts. Future-proof: accepts similarityScore for vector embedding.
 */
export function calculateScore(params: CalculateScoreParams): number {
    const {
        date,
        lastUpdated,
        viewCount,
        similarityScore = 1.0,
    } = params;

    let score = 0;

    // Recency: +50 (last 14 days), +20 (last 30 days)
    const days = daysSince(date);
    if (days <= RECENCY_14_DAYS) score += 50;
    else if (days <= RECENCY_30_DAYS) score += 20;

    // Engagement: log10(views + 1) * 10
    score += Math.log10(viewCount + 1) * 10;

    // Underdog Boost: +15 if >60 days old AND views < 100
    if (days > UNDERDOG_AGE_DAYS && viewCount < UNDERDOG_VIEW_THRESHOLD) {
        score += 15;
    }

    // Update Boost: lastUpdated within 14 days = +25, within 30 days = +10
    if (lastUpdated) {
        const updateDays = daysSince(lastUpdated);
        if (updateDays <= RECENCY_14_DAYS) score += 25;
        else if (updateDays <= RECENCY_30_DAYS) score += 10;
    }

    return Math.round(score * similarityScore);
}

export async function getBlogPosts(options?: GetBlogPostsOptions): Promise<BlogPostMeta[]> {
    const { sortBy = 'score', viewsPeriod = 'allTime', promoteLowViews = 2 } = options ?? {};
    const entries = await fs.readdir(BLOG_DIR);
    const files = entries.filter((file) => file.endsWith('.mdx'));

    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/\.mdx$/, '');
            const fullPath = path.join(BLOG_DIR, file);
            const source = await fs.readFile(fullPath, 'utf8');
            const { data, content } = matter(source);
            const status = (data.status as string) || 'draft';
            const readTimeMinutes = getReadTimeMinutes(content ?? '');
            const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];

            let images: string[] = [];
            if (Array.isArray(data.images)) {
                images = data.images as string[];
            } else if (typeof data.image === 'string' && data.image.trim().length > 0) {
                images = [data.image.trim()];
            }

            return {
                slug,
                title: (data.title as string) || slug,
                date: (data.date as string) || '',
                lastUpdated: (data.lastUpdated as string) || undefined,
                images,
                excerpt: (data.excerpt as string) || '',
                status,
                readTimeMinutes,
                tags,
            } as BlogPostMeta;
        })
    );

    const published = posts.filter((post) => post.status === 'published');

    if (sortBy === 'date') {
        return published.sort((a, b) => (a.date < b.date ? 1 : -1));
    }

    const pathRows = await fetchUmamiPathsPageviews(
        viewsPeriod === 'allTime' ? 'allTime' : viewsPeriod,
        { limit: 500 }
    );

    const viewsByPath = new Map<string, number>();
    for (const row of pathRows) {
        viewsByPath.set(row.x, row.y);
    }

    const withViews = published.map((post) => {
        const path = `/blog/${post.slug}`;
        const viewCount = viewsByPath.get(path) ?? 0;

        const score = calculateScore({
            date: post.date,
            lastUpdated: post.lastUpdated,
            viewCount,
            similarityScore: 1.0,
        });

        return {
            ...post,
            viewCount,
            score,
        };
    });

    // Sort by score descending
    const sorted = withViews.sort((a, b) => {
        const scoreA = a.score ?? 0;
        const scoreB = b.score ?? 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return (a.date < b.date ? 1 : -1);
    });

    // isPromoted: top N lowest-viewed posts (underdogs) get promoted
    const promoteCount = Math.max(0, promoteLowViews);
    if (promoteCount > 0 && sorted.length > promoteCount) {
        const byViewsAsc = [...sorted].sort((a, b) => {
            const va = a.viewCount ?? 0;
            const vb = b.viewCount ?? 0;
            if (va !== vb) return va - vb;
            return (a.date < b.date ? 1 : -1);
        });
        const promotedSlugs = new Set(byViewsAsc.slice(0, promoteCount).map((p) => p.slug));
        return sorted.map((p) => ({
            ...p,
            isPromoted: promotedSlugs.has(p.slug),
        }));
    }

    return sorted;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);

    try {
        const source = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(source);
        const status = (data.status as string) || 'draft';

        let images: string[] = [];
        if (Array.isArray(data.images)) {
            images = data.images as string[];
        } else if (typeof data.image === 'string' && data.image.trim().length > 0) {
            images = [data.image.trim()];
        }

        if (status !== 'published') {
            return null;
        }

        const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];

        return {
            slug,
            title: (data.title as string) || slug,
            date: (data.date as string) || '',
            lastUpdated: (data.lastUpdated as string) || undefined,
            images,
            excerpt: (data.excerpt as string) || '',
            status,
            readTimeMinutes: getReadTimeMinutes(content),
            tags,
            content: content.trim(),
        };
    } catch {
        return null;
    }
}
