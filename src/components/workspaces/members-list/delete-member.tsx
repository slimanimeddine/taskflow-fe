"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDeleteMember } from "@/hooks/endpoints/members";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";

type DeleteMemberProps = {
  userId: string;
  isSelf: boolean;
};

export default function DeleteMember({ userId, isSelf }: DeleteMemberProps) {
  const workspaceId = useWorkspaceId();
  const { token } = useSession();
  const { mutate, isPending } = useDeleteMember(authHeader(token));
  const queryClient = useQueryClient();
  const router = useRouter();
  function onDelete() {
    mutate(
      {
        workspaceId,
        userId,
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
            queryKey: [`/api/v1/workspaces/${workspaceId}/users`],
          });
          if (isSelf) {
            void queryClient.invalidateQueries({
              queryKey: ["/api/v1/workspaces"],
            });
            router.push("/");
          }
          toast.success("Member deleted successfully!");
        },
      },
    );
  }

  const isDisabled = isPending;

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={isDisabled}
      className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 hover:bg-gray-50 data-focus:bg-gray-50"
    >
      {isSelf ? "Leave" : "Remove"}
    </button>
  );
}
