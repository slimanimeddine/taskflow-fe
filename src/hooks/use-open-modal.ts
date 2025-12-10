import { parseAsStringLiteral, useQueryState } from "nuqs";
import { parseAsUuid } from "@/lib/uuid-parser";

const modals = [
  "create-project",
  "create-task",
  "create-workspace",
  "edit-task",
] as const;

type Modal = (typeof modals)[number];

export function useOpenModal() {
  const [modal, setModal] = useQueryState(
    "modal",
    parseAsStringLiteral<Modal>(modals),
  );

  const [taskId, setTaskId] = useQueryState("task-id", parseAsUuid);

  function openModal(modal: Modal, taskId?: string) {
    if (modal !== "edit-task") {
      void setModal(modal);
    } else {
      if (!taskId) {
        void setModal(null);
      } else {
        void setModal(modal);
        void setTaskId(taskId);
      }
    }
  }

  function closeModal() {
    void setModal(null);
    void setTaskId(null);
  }

  return {
    modal,
    taskId,
    openModal,
    closeModal,
  };
}
