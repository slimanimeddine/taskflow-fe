import "server-only";

import { isAxiosError } from "axios";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getSession } from "@/actions/session";
import { showAuthenticatedUserMember } from "@/hooks/endpoints/members";

export const verifyAuth = cache(async () => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  if (!(session?.id && session?.token)) {
    redirect("/sign-in");
  }

  return { isAuth: true, id: session.id, token: session.token };
});

export const verifyMember = async (token: string, workspaceId: string) => {
  let isMember = false;
  try {
    await showAuthenticatedUserMember(workspaceId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    isMember = true;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      isMember = false;
    }
  }

  return isMember;
};
