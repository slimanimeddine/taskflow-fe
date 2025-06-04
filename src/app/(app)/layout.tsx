'use client'
import Logo from '@/components/logo'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'
import WorkspaceSwitcherWrapper from '@/components/workspaces/workspace-switcher/wrapper'
import CreateWorkspaceModal from '@/components/workspaces/create-workspace/modal'
import UserDropdown from '@/components/user-dropdown'
import ListProjects from '@/components/projects/list-projects'
import LayoutNavigation from '@/components/layout-navigation'
import CreateProjectModal from '@/components/projects/create-project/modal'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
                <Link href="/">
                  <Logo />
                </Link>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul
                  role="list"
                  className="flex flex-1 flex-col gap-y-7"
                >
                  <li>
                    <LayoutNavigation />
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
                      <CreateProjectModal />
                    </div>

                    <ListProjects />
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
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul
              role="list"
              className="flex flex-1 flex-col gap-y-7"
            >
              <li>
                <LayoutNavigation />
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
                  <CreateProjectModal />
                </div>

                <ListProjects />
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
              <UserDropdown />
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
