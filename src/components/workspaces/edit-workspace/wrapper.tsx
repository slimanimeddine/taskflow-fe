"use client";

import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useShowWorkspace } from "@/hooks/endpoints/workspaces";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
import EditWorkspaceForm from "./form";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";

export default function EditWorkspaceWrapper() {
  const { token } = useSession();
  const workspaceId = useWorkspaceId();

  const { isPending, isError, data, error } = useShowWorkspace(
    workspaceId,
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error?.message ?? "Something went wrong!"} />;
  }

  if (!data) {
    return <></>;
  }

  <EditWorkspaceForm name={data.data.name} imagePath={data.data.image_path} />;
}
