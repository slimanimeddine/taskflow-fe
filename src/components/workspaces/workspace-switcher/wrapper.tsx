"use client";

import { useListAuthenticatedUserWorkspaces } from "@/hooks/endpoints/workspaces";
import { authHeader } from "@/lib/utils";
import LoadingUI from "../../loading-ui";
import ErrorUI from "../../error-ui";
import WorkspaceSwitcher from ".";
import { useSession } from "@/hooks/use-session";

export default function WorkspaceSwitcherWrapper() {
  const { token } = useSession();

  const { isPending, isError, data, error } =
    useListAuthenticatedUserWorkspaces(authHeader(token));

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error?.message ?? "Something went wrong!"} />;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <></>;
  }

  return <WorkspaceSwitcher workspaces={data.data} />;
}
