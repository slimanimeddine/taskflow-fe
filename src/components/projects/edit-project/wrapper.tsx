"use client";

import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useShowProject } from "@/hooks/endpoints/projects";
import { useProjectId } from "@/hooks/params/use-project-id";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
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
    return <div></div>;
  }

  return (
    <EditProjectForm name={data.data.name} imagePath={data.data.image_path} />
  );
}
