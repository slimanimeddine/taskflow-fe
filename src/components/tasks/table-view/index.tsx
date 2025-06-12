'use client'

import { classNames } from '@/lib/utils'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Pagination from './pagination'
import RowDropdown from './row-dropdown'

type Status = {
  type: 'todo' | 'backlog' | 'in-progress' | 'done'
  label: 'To Do' | 'Backlog' | 'In Progress' | 'Done'
}

const statuses: Status[] = [
  {
    type: 'todo',
    label: 'To Do',
  },
  {
    type: 'backlog',
    label: 'Backlog',
  },
  {
    type: 'in-progress',
    label: 'In Progress',
  },
  {
    type: 'done',
    label: 'Done',
  },
]

const tasks = [
  {
    id: 1,
    taskName: 'Design Homepage',
    project: 'Website Redesign',
    assignee: 'Lindsay Walton',
    dueDate: '2023-10-15',
    status: statuses[0], // 'To Do'
  },
  {
    id: 2,
    taskName: 'Develop API',
    project: 'Backend Development',
    assignee: 'Courtney Henry',
    dueDate: '2023-10-20',
    status: statuses[1], // 'Backlog'
  },
  {
    id: 3,
    taskName: 'Write Documentation',
    project: 'Documentation Project',
    assignee: 'Tom Cook',
    dueDate: '2023-10-25',
    status: statuses[2],
  },
  {
    id: 4,
    taskName: 'Test Application',
    project: 'Quality Assurance',
    assignee: 'Jane Cooper',
    dueDate: '2023-10-30',
    status: statuses[3], // 'Done'
  },
  {
    id: 5,
    taskName: 'Deploy to Production',
    project: 'Deployment Project',
    assignee: 'Robert Fox',
    dueDate: '2023-11-05',
    status: statuses[0], // 'To Do'
  },
]

export default function TasksTableView() {
  return (
    <div className="">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="relative px-7 sm:w-12 sm:px-6"
                  >
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <span className="inline-flex">
                      Name
                      <span className="ml-2 flex-none rounded bg-gray-100">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <span className="inline-flex">
                      Project
                      <span className="ml-2 flex-none rounded bg-gray-100">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <span className="inline-flex">
                      Assignee
                      <span className="ml-2 flex-none rounded bg-gray-100">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <span className="inline-flex">
                      Due Date
                      <span className="ml-2 flex-none rounded bg-gray-100">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <span className="inline-flex">
                      Status
                      <span className="ml-2 flex-none rounded bg-gray-100">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>
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
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      {true && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {task.taskName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {task.project}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {task.assignee}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {task.dueDate}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={classNames(
                          'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                          task.status.type === 'todo'
                            ? 'bg-red-50 text-red-700 ring-red-600/20'
                            : task.status.type === 'backlog'
                              ? 'bg-pink-50 text-pink-700 ring-pink-600/20'
                              : task.status.type === 'in-progress'
                                ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                                : 'bg-green-50 text-green-700 ring-green-600/20'
                        )}
                      >
                        {task.status.label}
                      </span>
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <RowDropdown />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}
