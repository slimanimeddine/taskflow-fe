import { parseAsUuid } from '@/lib/uuid-parser'
import { useQueryState } from 'nuqs'

export function useSetTaskProjectOnCreate() {
  const [taskProject, setTaskProject] = useQueryState(
    'taskProject',
    parseAsUuid
  )

  return {
    taskProject,
    setTaskProject,
  }
}
