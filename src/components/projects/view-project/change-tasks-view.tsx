'use client'

import { useState } from 'react' // Import useState
import {
  Squares2X2Icon,
  CalendarDaysIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline'

export default function ChangeTasksView() {
  // 1. Add state to manage the active view.
  // We'll initialize it to 'table' as the default view.
  const [currentView, setCurrentView] = useState('table') // 'table', 'kanban', 'calendar'

  // Helper function to apply conditional classes
  const getButtonClasses = (viewName: 'table' | 'kanban' | 'calendar') => {
    return `
      relative inline-flex items-center px-3 py-2 text-sm font-semibold 
      ${viewName === 'table' ? 'rounded-l-md' : ''}
      ${viewName === 'calendar' ? 'rounded-r-md' : ''}
      ${
        currentView === viewName // Apply selected styles
          ? 'bg-indigo-600 text-white ring-indigo-600 hover:bg-indigo-500'
          : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
      }
      ring-1 ring-inset focus:z-10
      ${viewName !== 'table' ? '-ml-px' : ''} // Add -ml-px for middle and right buttons
    `
  }

  // Helper function to apply icon classes
  const getIconClasses = (viewName: 'table' | 'kanban' | 'calendar') => {
    return `
      h-5 w-5 
      ${currentView === viewName ? 'text-white' : 'text-gray-400'}
    `
  }

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={getButtonClasses('table')}
        onClick={() => setCurrentView('table')}
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
        onClick={() => setCurrentView('kanban')}
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
        onClick={() => setCurrentView('calendar')}
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
