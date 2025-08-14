import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
    
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      }
    ],
  },
};

export default withNextIntl(nextConfig);