/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
    formats: ["image/webp"],
  },
  experimental: { images: { layoutRaw: true } },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
