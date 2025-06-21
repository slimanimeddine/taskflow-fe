'use client'

import { useSession } from '@/hooks/use-session'
import { classNames } from '@/lib/utils'
import ViewTasks from '../tasks/view-tasks'

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

export default function MyTasks() {
  const { id } = useSession()
  return (
    <div>
      <div className="relative isolate overflow-hidden">
        <div className="mt-4">
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

      <div className="mt-8">
        <ViewTasks defaultAssigneeId={id} />
      </div>
    </div>
  )
}
