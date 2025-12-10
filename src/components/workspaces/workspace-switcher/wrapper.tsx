"use client";

import { useListAuthenticatedUserWorkspaces } from "@/hooks/endpoints/workspaces";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
import ErrorUI from "../../error-ui";
import LoadingUI from "../../loading-ui";
import WorkspaceSwitcher from ".";

export default function WorkspaceSwitcherWrapper() {
  const { token } = useSession();

  const { isPending, isError, data, error } =
    useListAuthenticatedUserWorkspaces(authHeader(token));

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return <div></div>;
  }

  return <WorkspaceSwitcher workspaces={data.data} />;
}
