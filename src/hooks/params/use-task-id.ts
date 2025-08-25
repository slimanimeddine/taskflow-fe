import { useParams } from "next/navigation";

export function useTaskId() {
  const { taskId } = useParams<{ taskId: string }>();
  return taskId;
}
