/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["sized.babmon.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://sized.babmon.com/:path*",
      },
    ]
  },
}

module.exports = nextConfig
