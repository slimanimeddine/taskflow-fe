'use client'

import { useListAuthenticatedUserWorkspaces } from '@/hooks/endpoints/workspaces'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import LoadingUI from '../../loading-ui'
import ErrorUI from '../../error-ui'
import WorkspaceSwitcher from '.'
import { useSession } from '@/hooks/use-session'

export default function WorkspaceSwitcherWrapper() {
  const { token } = useSession()

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
