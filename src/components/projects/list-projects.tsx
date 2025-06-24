'use client'

import { useListWorkspaceProjects } from '@/hooks/endpoints/projects'
import { useSession } from '@/hooks/use-session'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import {
  authHeader,
  classNames,
  fileUrl,
  getFirstLetter,
  matchQueryStatus,
} from '@/lib/utils'
import LoadingUI from '../loading-ui'
import ErrorUI from '../error-ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function ListProjects() {
  const { token } = useSession()
  const workspaceId = useWorkspaceId()
  const listWorkspaceProjectsQuery = useListWorkspaceProjects(
    workspaceId,
    authHeader(token)
  )
  const pathname = usePathname()

  return matchQueryStatus(listWorkspaceProjectsQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const projects = data.data
      console.log(
        'test projects: ',
        projects.map((item) => fileUrl(item.image_path))
      )
      return (
        <div>
          <ul
            role="list"
            className="-mx-2 mt-2 space-y-1"
          >
            {projects.map((project) => {
              const link = `/workspaces/${workspaceId}/projects/${project.id}`
              return (
                <li key={project.name}>
                  <Link
                    href={link}
                    aria-current={pathname === link ? 'page' : undefined}
                    className={classNames(
                      pathname === link
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    {project.image_path ? (
                      <Image
                        alt=""
                        // src={fileUrl(project.image_path)!}
                        src="https://taskflow-be-e9cwcqfrgmd9cngf.francecentral-01.azurewebsites.net/storage/workspaces/VqqqmsuBdpPf7Hevt8yPLQdZvfu2V0gGjEHyw4Yc.webp"
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
              )
            })}
          </ul>
        </div>
      )
    },
  })
}
