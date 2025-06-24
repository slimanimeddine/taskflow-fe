'use client'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { authHeader, matchQueryStatus, onError } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useGetAuthenticatedUser } from '@/hooks/endpoints/users'
import { useResendEmailVerification } from '@/hooks/endpoints/authentication'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'

export default function EmailNotVerifiedAlert({ token }: { token: string }) {
  const authConfig = authHeader(token)
  const getAuthenticatedUserQuery = useGetAuthenticatedUser(authConfig)
  const resendEmailVerificationMutation = useResendEmailVerification(authConfig)

  function handleResendEmailVerification() {
    resendEmailVerificationMutation.mutate(undefined, {
      onError,
      onSuccess: () => {
        toast.success('Verification email sent successfully!')
      },
    })
  }

  const isDisabled = resendEmailVerificationMutation.isPending || !token

  return matchQueryStatus(getAuthenticatedUserQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <span></span>,
    Success: ({ data }) => {
      if (data.data.email_verified_at) {
        return <span></span>
      }
      return (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                aria-hidden="true"
                className="h-5 w-5 text-blue-400"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Your email address is not verified.
              </p>
              <p className="mt-3 text-sm md:ml-6 md:mt-0">
                <button
                  type="button"
                  onClick={handleResendEmailVerification}
                  disabled={isDisabled}
                  className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                >
                  Send verification email
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      )
    },
  })
}
