import { useQueryState } from "nuqs";
import { parseAsUuid } from "@/lib/uuid-parser";

export function useSetTaskAssigneeOnCreate() {
  const [taskAssignee, setTaskAssignee] = useQueryState(
    "taskAssignee",
    parseAsUuid,
  );

  return {
    taskAssignee,
    setTaskAssignee,
  };
}
