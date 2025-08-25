"use client";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useRemoveTask } from "@/hooks/use-remove-task";
import { useWorkspaceId } from "@/hooks/params/use-workspace-id";
import Link from "next/link";
import EditTaskModal from "./edit-task/modal";
import { useOpenModal } from "@/hooks/use-open-modal";

type RowDropdownProps = {
  taskId: string;
  projectId: string;
};

export default function RowDropdown({ taskId, projectId }: RowDropdownProps) {
  const { removeTask, isDisabled } = useRemoveTask(taskId);
  const workspaceId = useWorkspaceId();
  const { openModal } = useOpenModal();

  return (
    <>
      <EditTaskModal taskId={taskId} />
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex cursor-pointer items-center rounded-lg bg-gray-100 p-0.5 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="ring-opacity-5 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <Link
                href={`/workspaces/${workspaceId}/tasks/${taskId}`}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Task Details
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href={`/workspaces/${workspaceId}/projects/${projectId}`}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Project Details
              </Link>
            </MenuItem>

            <MenuItem>
              <button
                type="button"
                onClick={() => openModal("edit-task", taskId)}
                className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Edit Task
              </button>
            </MenuItem>

            <MenuItem>
              <button
                disabled={isDisabled}
                onClick={removeTask}
                className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Delete Task
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}
