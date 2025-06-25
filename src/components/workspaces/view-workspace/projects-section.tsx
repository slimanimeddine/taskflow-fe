'use client'

import ErrorUI from '@/components/error-ui'
import LoadingUI from '@/components/loading-ui'
import { useListWorkspaceProjects } from '@/hooks/endpoints/projects'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import { useSession } from '@/hooks/use-session'
import { authHeader, fileUrl, matchQueryStatus } from '@/lib/utils'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectsSection() {
  const { token } = useSession()
  const workspaceId = useWorkspaceId()
  const listWorkspaceProjectsQuery = useListWorkspaceProjects(
    workspaceId,
    authHeader(token)
  )

  return matchQueryStatus(listWorkspaceProjectsQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const projects = data.data

      return (
        <section>
          <h2 className="text-xl font-bold text-gray-900">Projects</h2>
          <ul
            role="list"
            className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center">
                  {project.image_path ? (
                    <Image
                      alt=""
                      src={fileUrl(project.image_path)!}
                      overrideSrc={fileUrl(project.image_path)!}
                      className="size-10 shrink-0 rounded-lg"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                        {project.name.charAt(0)}
                      </div>
                    </div>
                  )}

                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {project.name}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/workspaces/${workspaceId}/projects/${project.id}`}
                  className="rounded-full bg-white p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <ChevronRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )
    },
  })
}
