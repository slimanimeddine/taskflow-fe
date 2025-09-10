import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./src/env/client.ts");
await jiti.import("./src/env/server.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [new URL("http://localhost:8000/storage/**")],
  },
};

export default nextConfig;
