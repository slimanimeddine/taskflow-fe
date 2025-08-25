"use client";
import { type Task } from "@/types/models";
import { Draggable } from "@hello-pangea/dnd";
import {
  CalendarIcon,
  UserCircleIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/20/solid";
import RowDropdown from "../row-dropdown";

type KanbanCardProps = {
  task: Task;
  index: number;
};

export default function KanbanCard({ task, index }: KanbanCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 rounded-lg bg-white p-4 shadow ring-1 ring-gray-100 transition-all duration-200 ease-in-out ${snapshot.isDragging ? "scale-105 rotate-1 transform shadow-lg ring-indigo-500" : ""}`}
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-medium text-gray-900">{task.name}</h3>
            <RowDropdown taskId={task.id} projectId={task.project_id} />
          </div>
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
                <span>{new Date(task.due_date).toLocaleDateString()}</span>
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
  );
}
