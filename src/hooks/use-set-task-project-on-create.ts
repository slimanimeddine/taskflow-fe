import { useQueryState } from "nuqs";
import { parseAsUuid } from "@/lib/uuid-parser";

export function useSetTaskProjectOnCreate() {
  const [taskProject, setTaskProject] = useQueryState(
    "taskProject",
    parseAsUuid,
  );

  return {
    taskProject,
    setTaskProject,
  };
}
