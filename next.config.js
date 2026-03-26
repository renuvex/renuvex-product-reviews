/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.trycloudflare.com'],
  env: {
    NEXT_PUBLIC_DEPLOY_URL: process.env.NEXT_PUBLIC_DEPLOY_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;