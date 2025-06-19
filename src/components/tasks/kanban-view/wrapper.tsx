'use client'

import { authHeader, matchQueryStatus } from '@/lib/utils'
import { Task } from '@/types/models'
import { ApiResource } from '@/types/api-responses'
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
import KanbanView from '.'

export default function KanbanViewWrapper() {
  const { token } = useSession()
  const workspaceId = useWorkspaceId()
  const { status } = useTaskStatusFilter()
  const { project } = useTaskProjectFilter()
  const { assignee } = useTaskAssigneeFilter()
  const { sort } = useTaskSort()
  const { dueDate } = useTaskDueDateFilter()

  const listTasksQuery = useListTasks<ApiResource<Task[]>>(
    {
      'filter[workspace]': workspaceId,
      ...(status && { 'filter[status]': status }),
      ...(project && { 'filter[project]': project.id }),
      ...(assignee && { 'filter[assignee]': assignee.id }),
      ...(dueDate && { 'filter[due_date]': dueDate.toDateString() }),
      ...(sort && { sort }),
      paginate: 0,
    },
    authHeader(token)
  )
  return matchQueryStatus(listTasksQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const tasks = data.data

      return <KanbanView tasks={tasks} />
    },
  })
}
