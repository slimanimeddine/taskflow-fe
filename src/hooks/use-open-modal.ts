import { useQueryState, parseAsStringLiteral, createParser } from 'nuqs'
import { z } from 'zod'

const modals = [
  'create-project',
  'create-task',
  'create-workspace',
  'edit-task',
] as const

type Modal = (typeof modals)[number]

const uuidSchema = z.string().uuid()

const parseAsUuid = createParser({
  parse: (value: string) => {
    const result = uuidSchema.safeParse(value)
    if (!result.success) {
      throw new Error('Invalid UUID format')
    }
    return result.data
  },
  serialize: (value: string) => value,
})

export function useOpenModal() {
  const [modal, setModal] = useQueryState(
    'modal',
    parseAsStringLiteral<Modal>(modals)
  )

  const [taskId, setTaskId] = useQueryState('task-id', parseAsUuid)

  function openModal(modal: Modal, taskId?: string) {
    if (modal !== 'edit-task') {
      setModal(modal)
    } else {
      if (!taskId) {
        setModal(null)
      } else {
        setModal(modal)
        setTaskId(taskId)
      }
    }
  }

  function closeModal() {
    setModal(null)
    setTaskId(null)
  }

  return {
    modal,
    taskId,
    openModal,
    closeModal,
  }
}
