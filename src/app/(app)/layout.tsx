'use client'
import SignOutButton from '@/components/auth/sign-out'
import Logo from '@/components/logo'
import { useGetAuthenticatedUser } from '@/hooks/endpoints/users'
import {
  authHeader,
  classNames,
  getFirstLetter,
  matchQueryStatus,
} from '@/lib/utils'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LoadingUI from '@/components/loading-ui'
import ErrorUI from '@/components/error-ui'
import WorkspaceSwitcherWrapper from '@/components/workspaces/workspace-switcher/wrapper'
import CreateWorkspaceModal from '@/components/workspaces/create-workspace/create-workspace-modal'
import { useSession } from '@/hooks/use-session'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'My Tasks', href: '/my-tasks', icon: ClipboardDocumentListIcon },
  { name: 'Members', href: '/members', icon: UsersIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

const projects = [
  {
    id: 1,
    name: 'Project Alpha',
    href: '/projects/1',
  },
  {
    id: 2,
    name: 'Project Beta',
    href: '/projects/2',
  },
  {
    id: 3,
    name: 'Project Gamma',
    href: '/projects/3',
  },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { token } = useSession()
  const pathname = usePathname()
  const getAuthenticatedUserQuery = useGetAuthenticatedUser(authHeader(token))

  return (
    <div>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <Logo />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul
                  role="list"
                  className="flex flex-1 flex-col gap-y-7"
                >
                  <li>
                    <ul
                      role="list"
                      className="-mx-2 space-y-1"
                    >
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            aria-current={
                              pathname === item.href ? 'page' : undefined
                            }
                            className={classNames(
                              pathname === item.href
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className="h-6 w-6 shrink-0"
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="flex items-center justify-between">
                      <span className="text-sm leading-6 font-semibold text-gray-400">
                        Workspaces
                      </span>
                      <CreateWorkspaceModal />
                    </div>

                    <WorkspaceSwitcherWrapper />
                  </li>

                  <li>
                    <div className="flex items-center justify-between">
                      <span className="text-sm leading-6 font-semibold text-gray-400">
                        Projects
                      </span>
                      <button>
                        <PlusCircleIcon className="h-5 w-5 flex-none text-gray-400" />
                      </button>
                    </div>

                    <ul
                      role="list"
                      className="-mx-2 mt-2 space-y-1"
                    >
                      {projects.map((project) => (
                        <li key={project.name}>
                          <Link
                            href={project.href}
                            aria-current={
                              pathname === project.href ? 'page' : undefined
                            }
                            className={classNames(
                              pathname === project.href
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                              {getFirstLetter(project.name)}
                            </span>
                            <span className="truncate">{project.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Logo />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul
              role="list"
              className="flex flex-1 flex-col gap-y-7"
            >
              <li>
                <ul
                  role="list"
                  className="-mx-2 space-y-1"
                >
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        aria-current={
                          pathname === item.href ? 'page' : undefined
                        }
                        className={classNames(
                          pathname === item.href
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <span className="text-sm leading-6 font-semibold text-gray-400">
                    Workspaces
                  </span>
                  <CreateWorkspaceModal />
                </div>

                <WorkspaceSwitcherWrapper />
              </li>

              <li>
                <div className="flex items-center justify-between">
                  <span className="text-sm leading-6 font-semibold text-gray-400">
                    Projects
                  </span>
                  <button>
                    <PlusCircleIcon className="h-5 w-5 flex-none text-gray-400" />
                  </button>
                </div>

                <ul
                  role="list"
                  className="-mx-2 mt-2 space-y-1"
                >
                  {projects.map((project) => (
                    <li key={project.name}>
                      <Link
                        href={project.href}
                        aria-current={
                          pathname === project.href ? 'page' : undefined
                        }
                        className={classNames(
                          pathname === project.href
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          {getFirstLetter(project.name)}
                        </span>
                        <span className="truncate">{project.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon
              aria-hidden="true"
              className="h-6 w-6"
            />
          </button>
          <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Profile dropdown */}
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
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
