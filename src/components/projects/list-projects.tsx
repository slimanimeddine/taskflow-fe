"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useListWorkspaceProjects } from "@/hooks/endpoints/projects";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import { useSession } from "@/hooks/use-session";
import { authHeader, classNames, fileUrl, getFirstLetter } from "@/lib/utils";
import ErrorUI from "../error-ui";
import LoadingUI from "../loading-ui";

export default function ListProjects() {
  const { token } = useSession();
  const workspaceId = useWorkspaceId();
  const { isPending, isError, data, error } = useListWorkspaceProjects(
    workspaceId,
    authHeader(token),
  );
  const pathname = usePathname();

  if (isPending) {
    return <LoadingUI />;
  }

  if (isError) {
    return <ErrorUI message={error?.message || "Something went wrong!"} />;
  }

  if (!data || data.data.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <ul className="-mx-2 mt-2 space-y-1">
        {data.data.map((project) => {
          const link = `/workspaces/${workspaceId}/projects/${project.id}`;
          return (
            <li key={project.name}>
              <Link
                href={link as Route}
                aria-current={pathname === link ? "page" : undefined}
                className={classNames(
                  pathname === link
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                )}
              >
                {project.image_path ? (
                  <Image
                    alt=""
                    src={fileUrl(project.image_path) as string}
                    className="size-6 shrink-0 rounded-lg"
                    width={24}
                    height={24}
                  />
                ) : (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                    {getFirstLetter(project.name)}
                  </span>
                )}

                <span className="truncate">{project.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
