"use client";

import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useShowWorkspace } from "@/hooks/endpoints/workspaces";
import { useSession } from "@/hooks/use-session";
import { authHeader, matchQueryStatus } from "@/lib/utils";
import EditWorkspaceForm from "./form";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";

export default function EditWorkspaceWrapper() {
  const { token } = useSession();
  const workspaceId = useWorkspaceId();

  const showWorkspaceQuery = useShowWorkspace(workspaceId, authHeader(token));

  return matchQueryStatus(showWorkspaceQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      return (
        <EditWorkspaceForm
          name={data.data.name}
          imagePath={data.data.image_path}
        />
      );
    },
  });
}
