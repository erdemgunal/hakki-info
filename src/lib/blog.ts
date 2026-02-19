import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { getReadTimeMinutes } from './read-time-utils';

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    status: string;
    readTimeMinutes: number;
    tags: string[];
}

export interface BlogPost extends BlogPostMeta {
    content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'data', 'blog');

export async function getBlogPosts(): Promise<BlogPostMeta[]> {
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

            return {
                slug,
                title: (data.title as string) || slug,
                date: (data.date as string) || '',
                excerpt: (data.excerpt as string) || '',
                status,
                readTimeMinutes,
                tags,
            } as BlogPostMeta;
        })
    );

    const published = posts.filter((post) => post.status === 'published');
    return published.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
    
    try {
        const source = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(source);
        const status = (data.status as string) || 'draft';

        if (status !== 'published') {
            return null;
        }

        const tags = Array.isArray(data.tags) ? (data.tags as string[]) : [];

        return {
            slug,
            title: (data.title as string) || slug,
            date: (data.date as string) || '',
            excerpt: (data.excerpt as string) || '',
            status,
            readTimeMinutes: getReadTimeMinutes(content),
            tags,
            content: content.trim(),
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

