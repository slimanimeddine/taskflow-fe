import { useParams } from "next/navigation";

export function useProjectId() {
  const { projectId } = useParams<{ projectId: string }>();
  return projectId;
}
