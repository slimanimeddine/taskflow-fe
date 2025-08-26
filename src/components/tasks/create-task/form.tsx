"use client";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authHeader } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-session";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { type CreateTaskBody, useCreateTask } from "@/hooks/endpoints/tasks";
import { createTaskBody } from "@/schemas/tasks";
import { useOpenModal } from "@/hooks/use-open-modal";
import { useSetTaskStatusOnCreate } from "@/hooks/use-set-task-status-on-create";
import TaskAssigneeSelectInput from "./task-assignee-select-input";
import ProjectSelectInput from "./project-select-input";

type CreateTaskFormProps = {
  defaultAssigneeId?: string;
  defaultProjectId?: string;
};

export default function CreateTaskForm({
  defaultAssigneeId,
  defaultProjectId,
}: CreateTaskFormProps) {
  const workspaceId = useWorkspaceId();
  const { taskStatus } = useSetTaskStatusOnCreate();

  const { handleSubmit, register, formState, reset } = useForm<CreateTaskBody>({
    resolver: zodResolver(createTaskBody),
    defaultValues: {
      workspace_id: workspaceId,
      status: taskStatus ?? undefined,
      assignee_id: defaultAssigneeId ?? undefined,
      project_id: defaultProjectId ?? undefined,
    },
  });

  const { closeModal } = useOpenModal();

  const { token } = useSession();

  const { mutate, isPending } = useCreateTask(authHeader(token));

  const queryClient = useQueryClient();

  function onSubmit(data: CreateTaskBody) {
    mutate(
      {
        data,
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
          reset();
          void queryClient.invalidateQueries({
            queryKey: ["/api/v1/tasks"],
          });

          closeModal();
          toast.success("Task created successfully!");
        },
      },
    );
  }

  const isDisabled = formState.isSubmitting || isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl leading-7 font-semibold text-gray-900">
          Create task
        </h2>
        <div className="mt-4 border-t border-dotted border-gray-300"></div>
      </div>

      <div className="space-y-8">
        <div>
          <label
            htmlFor="task-name"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Task name
          </label>
          <div className="mt-2">
            <input
              id="name"
              type="text"
              placeholder="Enter task name"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
              {...register("name")}
            />
            {formState.errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="task-description"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              placeholder="Enter task description"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
              {...register("description")}
            ></textarea>
            {formState.errors.description && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="task-due-date"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Task due date
          </label>
          <div className="mt-2">
            <input
              id="due-date"
              type="date"
              placeholder="Enter task due-date"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
              {...register("due_date")}
            />
            {formState.errors.due_date && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.due_date.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="task-status"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Task status
          </label>
          <div className="mt-2">
            <select
              id="status"
              disabled={!!taskStatus}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pr-10 pl-3 text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 disabled:opacity-50 sm:text-sm sm:leading-6"
              {...register("status")}
            >
              <option value="backlog">Backlog</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="in_review">In Review</option>
              <option value="done">Done</option>
            </select>
            {formState.errors.status && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="task-assignee"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Task assignee
          </label>
          <div className="mt-2">
            <TaskAssigneeSelectInput
              {...register("assignee_id")}
              defaultAssigneeId={defaultAssigneeId}
            />

            {formState.errors.assignee_id && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.assignee_id.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="task-project"
            className="block text-sm leading-6 font-medium text-gray-900"
          >
            Task project
          </label>
          <div className="mt-2">
            <ProjectSelectInput
              {...register("project_id")}
              defaultProjectId={defaultProjectId}
            />

            {formState.errors.project_id && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.project_id.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-dotted border-gray-300"></div>

      <div className="flex items-center justify-end gap-x-6">
        <button
          onClick={closeModal}
          type="button"
          className="text-sm leading-6 font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isDisabled}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
