import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        'https://taskflow-be-e9cwcqfrgmd9cngf.francecentral-01.azurewebsites.net/storage/**'
      ),
      new URL('http://localhost:8000/storage/**'),
    ],
  },
}

export default nextConfig
