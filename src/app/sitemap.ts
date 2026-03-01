import type { MetadataRoute } from 'next';
import { getPublishedBlogSlugsForSitemap } from '@/lib/blog';
import { getProjectSlugs, fetchProjectBySlug } from '@/lib/fetch-resume-data';
import seo from '@/config/seo.json';

const baseUrl = (seo as { url: string }).url.replace(/\/$/, '');

/** Turn relative image paths into absolute URLs for the sitemap. */
function toAbsoluteImageUrls(images: string[]): string[] {
    return images.map((src) =>
        src.startsWith('http://') || src.startsWith('https://') ? src : `${baseUrl}${src.startsWith('/') ? '' : '/'}${src}`
    );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [blogEntriesRaw, projectSlugs] = await Promise.all([
        getPublishedBlogSlugsForSitemap(),
        getProjectSlugs(),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];

    const blogEntries: MetadataRoute.Sitemap = blogEntriesRaw.map(({ slug, lastUpdated, images }) => {
        const entry: MetadataRoute.Sitemap[number] = {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: lastUpdated ? new Date(lastUpdated) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        };
        if (images?.length) {
            entry.images = toAbsoluteImageUrls(images);
        }
        return entry;
    });

    const projectsWithImages = await Promise.all(
        projectSlugs.map(async (slug) => {
            const project = await fetchProjectBySlug(slug);
            return { slug, images: project?.images ?? [] };
        })
    );

    const projectEntries: MetadataRoute.Sitemap = projectsWithImages.map(({ slug, images }) => {
        const entry: MetadataRoute.Sitemap[number] = {
            url: `${baseUrl}/projects/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        };
        if (images.length) {
            entry.images = toAbsoluteImageUrls(images);
        }
        return entry;
    });

    return [...staticRoutes, ...blogEntries, ...projectEntries];
}
