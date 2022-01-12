/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.google.com", "i1.wp.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
