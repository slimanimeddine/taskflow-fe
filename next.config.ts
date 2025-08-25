import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [new URL("http://localhost:8000/storage/**")],
  },
};

export default nextConfig;
