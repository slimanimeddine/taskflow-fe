'use client'

import ErrorUI from '@/components/error-ui'
import LoadingUI from '@/components/loading-ui'
import { useListWorkspaceMembers } from '@/hooks/endpoints/users'
import { useSession } from '@/hooks/use-session'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { authHeader, getFirstLetter, matchQueryStatus } from '@/lib/utils'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import DeleteMember from './delete-member'

export default function MembersList() {
  const workspaceId = useWorkspaceId()
  const { id, token } = useSession()
  const listWorkspaceMembersQuery = useListWorkspaceMembers(
    workspaceId,
    authHeader(token)
  )
  return (
    <div>
      {matchQueryStatus(listWorkspaceMembersQuery, {
        Loading: <LoadingUI />,
        Errored: <ErrorUI message="Something went wrong!" />,
        Empty: <></>,
        Success: ({ data }) => {
          const members = data.data
          console.log(members)

          return (
            <ul
              role="list"
              className="divide-y divide-gray-100"
            >
              {members.map((member) => (
                <li
                  key={member.email}
                  className="flex items-center justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-500">
                      <span className="text-xs leading-none font-medium text-white">
                        {getFirstLetter(member.name)}
                      </span>
                    </span>

                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {member.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <Menu
                    as="div"
                    className="relative flex-none"
                  >
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">Open options</span>
                      <button className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Actions
                      </button>
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <button className="w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                          Edit<span className="sr-only">, {member.name}</span>
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                          Move<span className="sr-only">, {member.name}</span>
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <DeleteMember
                          userId={member.id}
                          isSelf={member.id === id}
                        />
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </li>
              ))}
            </ul>
          )
        },
      })}
    </div>
  )
}
