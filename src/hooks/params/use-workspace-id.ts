import { useParams } from "next/navigation";

export function useWorkspaceId() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  return workspaceId;
}
