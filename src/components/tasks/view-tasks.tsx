'use client'

import TasksTableView from './table-view'
import { useChangeTasksView } from '@/hooks/use-change-tasks-view'
import KanbanViewWrapper from './kanban-view/wrapper'
import CalendarViewWrapper from './calendar-view/wrapper'
import ChangeTasksView from './change-tasks-view'
import CreateTaskModal from './create-task/modal'
import AssigneeFilter from './filtering/assignee-filter'
import DueDateFilter from './filtering/due-date-filter'
import ProjectFilter from './filtering/project-filter'
import StatusFilter from './filtering/status-filter'

type ViewTasksProps = {
  defaultProjectId?: string
  defaultAssigneeId?: string
}

export default function ViewTasks({
  defaultProjectId,
  defaultAssigneeId,
}: ViewTasksProps) {
  const { view } = useChangeTasksView()

  return (
    <div className="space-y-2">
      <div className="border-b border-gray-900/10 pb-4">
        <div className="flex items-end justify-between flex-wrap">
          <div className="flex items-center gap-x-1 flex-wrap">
            <StatusFilter />
            {!defaultAssigneeId && <AssigneeFilter />}
            {!defaultProjectId && <ProjectFilter />}
            <DueDateFilter />
          </div>
          <div className="flex items-center gap-x-1 flex-wrap">
            <ChangeTasksView />
            <CreateTaskModal
              defaultAssigneeId={defaultAssigneeId}
              defaultProjectId={defaultProjectId}
            />
          </div>
        </div>
      </div>

      {view === 'calendar' && (
        <CalendarViewWrapper
          defaultAssigneeId={defaultAssigneeId}
          defaultProjectId={defaultProjectId}
        />
      )}
      {view === 'kanban' && (
        <KanbanViewWrapper
          defaultAssigneeId={defaultAssigneeId}
          defaultProjectId={defaultProjectId}
        />
      )}
      {view === 'table' && (
        <TasksTableView
          defaultAssigneeId={defaultAssigneeId}
          defaultProjectId={defaultProjectId}
        />
      )}
    </div>
  )
}
