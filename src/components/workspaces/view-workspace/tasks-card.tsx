'use client'

import ErrorUI from '@/components/error-ui'
import LoadingUI from '@/components/loading-ui'
import { useListTasks } from '@/hooks/endpoints/tasks'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import { useSession } from '@/hooks/use-session'
import {
  authHeader,
  classNames,
  matchQueryStatus,
  statusLabel,
} from '@/lib/utils'
import { PaginatedApiResponse } from '@/types/api-responses'
import { Task } from '@/types/models'
import { ChevronRightIcon, ClockIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const STATUS_COLORS: Record<Task['status'], string> = {
  backlog: 'bg-gray-100 text-gray-800',
  todo: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  in_review: 'bg-purple-100 text-purple-800',
  done: 'bg-green-100 text-green-800',
}

export default function TasksCard() {
  const { token, id } = useSession()
  const workspaceId = useWorkspaceId()

  const listTasksQuery = useListTasks<PaginatedApiResponse<Task>>(
    {
      'filter[workspace]': workspaceId,
      'filter[assignee]': id,
      paginate: 1,
      page: 1,
    },
    authHeader(token)
  )
  return matchQueryStatus(listTasksQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const tasks = data.data.slice(0, 5)
      return (
        <section className="lg:col-span-2 bg-gray-50 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Assigned to You</h2>
            <Link
              href={`/workspaces/${workspaceId}/tasks`}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Show all <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
            <ul
              role="list"
              className="divide-y divide-gray-200"
            >
              {tasks.slice(0, 5).map((task) => (
                <li key={task.id}>
                  <Link
                    href={`/workspaces/${workspaceId}/tasks/${task.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="truncate font-medium text-indigo-600">
                              {task.name}
                            </p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                              in {task.project.name}
                            </p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <ClockIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <p>
                                Due on{' '}
                                <time dateTime={task.due_date}>
                                  {new Date(task.due_date).toLocaleDateString()}
                                </time>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:ml-5 sm:mt-0">
                          <span
                            className={classNames(
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                              STATUS_COLORS[task.status]
                            )}
                          >
                            {statusLabel(task.status)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )
    },
  })
}
