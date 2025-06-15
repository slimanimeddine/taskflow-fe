import { create } from 'zustand'

type EditTaskModalStore = {
  taskId: string | undefined
  setTaskId: (taskId: string | undefined) => void
}

export const useEditTaskModalStore = create<EditTaskModalStore>((set) => ({
  taskId: undefined,
  setTaskId: (taskId) => set({ taskId }),
}))
