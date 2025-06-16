'use client'

import TasksTableView from './table-view'
import { useChangeTasksView } from '@/hooks/use-change-tasks-view'
import CalendarView from './calendar-view'
import KanbanViewWrapper from './kanban-view/wrapper'

export default function ViewTasks() {
  const { view } = useChangeTasksView()
  if (view === 'table') {
    return <TasksTableView />
  }

  if (view === 'kanban') {
    return <KanbanViewWrapper />
  }

  return <CalendarView />
}
