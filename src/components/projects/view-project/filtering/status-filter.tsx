'use client'

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useTaskStatusFilter } from '@/hooks/filtering/use-task-status-filter'
import { statusLabel } from '@/lib/utils'

const statuses = [
  'done',
  'in_review',
  'in_progress',
  'backlog',
  'todo',
  'all',
] as const

export default function StatusFilter() {
  const { status, setStatus } = useTaskStatusFilter()

  const handleOnChange = (value: (typeof statuses)[number]) => {
    if (value === 'all') {
      setStatus(null)
    } else {
      setStatus(value)
    }
  }

  return (
    <Listbox
      value={status}
      onChange={handleOnChange}
    >
      <div className="relative mt-2">
        <Label className="block text-sm font-medium leading-6 text-gray-900">
          Status
        </Label>

        <ListboxButton className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 inline-flex">
          <span className="block truncate">{statusLabel(status)}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm min-w-max"
        >
          {statuses.map((status) => (
            <ListboxOption
              key={status}
              value={status}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {statusLabel(status)}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
