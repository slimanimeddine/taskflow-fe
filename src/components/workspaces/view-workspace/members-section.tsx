'use client'

import ErrorUI from '@/components/error-ui'
import LoadingUI from '@/components/loading-ui'
import { useListWorkspaceMembers } from '@/hooks/endpoints/users'
import { useSession } from '@/hooks/use-session'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'
import { authHeader, getFirstLetter, matchQueryStatus } from '@/lib/utils'
import { Member, User } from '@/types/models'

type MemberUser = User & {
  pivot: Member
}

export default function MembersSection() {
  const workspaceId = useWorkspaceId()
  const { token } = useSession()
  const listWorkspaceMembersQuery = useListWorkspaceMembers(
    workspaceId,
    authHeader(token)
  )
  return matchQueryStatus(listWorkspaceMembersQuery, {
    Loading: <LoadingUI />,
    Errored: <ErrorUI message="Something went wrong!" />,
    Empty: <></>,
    Success: ({ data }) => {
      const members = data.data as MemberUser[]
      return (
        <section>
          <h2 className="text-xl font-bold text-gray-900">Members</h2>
          <ul
            role="list"
            className="mt-4 space-y-4"
          >
            {members.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-x-4"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                  <span className="text-sm leading-none font-medium text-white">
                    {getFirstLetter(member.name)}
                  </span>
                </span>

                <div className="flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {member.name}
                  </p>
                  <p className="text-xs leading-5 text-gray-500">
                    {member.email}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {member.pivot.role}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )
    },
  })
}
