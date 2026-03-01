import type { MetadataRoute } from 'next';
import seo from '@/config/seo.json';

const baseUrl = (seo as { url: string }).url.replace(/\/$/, '');
const name = (seo as { siteName: string }).siteName;
const description = (seo as { description: string }).description;
const ogImage = (seo as { image: string }).image;

export default function manifest(): MetadataRoute.Manifest {
    return {
        name,
        short_name: name,
        description,
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#0a0a0a',
        icons: [
            {
                src: `${baseUrl}/icon`,
                sizes: '32x32',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
                sizes: '1200x630',
                type: 'image/png',
                purpose: 'any',
            },
        ],
    };
}
