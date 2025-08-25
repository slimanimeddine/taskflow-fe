import { useQueryState, parseAsStringLiteral } from "nuqs";

const statuses = [
  "done",
  "in_review",
  "in_progress",
  "backlog",
  "todo",
] as const;

type Status = (typeof statuses)[number];

export function useTaskStatusFilter() {
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringLiteral<Status>(statuses),
  );

  return {
    status,
    setStatus,
  };
}
