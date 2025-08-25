"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import CreateProjectForm from "./form";
import { useOpenModal } from "@/hooks/use-open-modal";

export default function CreateProjectModal() {
  const { modal, openModal, closeModal } = useOpenModal();

  return (
    <>
      <button onClick={() => openModal("create-project")}>
        <PlusCircleIcon className="h-5 w-5 flex-none text-gray-400" />
      </button>

      <Dialog
        open={modal === "create-project"}
        onClose={closeModal}
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
              className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 py-4">
                <CreateProjectForm />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
