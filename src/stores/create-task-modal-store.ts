import { create } from 'zustand'

type CreateTaskModalStore = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useCreateTaskModalStore = create<CreateTaskModalStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))
