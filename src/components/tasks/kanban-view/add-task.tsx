"use client";

import { useOpenModal } from "@/hooks/use-open-modal";
import { useSetTaskStatusOnCreate } from "@/hooks/use-set-task-status-on-create";

type AddTaskProps = {
  status: "backlog" | "todo" | "in_progress" | "in_review" | "done";
};

export default function AddTask({ status }: AddTaskProps) {
  const { openModal } = useOpenModal();
  const { setTaskStatus } = useSetTaskStatusOnCreate();
  function onOpen() {
    openModal("create-task");
    void setTaskStatus(status);
  }

  return (
    <button
      type="button"
      className="mt-auto block w-full rounded-md border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-800"
      onClick={onOpen}
    >
      + Add New Task
    </button>
  );
}
