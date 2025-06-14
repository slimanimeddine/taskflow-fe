'use client'

import { useResetWorkspaceInviteCode } from '@/hooks/endpoints/workspaces'
import { useSession } from '@/hooks/use-session'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import { authHeader, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function ResetInviteCode() {
  const workspaceId = useWorkspaceId()

  const { token } = useSession()

  const resetWorkspaceInviteCodeMutation = useResetWorkspaceInviteCode(
    authHeader(token)
  )

  const queryClient = useQueryClient()

  function onSubmit() {
    resetWorkspaceInviteCodeMutation.mutate(
      {
        workspaceId,
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/workspaces/${workspaceId}`],
          })
          queryClient.invalidateQueries({
            queryKey: ['/api/v1/users/me/workspaces'],
          })
          toast.success('Invite code reset successfully!')
        },
      }
    )
  }

  const isDisabled = resetWorkspaceInviteCodeMutation.isPending

  return (
    <button
      onClick={onSubmit}
      disabled={isDisabled}
      type="button"
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Reset Invite Code
    </button>
  )
}
