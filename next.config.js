/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost:3001',
        port: '',
        pathname: '**',
      },
    ],
  },
};


module.exports = nextConfig;
