'use client'

import { useCreateMember } from '@/hooks/endpoints/members'
import { useInviteCode } from '@/hooks/params/use-invite-code'
import { useSession } from '@/hooks/use-session'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import { authHeader, onError } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function JoinWorkspace() {
  const inviteCode = useInviteCode()
  const workspaceId = useWorkspaceId()
  const { token } = useSession()
  const createMemberMutation = useCreateMember(authHeader(token))

  const router = useRouter()

  function onSubmit() {
    createMemberMutation.mutate(
      {
        workspaceId,
        data: { invite_code: inviteCode },
      },
      {
        onError,
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}`)
          toast.success('Workspace edited successfully!')
        },
      }
    )
  }

  const isDisabled = createMemberMutation.isPending

  return (
    <div className="p-4">
      <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm w-full">
        <div>
          <h2 className="text-xl leading-7 font-semibold text-gray-900">
            Join Workspace
          </h2>
          <div className="mt-4 border-t border-dotted border-gray-300"></div>
        </div>

        <p className="text-sm leading-6 text-gray-600">
          You&apos;ve been invited to join this workspace. Click Join to accept
          the invitation and get started!
        </p>

        <div className="border-t border-dotted border-gray-300"></div>

        <div className="flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-sm leading-6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDisabled}
            onClick={onSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  )
}
