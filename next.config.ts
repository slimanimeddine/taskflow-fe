import type { NextConfig } from "next";

import "./src/env/client";
import "./src/env/server";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [new URL("http://localhost:8000/storage/**")],
  },
};

export default nextConfig;
