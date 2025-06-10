'use client'

import ErrorUI from '@/components/error-ui'
import LoadingUI from '@/components/loading-ui'
import { useSession } from '@/hooks/use-session'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import { useProjectId } from '@/hooks/use-project-id'
import { useShowProject } from '@/hooks/endpoints/projects'
import EditProjectForm from './form'

export default function EditProjectWrapper() {
  const { token } = useSession()
  const projectId = useProjectId()

  const showProjectQuery = useShowProject(projectId, authHeader(token))

  return matchQueryStatus(showProjectQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      return (
        <EditProjectForm
          name={data.data.name}
          imagePath={data.data.image_path}
        />
      )
    },
  })
}
