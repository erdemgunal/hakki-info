import type { MetadataRoute } from 'next';
import seo from '@/config/seo.json';

const baseUrl = (seo as { url: string }).url.replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
