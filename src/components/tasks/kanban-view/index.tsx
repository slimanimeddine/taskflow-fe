"use client";

import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { type Task } from "@/types/models";
import { useEditTask } from "@/hooks/endpoints/tasks";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import AddTask from "./add-task";
import KanbanCard from "./kanban-card";
import toast from "react-hot-toast";

type KanbanViewProps = {
  tasks: Task[];
};

const COLUMN_STATUSES = [
  "backlog",
  "todo",
  "in_progress",
  "in_review",
  "done",
] as const;
type ColumnStatus = (typeof COLUMN_STATUSES)[number];

const COLUMN_TITLES: Record<ColumnStatus, string> = {
  backlog: "Backlog",
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
};

const COLUMN_COLORS: Record<ColumnStatus, string> = {
  backlog: "bg-gray-100 ring-gray-200",
  todo: "bg-blue-100 ring-blue-200",
  in_progress: "bg-yellow-100 ring-yellow-200",
  in_review: "bg-purple-100 ring-purple-200",
  done: "bg-green-100 ring-green-200",
};

export default function KanbanView({ tasks: initialTasks }: KanbanViewProps) {
  const [internalTasks, setInternalTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setInternalTasks(initialTasks);
  }, [initialTasks]);

  const groupedTasks = COLUMN_STATUSES.reduce(
    (acc, status) => {
      acc[status] = internalTasks
        .filter((task) => task.status === status)
        .sort((a, b) => a.position - b.position);
      return acc;
    },
    {} as Record<ColumnStatus, Task[]>,
  );
  const { token } = useSession();

  const authConfig = authHeader(token);

  const { mutate } = useEditTask(authConfig);

  const queryClient = useQueryClient();

  function updateTask(taskId: string, status: ColumnStatus, position?: number) {
    mutate(
      {
        taskId,
        data: {
          status,
          position,
        },
      },

      {
        onError: (error) => {
          if (error.isAxiosError) {
            toast.error(error.response?.data.message ?? "Something went wrong");
          } else {
            toast.error(error.message);
          }
        },
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: ["/api/v1/tasks"],
          });
        },
      },
    );
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = Array.from(internalTasks);

    const draggedTaskIndex = updatedTasks.findIndex(
      (task) => task.id === draggableId,
    );

    if (draggedTaskIndex === -1) {
      return;
    }

    const draggedTask = updatedTasks[draggedTaskIndex];

    const oldStatus = draggedTask.status;
    const newStatus = destination.droppableId as ColumnStatus;

    updatedTasks.splice(draggedTaskIndex, 1);

    draggedTask.status = newStatus;

    const currentGroupedTasks: Record<ColumnStatus, Task[]> =
      COLUMN_STATUSES.reduce(
        (acc, status) => {
          acc[status] = updatedTasks
            .filter((task) => task.status === status)
            .sort((a, b) => a.position - b.position);
          return acc;
        },
        {} as Record<ColumnStatus, Task[]>,
      );

    currentGroupedTasks[newStatus].splice(destination.index, 0, draggedTask);

    Object.keys(currentGroupedTasks).forEach((statusKey) => {
      const status = statusKey as ColumnStatus;

      currentGroupedTasks[status] = currentGroupedTasks[status].map(
        (task, idx) => ({
          ...task,
          position: idx,
        }),
      );
    });

    setInternalTasks(Object.values(currentGroupedTasks).flat());

    if (oldStatus !== newStatus) {
      updateTask(draggableId, newStatus);

      const oldStatusTasks = currentGroupedTasks[oldStatus];

      if (oldStatusTasks.length > 0) {
        oldStatusTasks.forEach((element) => {
          updateTask(element.id, oldStatus, element.position);
        });
      }

      const newStatusTasks = currentGroupedTasks[newStatus];

      if (newStatusTasks.length > 0) {
        newStatusTasks.forEach((element) => {
          updateTask(element.id, newStatus, element.position);
        });
      }
    } else {
      const oldStatusTasks = currentGroupedTasks[oldStatus];

      if (oldStatusTasks.length > 0) {
        oldStatusTasks.forEach((element) => {
          updateTask(element.id, oldStatus, element.position);
        });
      }
    }
  };

  return (
    <div className="min-h-screen rounded-lg bg-white p-4 antialiased">
      <div className="mx-auto max-w-7xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col space-y-6 overflow-x-auto pb-4 md:flex-row md:space-y-0 md:space-x-6">
            {COLUMN_STATUSES.map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex min-h-[300px] w-full flex-shrink-0 flex-col rounded-xl border border-gray-200 p-4 shadow-sm ring-1 md:w-80 ${COLUMN_COLORS[status]} ${snapshot.isDraggingOver ? "bg-opacity-80" : ""} `}
                  >
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                      {COLUMN_TITLES[status]} ({groupedTasks[status].length})
                    </h2>
                    {groupedTasks[status].map((task, index) => (
                      <KanbanCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                    <AddTask status={status} />
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
