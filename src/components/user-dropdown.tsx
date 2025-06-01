'use client'
import SignOutButton from '@/components/auth/sign-out'
import { useGetAuthenticatedUser } from '@/hooks/endpoints/users'
import { authHeader, getFirstLetter, matchQueryStatus } from '@/lib/utils'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LoadingUI from '@/components/loading-ui'
import ErrorUI from '@/components/error-ui'
import { useSession } from '@/hooks/use-session'

export default function UserDropdown() {
  const { token } = useSession()
  const getAuthenticatedUserQuery = useGetAuthenticatedUser(authHeader(token))

  return (
    <Menu
      as="div"
      className="relative"
    >
      {matchQueryStatus(getAuthenticatedUserQuery, {
        Loading: <LoadingUI />,
        Errored: <ErrorUI message="Something went wrong!" />,
        Empty: <></>,
        Success: ({ data }) => (
          <MenuButton className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Open user menu</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
              <span className="text-sm leading-none font-medium text-white">
                {getFirstLetter(data.data.name)}
              </span>
            </span>
            <span className="hidden lg:flex lg:items-center">
              <span
                aria-hidden="true"
                className="ml-4 text-sm leading-6 font-semibold text-gray-900"
              >
                {data.data.name}
              </span>
              <ChevronDownIcon
                aria-hidden="true"
                className="ml-2 h-5 w-5 text-gray-400"
              />
            </span>
          </MenuButton>
        ),
      })}

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
      >
        <MenuItem>
          <SignOutButton />
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
