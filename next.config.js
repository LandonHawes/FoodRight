/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["img.buzzfeed.com"],
  },
};

module.exports = nextConfig;
