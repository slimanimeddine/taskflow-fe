"use client";

import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
import { useProjectId } from "@/hooks/params/use-project-id";
import { useShowProject } from "@/hooks/endpoints/projects";
import EditProjectForm from "./form";

export default function EditProjectWrapper() {
  const { token } = useSession();
  const projectId = useProjectId();

  const { isPending, isError, data, error } = useShowProject(
    projectId,
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <EditProjectForm name={data.data.name} imagePath={data.data.image_path} />
  );
}
