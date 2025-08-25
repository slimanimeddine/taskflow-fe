import { useQueryState, parseAsStringLiteral } from "nuqs";

const statuses = [
  "done",
  "in_review",
  "in_progress",
  "backlog",
  "todo",
] as const;

type Status = (typeof statuses)[number];

export function useSetTaskStatusOnCreate() {
  const [taskStatus, setTaskStatus] = useQueryState(
    "taskStatus",
    parseAsStringLiteral<Status>(statuses),
  );

  return {
    taskStatus,
    setTaskStatus,
  };
}
