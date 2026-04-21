/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@immatout/calc', '@immatout/data'],
  output: 'standalone',
};

export default nextConfig;
