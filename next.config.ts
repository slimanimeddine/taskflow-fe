import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname:
          'taskflow-be-e9cwcqfrgmd9cngf.francecentral-01.azurewebsites.net',
        pathname: '/storage/**',
      },
    ],
  },
}

export default nextConfig
