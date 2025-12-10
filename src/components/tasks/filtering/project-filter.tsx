"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import ErrorUI from "@/components/error-ui";
import LoadingUI from "@/components/loading-ui";
import { useListWorkspaceProjects } from "@/hooks/endpoints/projects";
import { useTaskProjectFilter } from "@/hooks/filtering/use-task-project-filter";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader } from "@/lib/utils";

export default function ProjectFilter() {
  const { project, setProject } = useTaskProjectFilter();
  const { token } = useSession();
  const workspaceId = useWorkspaceId();
  const { isPending, isError, data, error } = useListWorkspaceProjects(
    workspaceId,
    authHeader(token),
  );

  const handleOnChange = (value: { id: string; name: string }) => {
    if (value.id === "all") {
      void setProject(null);
    } else {
      void setProject(value);
    }
  };

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data?.data || data.data.length === 0) {
    return <div></div>;
  }
  const projects = data.data.map((project) => ({
    id: project.id,
    name: project.name,
  }));

  const extendedProjects = [...projects, { id: "all", name: "All" }];
  return (
    <Listbox value={project} onChange={handleOnChange}>
      <div className="relative mt-2">
        <Label className="block text-sm leading-6 font-medium text-gray-900">
          Project
        </Label>

        <ListboxButton className="relative inline-flex cursor-default rounded-md bg-white py-1.5 pr-10 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6">
          {" "}
          {/* Changed w-full to inline-flex */}
          <span className="block truncate">
            {project ? project.name : "All"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="ring-opacity-5 absolute z-10 mt-1 max-h-60 min-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm" // Removed w-full and added min-w-max
        >
          {extendedProjects.map((project) => (
            <ListboxOption
              key={project.id}
              value={project}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
            >
              <span className="block truncate font-normal group-data-selected:font-semibold">
                {project.name}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-focus:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
