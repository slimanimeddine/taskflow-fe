"use client";

import { useSession } from "@/hooks/use-session";
import ViewTasks from "../tasks/view-tasks";

export default function MyTasks() {
  const { id } = useSession();
  return (
    <div className="mt-4">
      <ViewTasks defaultAssigneeId={id} />
    </div>
  );
}
