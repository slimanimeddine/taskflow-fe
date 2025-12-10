import { jwtVerify, SignJWT } from "jose";
import "server-only";
import { env } from "@/env/server";
import type { SessionPayload } from "../types/misc";

const encodedKey = new TextEncoder().encode(env.SESSION_SECRET);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (_error) {
    console.log("Failed to verify session");
  }
}
