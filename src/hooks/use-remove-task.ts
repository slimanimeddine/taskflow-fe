import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteTask } from "@/hooks/endpoints/tasks";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";

export function useRemoveTask(taskId: string) {
  const { token } = useSession();
  const { mutate, isPending } = useDeleteTask(authHeader(token));

  const queryClient = useQueryClient();

  function removeTask() {
    if (
      window.confirm(
        "Are you sure you want to delete this task? This action cannot be undone.",
      )
    ) {
      mutate(
        {
          taskId,
        },
        {
          onError: (error) => {
            if (error.isAxiosError) {
              toast.error(
                error.response?.data.message ?? "Something went wrong",
              );
            } else {
              toast.error(error.message);
            }
          },
          onSuccess: () => {
            void queryClient.invalidateQueries({
              queryKey: ["/api/v1/tasks"],
            });
            toast.success("Task deleted successfully");
          },
        },
      );
    }
  }

  const isDisabled = isPending;

  return {
    removeTask,
    isDisabled,
  };
}
