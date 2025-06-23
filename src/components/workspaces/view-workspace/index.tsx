'use client'
import { useShowWorkspace } from '@/hooks/endpoints/workspaces'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import { useSession } from '@/hooks/use-session'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import LoadingUI from '../../loading-ui'
import ErrorUI from '../../error-ui'
import TasksCard from './tasks-card'
import ProjectsSection from './projects-section'
import MembersSection from './members-section'
import WorkspaceStats from './stats'

export default function ViewWorkspace() {
  const { token } = useSession()
  const workspaceId = useWorkspaceId()

  const showWorkspaceQuery = useShowWorkspace(workspaceId, authHeader(token))

  return matchQueryStatus(showWorkspaceQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const workspace = data.data

      return (
        <div className="bg-white min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Welcome to{' '}
                <span className="text-indigo-600">{workspace.name}</span>
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Here&apos;s a snapshot of your workspace activity.
              </p>
            </header>

            {/* Stats Section */}
            <WorkspaceStats />
            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
              <TasksCard />

              <div className="space-y-12">
                <ProjectsSection />
                <MembersSection />
              </div>
            </div>
          </div>
        </div>
      )
    },
  })
}
