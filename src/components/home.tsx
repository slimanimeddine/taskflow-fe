'use client'

import { useListAuthenticatedUserWorkspaces } from '@/hooks/endpoints/workspaces'
import { useSession } from '@/hooks/use-session'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import ErrorUI from './error-ui'
import LoadingUI from './loading-ui'
import { redirect } from 'next/navigation'

export default function Home() {
  const { token } = useSession()

  const listAuthenticatedUserWorkspacesQuery =
    useListAuthenticatedUserWorkspaces(authHeader(token))

  return matchQueryStatus(listAuthenticatedUserWorkspacesQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const workspaces = data.data

      if (!workspaces || workspaces.length === 0) {
        redirect('/workspaces/create')
      } else {
        redirect(`/workspaces/${workspaces[0].id}`)
      }
    },
  })
}
