import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/blog/:slug.md', destination: '/api/blog-markdown/:slug' },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        // Limit to your public asset repo used by blog images
        pathname: '/gh/erdemgunal/hakki-info-assets@latest/**',
      },
    ],
  },
};

export default nextConfig;