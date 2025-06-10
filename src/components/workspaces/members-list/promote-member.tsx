'use client'

import { usePromoteMember } from '@/hooks/endpoints/members'
import { useSession } from '@/hooks/use-session'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { authHeader, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

type PromoteMemberProps = {
  userId: string
}

export default function PromoteMember({ userId }: PromoteMemberProps) {
  const workspaceId = useWorkspaceId()
  const { token } = useSession()
  const PromoteMemberMutation = usePromoteMember(authHeader(token))
  const queryClient = useQueryClient()
  function onPromote() {
    PromoteMemberMutation.mutate(
      {
        workspaceId,
        userId,
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/workspaces/${workspaceId}/users`],
          })
          toast.success('Member deleted successfully!')
        },
      }
    )
  }

  const isDisabled = PromoteMemberMutation.isPending

  return (
    <button
      onClick={onPromote}
      disabled={isDisabled}
      className="w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 hover:bg-gray-50"
    >
      Promote
    </button>
  )
}
