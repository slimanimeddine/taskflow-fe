'use client'

import { authHeader, onError } from '@/lib/utils'
import { useSignOut } from '@/hooks/endpoints/authentication'
import { deleteSession } from '@/actions/session'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useSessionData } from '@/providers/session-client-provider'

export default function SignOutButton() {
  const { token } = useSessionData()

  const signOutMutation = useSignOut(authHeader(token))

  const router = useRouter()

  function onSignOut() {
    signOutMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        deleteSession()
        toast.success('You have been signed out')
        router.push('/sign-in')
      },
    })
  }

  const isDisabled = signOutMutation.isPending
  return (
    <button
      onClick={onSignOut}
      type="submit"
      disabled={isDisabled}
      className="block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
    >
      Sign out
    </button>
  )
}
