'use client'

import { authHeader, matchQueryStatus } from '@/lib/utils'
import { useGetAuthenticatedUser } from '@/hooks/endpoints/users'
import SignOutButton from '@/components/sign-out'
import LoadingUI from './loading-ui'
import ErrorUI from './error-ui'
import EmailNotVerifiedAlert from './email-not-verified-alert'

type DashboardProps = {
  token: string
}

export default function Dashboard({ token }: DashboardProps) {
  const getAuthenticatedUserQuery = useGetAuthenticatedUser(authHeader(token))

  return (
    <div>
      <h1>Dashboard</h1>
      {matchQueryStatus(getAuthenticatedUserQuery, {
        Loading: <LoadingUI />,
        Errored: <ErrorUI message="Something went wrong!" />,
        Empty: <></>,
        Success: ({ data }) => (
          <>
            <p>Name: {data.data.name}</p>
            <p>Email: {data.data.email}</p>
            <EmailNotVerifiedAlert token={token} />
          </>
        ),
      })}
      <SignOutButton token={token} />
    </div>
  )
}
