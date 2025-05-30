'use client'

import { useListAuthenticatedUserWorkspaces } from '@/hooks/endpoints/workspaces'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import { useSessionData } from '@/providers/session-client-provider'
import LoadingUI from '../../loading-ui'
import ErrorUI from '../../error-ui'
import WorkspaceSwitcher from './component'

export default function WorkspaceSwitcherWrapper() {
  const { token } = useSessionData()

  const listAuthenticatedUserWorkspacesQuery =
    useListAuthenticatedUserWorkspaces(authHeader(token))

  return matchQueryStatus(listAuthenticatedUserWorkspacesQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      return <WorkspaceSwitcher workspaces={data.data} />
    },
  })
}
