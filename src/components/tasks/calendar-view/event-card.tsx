'use client'

import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import { classNames } from '@/lib/utils'
import { Project, Task, User } from '@/types/models'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

type EventCardProps = {
  id: string
  title: string
  assignee: User
  project: Project
  status: Task['status']
}

const STATUS_COLORS: Record<Task['status'], string> = {
  backlog: 'border-l-gray-500',
  todo: 'border-l-blue-500',
  in_progress: 'border-l-yellow-500',
  in_review: 'border-l-purple-500',
  done: 'border-l-green-500',
}

// Map status to a more user-friendly label for display
const STATUS_LABELS: Record<Task['status'], string> = {
  backlog: 'Backlog',
  todo: 'To Do',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
}

export default function EventCard({
  id,
  title,
  assignee,
  project,
  status,
}: EventCardProps) {
  const workspaceId = useWorkspaceId()
  const router = useRouter()

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    router.push(`/workspaces/${workspaceId}/tasks/${id}`)
  }
  return (
    <div className="px-2 py-1 h-full w-full">
      <div
        onClick={handleClick}
        className={classNames(
          'p-1.5 text-xs bg-white text-gray-800 border border-l-4 rounded shadow-sm flex flex-col gap-y-1 overflow-hidden h-full cursor-pointer hover:opacity-90 transition-opacity duration-200',
          STATUS_COLORS[status]
        )}
      >
        {/* Task Title - Prominent */}
        <p className="font-semibold text-sm truncate">{title}</p>

        {/* Project Name - Secondary Info */}
        {project && (
          <p className="text-gray-600 truncate">
            <span className="font-medium">Project:</span> {project.name}
          </p>
        )}

        {/* Assignee - Tertiary Info, often an avatar is good here */}
        {assignee && (
          <p className="text-gray-500 truncate">
            <span className="font-medium">Assigned to:</span> {assignee.name}
          </p>
        )}

        {/* Status Badge/Pill - Visually distinct */}
        <div className="mt-auto pt-1">
          {' '}
          {/* Push status to the bottom */}
          <span
            className={classNames(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
              status === 'done'
                ? 'bg-green-100 text-green-800'
                : status === 'in_progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : status === 'todo'
                    ? 'bg-blue-100 text-blue-800'
                    : status === 'in_review'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
            )}
          >
            {STATUS_LABELS[status]}
          </span>
        </div>
      </div>
    </div>
  )
}
