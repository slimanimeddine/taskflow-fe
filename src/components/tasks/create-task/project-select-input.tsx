"use client";

import type { Ref } from "react";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useListWorkspaceProjects } from "@/hooks/endpoints/projects";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";

type Props = {
  defaultProjectId?: string;
  name: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  ref?: Ref<HTMLSelectElement>;
};

export default function ProjectSelectInput({
  defaultProjectId,
  name,
  onChange,
  onBlur,
  ref,
}: Props) {
  const workspaceId = useWorkspaceId();

  const { token } = useSession();

  const { isPending, isError, data, error } = useListWorkspaceProjects(
    workspaceId,
    authHeader(token),
  );

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return <div></div>;
  }

  const projects = data.data;

  return (
    <select
      id="project"
      name={name}
      defaultValue={defaultProjectId}
      disabled={!!defaultProjectId}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
      className="mt-2 block w-full rounded-md border-0 py-1.5 pr-10 pl-3 text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 disabled:opacity-50 sm:text-sm sm:leading-6"
    >
      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.name}
        </option>
      ))}
    </select>
  );
}
