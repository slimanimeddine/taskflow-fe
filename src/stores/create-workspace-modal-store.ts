import { create } from 'zustand'

type CreateWorkspaceModalStore = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useCreateWorkspaceModalStore = create<CreateWorkspaceModalStore>(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  })
)
