"use client";

import { PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useShowProject } from "@/hooks/endpoints/projects";
import { useProjectId } from "@/hooks/params/use-project-id";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader, fileUrl, getFirstLetter } from "@/lib/utils";
import ErrorUI from "../../error-ui";
import LoadingUI from "../../loading-ui";
import ViewTasks from "../../tasks/view-tasks";
import ProjectStats from "./stats";

export default function ViewProject() {
  const { token } = useSession();
  const projectId = useProjectId();
  const workspaceId = useWorkspaceId();

  const { isPending, isError, data, error } = useShowProject(
    projectId,
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

  const project = data.data;

  return (
    <div>
      <div className="relative isolate overflow-hidden">
        {/* Secondary navigation */}
        <header className="pt-6 pb-4 sm:pb-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 sm:flex-nowrap">
            <h1 className="flex items-center text-base leading-7 font-semibold text-gray-900">
              {project.image_path ? (
                <Image
                  alt=""
                  src={fileUrl(project.image_path) as string}
                  className="size-8 shrink-0 rounded-lg"
                  width={32}
                  height={32}
                />
              ) : (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-500">
                  <span className="text-sm leading-none font-medium text-white">
                    {getFirstLetter(project.name)}
                  </span>
                </span>
              )}
              <span className="ml-2">{project.name}</span>
            </h1>
            <Link
              href={`/workspaces/${workspaceId}/projects/${projectId}/settings`}
              className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PencilIcon aria-hidden="true" className="-ml-1.5 h-5 w-5" />
              Edit project
            </Link>
          </div>
        </header>

        <ProjectStats />
      </div>

      <div className="mt-8">
        <ViewTasks defaultProjectId={projectId} />
      </div>
    </div>
  );
}
