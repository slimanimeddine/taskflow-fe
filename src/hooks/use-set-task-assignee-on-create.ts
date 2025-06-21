import { parseAsUuid } from '@/lib/uuid-parser'
import { useQueryState } from 'nuqs'

export function useSetTaskAssigneeOnCreate() {
  const [taskAssignee, setTaskAssignee] = useQueryState(
    'taskAssignee',
    parseAsUuid
  )

  return {
    taskAssignee,
    setTaskAssignee,
  }
}
