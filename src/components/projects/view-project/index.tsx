'use client'

import { useShowProject } from '@/hooks/endpoints/projects'
import { useProjectId } from '@/hooks/params/use-project-id'
import { useSession } from '@/hooks/use-session'
import {
  authHeader,
  classNames,
  fileUrl,
  getFirstLetter,
  matchQueryStatus,
} from '@/lib/utils'
import LoadingUI from '../../loading-ui'
import ErrorUI from '../../error-ui'
import { PencilIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import TasksTableView from '../../tasks/table-view'
import StatusFilter from './filtering/status-filter'
import AssigneeFilter from './filtering/assignee-filter'
import ProjectFilter from './filtering/project-filter'
import ChangeTasksView from './change-tasks-view'
import Link from 'next/link'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import CreateTaskModal from '../../tasks/create-task/modal'
import { useChangeTasksView } from '@/hooks/use-change-tasks-view'
import DueDateFilter from './filtering/due-date-filter'

const tasks = [
  {
    id: '1',
    type: 'Total',
    count: 4,
  },
  {
    id: '2',
    type: 'Assigned',
    count: 2,
  },
  {
    id: '3',
    type: 'Incomplete',
    count: 5,
  },
  {
    id: '4',
    type: 'Completed',
    count: 1,
  },
  {
    id: '5',
    type: 'Overdue',
    count: 0,
  },
]

export default function ViewProject() {
  const { token } = useSession()
  const projectId = useProjectId()
  const workspaceId = useWorkspaceId()

  const showProjectQuery = useShowProject(projectId, authHeader(token))

  const { view } = useChangeTasksView()

  return matchQueryStatus(showProjectQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const project = data.data
      return (
        <div>
          <div className="relative isolate overflow-hidden">
            {/* Secondary navigation */}
            <header className="pb-4 pt-6 sm:pb-6">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
                <h1 className="text-base font-semibold leading-7 text-gray-900 flex items-center">
                  {project.image_path ? (
                    <Image
                      alt=""
                      src={fileUrl(project.image_path)!}
                      className="size-8 shrink-0 rounded-lg"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-500">
                      <span className="text-sm font-medium leading-none text-white">
                        {getFirstLetter(project.name)}
                      </span>
                    </span>
                  )}
                  <span className="ml-2">{project.name}</span>
                </h1>
                <Link
                  href={`/workspaces/${workspaceId}/projects/${projectId}/settings`}
                  className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PencilIcon
                    aria-hidden="true"
                    className="-ml-1.5 h-5 w-5"
                  />
                  Edit project
                </Link>
              </div>
            </header>

            <div>
              <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 lg:px-2 xl:px-0">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border border-gray-900/5 px-2 py-6 sm:px-4 xl:px-6"
                  >
                    <dt className="text-sm font-medium leading-6 text-gray-500">
                      {task.type} Tasks
                    </dt>
                    <dd
                      className={classNames(
                        task.type === 'Overdue'
                          ? 'text-rose-600'
                          : 'text-green-600',
                        'text-xs font-medium'
                      )}
                    >
                      {task.type === 'Overdue' ? '-' : '+'} {task.count}
                    </dd>
                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                      {task.count}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              aria-hidden="true"
              className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
            >
              <div
                style={{
                  clipPath:
                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                }}
                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
              />
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <div className="border-b border-gray-900/10 pb-4">
              <div className="flex items-end justify-between flex-wrap">
                <div className="flex items-center gap-x-1 flex-wrap">
                  <StatusFilter />
                  <AssigneeFilter />
                  <ProjectFilter />
                  <DueDateFilter />
                </div>
                <div className="flex items-center gap-x-1 flex-wrap">
                  <ChangeTasksView />
                  <CreateTaskModal />
                </div>
              </div>
            </div>

            {view === 'table' && <TasksTableView />}
            {view === 'kanban' && <>kanban</>}
            {view === 'calendar' && <>calendar</>}
          </div>
        </div>
      )
    },
  })
}
