"use client";

import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePromoteMember } from "@/hooks/endpoints/members";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";

type PromoteMemberProps = {
  userId: string;
};

export default function PromoteMember({ userId }: PromoteMemberProps) {
  const workspaceId = useWorkspaceId();
  const { token } = useSession();
  const { mutate, isPending } = usePromoteMember(authHeader(token));
  const queryClient = useQueryClient();
  function onPromote() {
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
          toast.success("Member deleted successfully!");
        },
      },
    );
  }

  const isDisabled = isPending;

  return (
    <button
      type="button"
      onClick={onPromote}
      disabled={isDisabled}
      className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 hover:bg-gray-50 data-focus:bg-gray-50"
    >
      Promote
    </button>
  );
}
