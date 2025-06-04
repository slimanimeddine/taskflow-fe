import { create } from 'zustand'

type CreateProjectModalStore = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useCreateProjectModalStore = create<CreateProjectModalStore>(
  (set) => ({
    open: false,
    setOpen: (open) => set({ open }),
  })
)
