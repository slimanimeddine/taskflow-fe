import { useQueryState, parseAsIsoDate } from "nuqs";

export function useTaskDueDateFilter() {
  const [dueDate, setDueDate] = useQueryState("dueDate", parseAsIsoDate);

  return {
    dueDate,
    setDueDate,
  };
}
