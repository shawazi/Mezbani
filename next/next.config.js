/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    },
    optimizePackageImports: ['@mui/material', '@mui/icons-material']
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        mui: {
          test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
          name: 'mui',
          chunks: 'all',
          priority: 40,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 30,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 20,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 10,
        },
      },
    };

    // Add any additional webpack optimizations here
    if (!dev && !isServer) {
      config.optimization.moduleIds = 'deterministic';
      config.optimization.runtimeChunk = {
        name: 'runtime',
      };
    }

    return config;
  },
}

module.exports = nextConfig;
