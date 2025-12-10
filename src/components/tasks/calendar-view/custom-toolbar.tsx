"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

type CustomToolbarProps = {
  date: Date | string;
  onNavigate: (action: "prev" | "next" | "today") => void;
  onViewChange: (view: "month" | "week" | "day") => void;
  view: "month" | "week" | "day";
};

const ViewLabel: Record<"month" | "week" | "day", string> = {
  month: "Month View",
  week: "Week View",
  day: "Day View",
};

export default function CustomToolbar({
  date,
  onNavigate,
  onViewChange,
  view,
}: CustomToolbarProps) {
  const formattedDate = format(date, "MMMM yyyy");

  return (
    <div className="mb-4 flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-white px-2 py-4">
      {/* Left Navigation Buttons */}
      <div className="flex items-center gap-x-2">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            onClick={() => onNavigate("prev")}
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate("today")}
            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            onClick={() => onNavigate("next")}
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <Menu as="div" className="relative hidden md:block">
          <MenuButton
            type="button"
            className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          >
            {ViewLabel[view]}
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </MenuButton>

          <MenuItems
            transition
            className="ring-opacity-5 absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <button
                  type="button"
                  onClick={() => onViewChange("day")}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
                >
                  Day view
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  onClick={() => onViewChange("week")}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
                >
                  Week view
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  onClick={() => onViewChange("month")}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
                >
                  Month view
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
        <Menu as="div" className="relative ml-6 md:hidden">
          <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </MenuButton>

          <MenuItems
            transition
            className="ring-opacity-5 absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <button
                  type="button"
                  onClick={() => onViewChange("day")}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
                >
                  Day view
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  onClick={() => onViewChange("week")}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
                >
                  Week view
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  onClick={() => onViewChange("month")}
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900"
                >
                  Month view
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <div className="grow text-center">
        <h2 className="text-xl font-semibold text-gray-800">{formattedDate}</h2>
      </div>
      <div className="w-[180px]"></div>{" "}
    </div>
  );
}
