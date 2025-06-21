import { parseAsUuid } from '@/lib/uuid-parser'
import { useQueryState, parseAsStringLiteral } from 'nuqs'

const modals = [
  'create-project',
  'create-task',
  'create-workspace',
  'edit-task',
] as const

type Modal = (typeof modals)[number]

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
