import { useQueryState } from "nuqs";
import { parseAsJson } from "nuqs";
import { z } from "zod/v4";

const assigneeSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export function useTaskAssigneeFilter() {
  const [assignee, setAssignee] = useQueryState(
    "assignee",
    parseAsJson(assigneeSchema.parse),
  );

  return {
    assignee,
    setAssignee,
  };
}
