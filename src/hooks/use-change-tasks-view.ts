import { parseAsStringLiteral, useQueryState } from "nuqs";

const views = ["table", "kanban", "calendar"] as const;

type View = (typeof views)[number];

export function useChangeTasksView() {
  const [view, setView] = useQueryState(
    "view",
    parseAsStringLiteral<View>(views).withDefault("table"),
  );

  return {
    view,
    setView,
  };
}
