'use client'

import { fileUrl, getFirstLetter } from '@/lib/utils'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Workspace } from '@/types/models'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useWorkspaceId } from '@/hooks/params/use-workspace-id'

type WorkspaceSwitcherProps = {
  workspaces: Workspace[]
}

export default function WorkspaceSwitcher({
  workspaces,
}: WorkspaceSwitcherProps) {
  const workspaceId = useWorkspaceId()
  const [selected, setSelected] = useState(
    workspaces.find((w) => w.id === workspaceId) || workspaces[0]
  )
  const router = useRouter()
  function onSelect(workspace: Workspace) {
    setSelected(workspace)
    router.push(`/workspaces/${workspace.id}`)
  }

  return (
    <Listbox
      value={selected}
      onChange={onSelect}
    >
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-gray-800 py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            {selected.image_path ? (
              <Image
                alt=""
                src={fileUrl(selected.image_path)!}
                overrideSrc={fileUrl(selected.image_path)!}
                className="size-5 shrink-0 rounded-full"
                width={20}
                height={20}
              />
            ) : (
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-500">
                <span className="text-xs leading-none font-medium text-white">
                  {getFirstLetter(selected.name)}
                </span>
              </span>
            )}

            <span className="block truncate text-gray-400">
              {selected.name}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {workspaces.map((workspace) => (
            <ListboxOption
              key={workspace.id}
              value={workspace}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-400 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                {workspace.image_path ? (
                  <Image
                    alt=""
                    src={fileUrl(workspace.image_path)!}
                    overrideSrc={fileUrl(workspace.image_path)!}
                    className="size-5 shrink-0 rounded-full"
                    width={20}
                    height={20}
                  />
                ) : (
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-500">
                    <span className="text-xs leading-none font-medium text-white">
                      {getFirstLetter(workspace.name)}
                    </span>
                  </span>
                )}

                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {workspace.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon
                  aria-hidden="true"
                  className="size-5"
                />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
