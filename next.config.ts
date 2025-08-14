import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      new URL('http://localhost:8000/storage/**'),
    ],
  },
}

export default nextConfig
