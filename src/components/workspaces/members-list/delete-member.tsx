'use client'

import { useDeleteMember } from '@/hooks/endpoints/members'
import { useSession } from '@/hooks/use-session'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { authHeader, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type DeleteMemberProps = {
  userId: string
  isSelf: boolean
}

export default function DeleteMember({ userId, isSelf }: DeleteMemberProps) {
  const workspaceId = useWorkspaceId()
  const { token } = useSession()
  const deleteMemberMutation = useDeleteMember(authHeader(token))
  const queryClient = useQueryClient()
  const router = useRouter()
  function onDelete() {
    deleteMemberMutation.mutate(
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
          if (isSelf) {
            queryClient.invalidateQueries({
              queryKey: ['/api/v1/workspaces'],
            })
            router.push('/')
          }
          toast.success('Member deleted successfully!')
        },
      }
    )
  }

  const isDisabled = deleteMemberMutation.isPending

  return (
    <button
      onClick={onDelete}
      disabled={isDisabled}
      className="w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50 hover:bg-gray-50"
    >
      {isSelf ? 'Leave' : 'Remove'}
    </button>
  )
}
