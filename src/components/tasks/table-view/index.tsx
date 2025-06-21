'use client'

import {
  authHeader,
  classNames,
  matchQueryStatus,
  statusLabel,
} from '@/lib/utils'
import Pagination from './pagination'
import RowDropdown from '../row-dropdown'
import FieldSort from './sorting/field-sort'
import { Task } from '@/types/models'
import { PaginatedApiResponse } from '@/types/api-responses'
import ErrorUI from '@/components/error-ui'
import LoadingUI from '@/components/loading-ui'
import { useListTasks } from '@/hooks/endpoints/tasks'
import { useTaskAssigneeFilter } from '@/hooks/filtering/use-task-assignee-filter'
import { useTaskDueDateFilter } from '@/hooks/filtering/use-task-due-date-filter'
import { useTaskProjectFilter } from '@/hooks/filtering/use-task-project-filter'
import { useTaskStatusFilter } from '@/hooks/filtering/use-task-status-filter'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import { useTaskSort } from '@/hooks/sorting/use-task-sort'
import { useSession } from '@/hooks/use-session'
import { useTasksPage } from '@/hooks/filtering/use-tasks-page'

const STATUS_COLORS: Record<Task['status'], string> = {
  backlog: 'bg-gray-50 text-gray-700 ring-gray-600/20',
  todo: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  in_progress: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  in_review: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  done: 'bg-green-50 text-green-700 ring-green-600/20',
}

export default function TasksTableView() {
  const { token } = useSession()
  const workspaceId = useWorkspaceId()
  const { status } = useTaskStatusFilter()
  const { project } = useTaskProjectFilter()
  const { assignee } = useTaskAssigneeFilter()
  const { sort } = useTaskSort()
  const { dueDate } = useTaskDueDateFilter()
  const { page } = useTasksPage()

  const listTasksQuery = useListTasks<PaginatedApiResponse<Task>>(
    {
      'filter[workspace]': workspaceId,
      ...(status && { 'filter[status]': status }),
      ...(project && { 'filter[project]': project.id }),
      ...(assignee && { 'filter[assignee]': assignee.id }),
      ...(dueDate && { 'filter[due_date]': dueDate.toDateString() }),
      ...(sort && { sort }),
      paginate: 1,
      page: page || 1,
    },
    authHeader(token)
  )
  return matchQueryStatus(listTasksQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const tasks = data.data
      const links = data.links
      const meta = data.meta

      console.log(data)
      return (
        <div className="flow-root min-h-screen">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      <span className="inline-flex items-center gap-x-1">
                        Name
                        <FieldSort field="name" />
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="inline-flex items-center gap-x-1">
                        Project
                        <FieldSort field="project" />
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="inline-flex items-center gap-x-1">
                        Assignee
                        <FieldSort field="assignee" />
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="inline-flex items-center gap-x-1">
                        Due Date
                        <FieldSort field="due_date" />
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <span className="inline-flex items-center gap-x-1">
                        Status
                        <FieldSort field="status" />
                      </span>
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="bg-white"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {task.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.project.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.assignee.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.due_date
                          ? new Date(task.due_date).toDateString()
                          : 'No due date'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={classNames(
                            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                            STATUS_COLORS[task.status]
                          )}
                        >
                          {statusLabel(task.status)}
                        </span>
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <RowDropdown
                          taskId={task.id}
                          projectId={task.project_id}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* pagination */}
              {meta.total > 10 && (
                <Pagination
                  links={links}
                  meta={meta}
                />
              )}
            </div>
          </div>
        </div>
      )
    },
  })
}
