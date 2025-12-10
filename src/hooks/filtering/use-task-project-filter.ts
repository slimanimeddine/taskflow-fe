import { parseAsJson, useQueryState } from "nuqs";
import { z } from "zod/v4";

const projectSchema = z.object({
  id: z.uuid(),
  name: z.string(),
});

export function useTaskProjectFilter() {
  const [project, setProject] = useQueryState(
    "project",
    parseAsJson((value) => projectSchema.parse(value)),
  );

  return {
    project,
    setProject,
  };
}
