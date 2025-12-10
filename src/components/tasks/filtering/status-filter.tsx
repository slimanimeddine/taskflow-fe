"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useTaskStatusFilter } from "@/hooks/filtering/use-task-status-filter";
import { statusLabel } from "@/lib/utils";

const statuses = [
  "done",
  "in_review",
  "in_progress",
  "backlog",
  "todo",
  "all",
] as const;

export default function StatusFilter() {
  const { status, setStatus } = useTaskStatusFilter();

  const handleOnChange = (value: (typeof statuses)[number]) => {
    if (value === "all") {
      void setStatus(null);
    } else {
      void setStatus(value);
    }
  };

  return (
    <Listbox value={status} onChange={handleOnChange}>
      <div className="relative mt-2">
        <Label className="block text-sm leading-6 font-medium text-gray-900">
          Status
        </Label>

        <ListboxButton className="relative inline-flex cursor-default rounded-md bg-white py-1.5 pr-10 pl-3 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6">
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
          className="ring-opacity-5 absolute z-10 mt-1 max-h-60 min-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {statuses.map((status) => (
            <ListboxOption
              key={status}
              value={status}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
            >
              <span className="block truncate font-normal group-data-selected:font-semibold">
                {statusLabel(status)}
              </span>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-focus:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
