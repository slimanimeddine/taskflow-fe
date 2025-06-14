'use client'

import { useChangeTasksView } from '@/hooks/use-change-tasks-view'
import {
  Squares2X2Icon,
  CalendarDaysIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline'

type View = 'table' | 'kanban' | 'calendar'

export default function ChangeTasksView() {
  const { view, setView } = useChangeTasksView()

  const getButtonClasses = (viewName: View) => {
    return `
      relative inline-flex items-center px-3 py-2 text-sm font-semibold 
      ${viewName === 'table' ? 'rounded-l-md' : ''}
      ${viewName === 'calendar' ? 'rounded-r-md' : ''}
      ${
        view === viewName
          ? 'bg-indigo-600 text-white ring-indigo-600 hover:bg-indigo-500'
          : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
      }
      ring-1 ring-inset focus:z-10
      ${viewName !== 'table' ? '-ml-px' : ''} // Add -ml-px for middle and right buttons
    `
  }

  const getIconClasses = (viewName: View) => {
    return `
      h-5 w-5 
      ${view === viewName ? 'text-white' : 'text-gray-400'}
    `
  }

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={getButtonClasses('table')}
        onClick={() => setView('table')}
      >
        <TableCellsIcon
          className={getIconClasses('table')}
          aria-hidden="true"
        />
        <span className="sr-only">Table View</span>
      </button>
      <button
        type="button"
        className={getButtonClasses('kanban')}
        onClick={() => setView('kanban')}
      >
        <Squares2X2Icon
          className={getIconClasses('kanban')}
          aria-hidden="true"
        />
        <span className="sr-only">Kanban View</span>
      </button>
      <button
        type="button"
        className={getButtonClasses('calendar')}
        onClick={() => setView('calendar')}
      >
        <CalendarDaysIcon
          className={getIconClasses('calendar')}
          aria-hidden="true"
        />
        <span className="sr-only">Calendar View</span>
      </button>
    </div>
  )
}
