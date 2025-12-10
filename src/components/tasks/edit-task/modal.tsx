"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useShowTask } from "@/hooks/endpoints/tasks";
import { useOpenModal } from "@/hooks/use-open-modal";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
import EditTaskForm from "./form";

type EditTaskModalProps = {
  taskId: string;
};

export default function EditTaskModal({ taskId }: EditTaskModalProps) {
  const { modal, taskId: currentOpenTaskId, closeModal } = useOpenModal();

  const open = modal === "edit-task" && currentOpenTaskId === taskId;
  const { token } = useSession();
  const { isPending, isError, data, error } = useShowTask(
    taskId,
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message ?? "Something went wrong!"} />;
  }

  if (!data) {
    return <div></div>;
  }

  const { name, description, status, project_id, assignee_id, due_date } =
    data.data;

  const defaultValues = {
    name,
    description,
    status,
    project_id,
    assignee_id,
    due_date: new Date(due_date || ""),
    // due_date: new Date(due_date || "").toISOString().split("T")[0],
  };
  return (
    <Dialog open={open} onClose={closeModal} className="relative z-100">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 py-4">
              <EditTaskForm taskId={taskId} defaultValues={defaultValues} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
