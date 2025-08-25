"use server";

import { decrypt, encrypt } from "@/lib/encryption";
import { sessionCookieSchema } from "@/schemas/authentication";
import { type Session } from "@/types/misc";
import { cookies } from "next/headers";
import z from "zod/v4";

export async function getSession(): Promise<Session | undefined> {
  const cookie = (await cookies()).get("session")?.value;
  const session = (await decrypt(cookie)) as Session;

  if (!session) {
    return undefined;
  }

  return session;
}

export async function createSession(id: string, token: string) {
  const validatedFields = sessionCookieSchema.safeParse({
    id,
    token,
  });

  if (!validatedFields.success) {
    return {
      errors: {
        id: z.treeifyError(validatedFields.error).properties?.id?.errors,
        token: z.treeifyError(validatedFields.error).properties?.token?.errors,
      },
    };
  } else {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ id, token });
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  }
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
