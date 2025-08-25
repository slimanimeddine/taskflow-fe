import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    SESSION_SECRET: z.base64().min(1),
  },
  experimental__runtimeEnv: process.env,
});
