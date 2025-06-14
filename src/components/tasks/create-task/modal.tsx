'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useCreateTaskModalStore } from '@/stores/create-task-modal-store'
import { PlusIcon } from '@heroicons/react/24/outline'
import CreateTaskForm from './form'

export default function CreateTaskModal() {
  const { open, setOpen } = useCreateTaskModalStore((state) => state)
  return (
    <>
      <button
        type="button"
        className="flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setOpen(true)}
      >
        <PlusIcon
          className="-ml-1.5 h-5 w-5"
          aria-hidden="true"
        />
        New Task
      </button>

      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 py-4">
                <CreateTaskForm />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
