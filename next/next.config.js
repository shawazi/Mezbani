/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/mezbani-14d1e.appspot.com/**',
      },
    ],
    unoptimized: true,  
  },
};

module.exports = nextConfig;
