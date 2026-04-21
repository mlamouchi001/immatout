/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@immatout/calc', '@immatout/data', '@immatout/vehicle-catalog'],
  output: 'standalone',
};

export default nextConfig;
