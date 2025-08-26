"use client";

import { authHeader } from "@/lib/utils";
import { type Task } from "@/types/models";
import { type ApiResource } from "@/types/api-responses";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useListTasks } from "@/hooks/endpoints/tasks";
import { useTaskAssigneeFilter } from "@/hooks/filtering/use-task-assignee-filter";
import { useTaskDueDateFilter } from "@/hooks/filtering/use-task-due-date-filter";
import { useTaskProjectFilter } from "@/hooks/filtering/use-task-project-filter";
import { useTaskStatusFilter } from "@/hooks/filtering/use-task-status-filter";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useTaskSort } from "@/hooks/sorting/use-task-sort";
import { useSession } from "@/hooks/use-session";
import CalendarView from ".";

type CalendarViewWrapperProps = {
  defaultProjectId?: string;
  defaultAssigneeId?: string;
};

export default function CalendarViewWrapper({
  defaultProjectId,
  defaultAssigneeId,
}: CalendarViewWrapperProps) {
  const { token } = useSession();
  const workspaceId = useWorkspaceId();
  const { status } = useTaskStatusFilter();
  const { project } = useTaskProjectFilter();
  const { assignee } = useTaskAssigneeFilter();
  const { sort } = useTaskSort();
  const { dueDate } = useTaskDueDateFilter();

  const { isPending, isError, data, error } = useListTasks<ApiResource<Task[]>>(
    {
      "filter[workspace]": workspaceId,
      ...(status && { "filter[status]": status }),
      ...(defaultProjectId
        ? { "filter[project]": defaultProjectId }
        : project && { "filter[project]": project.id }),
      ...(defaultAssigneeId
        ? { "filter[assignee]": defaultAssigneeId }
        : assignee && { "filter[assignee]": assignee.id }),
      ...(dueDate && { "filter[due_date]": dueDate.toDateString() }),
      ...(sort && { sort }),
      paginate: 0,
    },
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return <></>;
  }

  const tasks = data.data;

  return <CalendarView tasks={tasks} />;
}
