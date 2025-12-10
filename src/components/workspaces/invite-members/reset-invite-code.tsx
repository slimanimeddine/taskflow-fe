"use client";

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useResetWorkspaceInviteCode } from "@/hooks/endpoints/workspaces";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";

export default function ResetInviteCode() {
  const workspaceId = useWorkspaceId();

  const { token } = useSession();

  const { mutate, isPending } = useResetWorkspaceInviteCode(authHeader(token));

  const queryClient = useQueryClient();

  function onSubmit() {
    mutate(
      {
        workspaceId,
      },
      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: [`/api/v1/workspaces/${workspaceId}`],
          });
          void queryClient.invalidateQueries({
            queryKey: ["/api/v1/users/me/workspaces"],
          });
          toast.success("Invite code reset successfully!");
        },
      },
    );
  }

  const isDisabled = isPending;

  return (
    <button
      onClick={onSubmit}
      disabled={isDisabled}
      type="button"
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Reset Invite Code
    </button>
  );
}
