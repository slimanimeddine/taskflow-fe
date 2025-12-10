"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShowTask } from "@/hooks/endpoints/tasks";
import { useTaskId } from "@/hooks/params/use-task-id";
import { useOpenModal } from "@/hooks/use-open-modal";
import { useRemoveTask } from "@/hooks/use-remove-task";
import { useSession } from "@/hooks/use-session";
import {
  authHeader,
  classNames,
  getFirstLetter,
  statusLabel,
} from "@/lib/utils";
import type { Task } from "@/types/models";
import ErrorUI from "../error-ui";
import LoadingUI from "../loading-ui";
import EditTaskModal from "./edit-task/modal";

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const STATUS_COLORS: Record<Task["status"], string> = {
  backlog: "bg-gray-50 text-gray-700 ring-gray-600/20",
  todo: "bg-blue-50 text-blue-700 ring-blue-600/20",
  in_progress: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  in_review: "bg-purple-50 text-purple-700 ring-purple-600/20",
  done: "bg-green-50 text-green-700 ring-green-600/20",
};

export default function ViewTask() {
  const { token } = useSession();
  const taskId = useTaskId();
  const { openModal } = useOpenModal();
  const { removeTask, isDisabled } = useRemoveTask(taskId);
  const router = useRouter();
  function deleteTask() {
    removeTask();
    router.back();
  }

  const { isPending, isError, data, error } = useShowTask(
    taskId,
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <div></div>;
  }

  const task = data.data;
  return (
    <>
      <EditTaskModal taskId={taskId} />

      <div className="mt-8 rounded-lg bg-gray-100/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-6 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:truncate">
                  {task.name}
                </h1>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  In project{" "}
                  <Link
                    href={`/workspaces/${task.workspace_id}/projects/${task.project_id}`}
                    className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {task.project.name}
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex shrink-0 gap-x-2 md:mt-0 md:ml-4">
                <button
                  type="button"
                  disabled={isDisabled}
                  onClick={deleteTask}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <TrashIcon
                    className="text-white-500 -ml-0.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Delete Task
                </button>

                <button
                  type="button"
                  onClick={() => openModal("edit-task", taskId)}
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Left Column (Description & Attachments) */}
              <div className="space-y-8 lg:col-span-2">
                {/* Description Card */}
                <div className="bg-white p-6 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Description
                  </h2>
                  <div className="prose prose-sm mt-4 max-w-none text-gray-600">
                    {task.description ?? "No description was provided"}
                  </div>
                </div>
              </div>

              {/* Right Column (Details) */}
              <div className="space-y-6 lg:col-span-2">
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
                        <span
                          className={classNames(
                            "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                            STATUS_COLORS[task.status],
                          )}
                        >
                          {statusLabel(task.status)}
                        </span>
                      </dd>
                    </div>
                    {/* Assignee */}
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-x-2 text-sm font-medium text-gray-500">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                        Assignee
                      </dt>
                      <dd>
                        <div className="flex items-center gap-x-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                            <span className="text-sm leading-none font-medium text-white">
                              {getFirstLetter(task.assignee.name)}
                            </span>
                          </span>

                          <span className="text-sm font-medium text-gray-900">
                            {task.assignee.name}
                          </span>
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
                          href={`/workspaces/${task.workspace_id}/projects/${task.project_id}`}
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
    </>
  );
}
