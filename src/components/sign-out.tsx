'use client'

import { authHeader, onError } from '@/lib/utils'
import { useSignOut } from '@/hooks/endpoints/authentication'
import { deleteSession } from '@/actions/session'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type SignOutButtonProps = {
  token: string
}

export default function SignOutButton({ token }: SignOutButtonProps) {
  const signOutMutation = useSignOut(authHeader(token))

  const router = useRouter()

  function onSignOut() {
    signOutMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        deleteSession()
        toast.success('You have been signed out')
        router.push('/')
      },
    })
  }

  const isDisabled = signOutMutation.isPending
  return (
    <button
      onClick={onSignOut}
      type="submit"
      disabled={isDisabled}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign out
    </button>
  )
}
