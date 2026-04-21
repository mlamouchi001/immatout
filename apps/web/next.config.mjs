/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@immatout/calc', '@immatout/data'],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
