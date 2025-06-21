'use client'

import TasksTableView from './table-view'
import { useChangeTasksView } from '@/hooks/use-change-tasks-view'
import KanbanViewWrapper from './kanban-view/wrapper'
import CalendarViewWrapper from './calendar-view/wrapper'

export default function ViewTasks() {
  const { view } = useChangeTasksView()
  if (view === 'table') {
    return <TasksTableView />
  }

  if (view === 'kanban') {
    return <KanbanViewWrapper />
  }

  return <CalendarViewWrapper />
}
