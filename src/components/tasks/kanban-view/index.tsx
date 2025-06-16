'use client'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import {
  CalendarIcon,
  UserCircleIcon,
  Bars3BottomLeftIcon,
} from '@heroicons/react/20/solid'
import { Task } from '@/types/models'
import { useEditTask } from '@/hooks/endpoints/tasks'
import { useSession } from '@/hooks/use-session'
import { authHeader, onError } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'

type KanbanViewProps = {
  tasks: Task[]
}

const COLUMN_STATUSES = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done',
] as const
type ColumnStatus = (typeof COLUMN_STATUSES)[number]

const COLUMN_TITLES: Record<ColumnStatus, string> = {
  backlog: 'Backlog',
  todo: 'To Do',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
}

const COLUMN_COLORS: Record<ColumnStatus, string> = {
  backlog: 'bg-gray-100 ring-gray-200',
  todo: 'bg-blue-100 ring-blue-200',
  in_progress: 'bg-yellow-100 ring-yellow-200',
  in_review: 'bg-purple-100 ring-purple-200',
  done: 'bg-green-100 ring-green-200',
}

export default function KanbanView({ tasks: initialTasks }: KanbanViewProps) {
  const [internalTasks, setInternalTasks] = useState<Task[]>(initialTasks)

  useEffect(() => {
    setInternalTasks(initialTasks)
  }, [initialTasks])

  const groupedTasks = COLUMN_STATUSES.reduce(
    (acc, status) => {
      acc[status] = internalTasks
        .filter((task) => task.status === status)
        .sort((a, b) => a.position - b.position)
      return acc
    },
    {} as Record<ColumnStatus, Task[]>
  )
  const { token } = useSession()

  const editTaskMutation = useEditTask(authHeader(token))

  const queryClient = useQueryClient()

  function changeStatus(taskId: string, status: ColumnStatus) {
    editTaskMutation.mutate(
      {
        taskId,
        data: {
          status,
        },
      },
      {
        onError,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['/api/v1/tasks'],
          })
          toast.success('Task status updated successfully!')
        },
      }
    )
  }

  const isDisabled = editTaskMutation.isPending

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) {
      return
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const updatedTasks = Array.from(internalTasks)
    const draggedTaskIndex = updatedTasks.findIndex(
      (task) => task.id === draggableId
    )

    if (draggedTaskIndex === -1) {
      console.error('Dragged task not found in internalTasks.')
      return
    }

    const draggedTask = updatedTasks[draggedTaskIndex]
    const oldStatus = draggedTask.status
    const newStatus = destination.droppableId as ColumnStatus

    updatedTasks.splice(draggedTaskIndex, 1)

    draggedTask.status = newStatus

    const currentGroupedTasks: Record<ColumnStatus, Task[]> =
      COLUMN_STATUSES.reduce(
        (acc, status) => {
          acc[status] = updatedTasks
            .filter((task) => task.status === status)
            .sort((a, b) => a.position - b.position)
          return acc
        },
        {} as Record<ColumnStatus, Task[]>
      )

    currentGroupedTasks[newStatus].splice(destination.index, 0, draggedTask)

    Object.keys(currentGroupedTasks).forEach((statusKey) => {
      const status = statusKey as ColumnStatus
      currentGroupedTasks[status] = currentGroupedTasks[status].map(
        (task, idx) => ({
          ...task,
          position: idx,
        })
      )
    })

    setInternalTasks(Object.values(currentGroupedTasks).flat())

    if (oldStatus !== newStatus) {
      changeStatus(draggableId, newStatus)
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 antialiased rounded-lg">
      <div className="mx-auto max-w-7xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0 overflow-x-auto pb-4">
            {COLUMN_STATUSES.map((status) => (
              <Droppable
                key={status}
                droppableId={status}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      flex min-h-[300px] w-full flex-shrink-0 flex-col rounded-xl border border-gray-200 p-4 shadow-sm ring-1 md:w-80
                      ${COLUMN_COLORS[status]}
                      ${snapshot.isDraggingOver ? 'bg-opacity-80' : ''}
                    `}
                  >
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                      {COLUMN_TITLES[status]} ({groupedTasks[status].length})
                    </h2>
                    {groupedTasks[status].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`
                              mb-3 rounded-lg bg-white p-4 shadow ring-1 ring-gray-100 transition-all duration-200 ease-in-out
                              ${
                                snapshot.isDragging
                                  ? 'rotate-1 scale-105 transform ring-indigo-500 shadow-lg' // Visual feedback when dragging
                                  : ''
                              }
                            `}
                          >
                            <h3 className="mb-2 text-base font-medium text-gray-900">
                              {task.name}
                            </h3>
                            {task.description && (
                              <p className="mb-2 line-clamp-2 text-sm text-gray-600">
                                <Bars3BottomLeftIcon className="mr-1 inline-block h-4 w-4 text-gray-400" />
                                {task.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              {task.due_date && (
                                <div className="flex items-center">
                                  <CalendarIcon className="mr-1 h-4 w-4" />
                                  <span>
                                    {new Date(
                                      task.due_date
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {task.assignee && (
                                <div className="flex items-center">
                                  <UserCircleIcon className="mr-1 h-4 w-4" />
                                  <span>{task.assignee.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <button
                      type="button"
                      className="mt-auto block w-full rounded-md border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-800"
                      disabled={isDisabled}
                    >
                      + Add New Task
                    </button>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}
