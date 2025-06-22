'use client'

import { useShowTask } from '@/hooks/endpoints/tasks'
import { useTaskId } from '@/hooks/params/use-task-id'
import { useSession } from '@/hooks/use-session'
import { authHeader, fileUrl, matchQueryStatus } from '@/lib/utils'
import ErrorUI from '../error-ui'
import LoadingUI from '../loading-ui'

import {
  PaperClipIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TagIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

// --- TYPE DEFINITIONS (Based on your models) ---
interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string // Added for UI
}

interface Project {
  id: string
  name: string
}

interface Task {
  id: string
  name: string
  description: string | null
  due_date: string
  status: 'Completed' | 'In Progress' | 'Overdue' | 'Todo'
  workspace_id: string
  project: Project
  assignee: User
  created_at: string | null
  updated_at: string | null
}

// --- PROPS FOR THE COMPONENT ---
interface ViewTaskProps {
  task: Task
}

// --- MOCK DATA ---
const mockAssignee: User = {
  id: 'user-1',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  avatarUrl: fileUrl('seeding-photos/10.jpeg')!,
}

const mockProject: Project = {
  id: 'proj-1',
  name: 'QuantumLeap CRM',
}

const task: Task = {
  id: 'task-1',
  name: 'Design a new user onboarding flow and create mockups',
  description:
    'Occaecati molestias nostrum corporis sapiente. Eum sed voluptas omnis. Debitis rerum natus atque quia laboriosam.',
  due_date: '2025-08-15T00:00:00.000Z',
  status: 'In Progress',
  workspace_id: 'ws-1',
  project: mockProject,
  assignee: mockAssignee,
  created_at: '2025-07-01T10:00:00.000Z',
  updated_at: '2025-07-05T14:30:00.000Z',
}

// --- HELPER FUNCTION to format dates ---
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// --- STATUS BADGE COMPONENT ---
const StatusBadge = ({ status }: { status: Task['status'] }) => {
  const baseClasses =
    'inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium'
  const statusStyles = {
    Completed: 'bg-green-100 text-green-700',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Overdue: 'bg-red-100 text-red-700',
    Todo: 'bg-gray-100 text-gray-600',
  }
  const iconStyles = {
    Completed: <CheckCircleIcon className="-ml-0.5 h-4 w-4" />,
    'In Progress': <ClockIcon className="-ml-0.5 h-4 w-4" />,
    Overdue: <ExclamationTriangleIcon className="-ml-0.5 h-4 w-4" />,
    Todo: <TagIcon className="-ml-0.5 h-4 w-4" />,
  }

  return (
    <span className={`${baseClasses} ${statusStyles[status]}`}>
      {iconStyles[status]}
      {status}
    </span>
  )
}

export default function ViewTask() {
  //   const { token } = useSession()
  //   const taskId = useTaskId()

  //   const showTaskQuery = useShowTask(taskId, authHeader(token))
  //   return matchQueryStatus(showTaskQuery, {
  //     Loading: <LoadingUI />,
  //     Errored: <ErrorUI message="Something went wrong!" />,
  //     Empty: <></>,
  //     Success: ({ data }) => {
  //       const task = data.data
  //       return (
  //         <div>
  //           <h1 className="text-2xl font-bold">{task.name}</h1>
  //           <p className="mt-2 text-gray-600">{task.description}</p>
  //           {/* Add more task details here */}
  //         </div>
  //       )
  //     },
  //   })

  return (
    <div className="bg-gray-100/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-6 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:truncate">
                {task.name}
              </h1>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                In project{' '}
                <Link
                  href={`/projects/${task.project.id}`}
                  className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {task.project.name}
                </Link>
              </div>
            </div>
            <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PencilIcon
                  className="-ml-0.5 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                Edit Task
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column (Description & Attachments) */}
            <div className="space-y-8 lg:col-span-2">
              {/* Description Card */}
              <div className="bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900">
                  Description
                </h2>
                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html:
                      task.description || '<p>No description provided.</p>',
                  }}
                />
              </div>
            </div>

            {/* Right Column (Details) */}
            <div className="space-y-6 lg:col-span-1">
              <div className="bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
                <h3 className="font-semibold text-gray-900">Details</h3>
                <dl className="mt-4 space-y-4">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-x-2 text-sm font-medium text-gray-500">
                      <CheckCircleIcon className="h-5 w-5 text-gray-400" />
                      Status
                    </dt>
                    <dd className="text-sm text-gray-900">
                      <StatusBadge status={task.status} />
                    </dd>
                  </div>
                  {/* Assignee */}
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-x-2 text-sm font-medium text-gray-500">
                      <UserCircleIcon className="h-5 w-5 text-gray-400" />
                      Assignee
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-x-2">
                        <Image
                          className="h-6 w-6 rounded-full"
                          src={task.assignee.avatarUrl || ''}
                          alt=""
                          width={24}
                          height={24}
                        />
                        {task.assignee.name}
                      </div>
                    </dd>
                  </div>
                  {/* Project */}
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-x-2 text-sm font-medium text-gray-500">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                      Project
                    </dt>
                    <dd className="text-sm text-gray-900">
                      <Link
                        href={`/projects/${task.project.id}`}
                        className="font-medium text-indigo-600 hover:underline"
                      >
                        {task.project.name}
                      </Link>
                    </dd>
                  </div>
                  {/* Due Date */}
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-x-2 text-sm font-medium text-gray-500">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      Due Date
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formatDate(task.due_date)}
                    </dd>
                  </div>
                  {/* Created Date */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Created
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formatDate(task.created_at)}
                    </dd>
                  </div>
                  {/* Updated Date */}
                  <div className="flex items-center justify-between">
                    <dt className="text-sm font-medium text-gray-500">
                      Last Updated
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formatDate(task.updated_at)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
