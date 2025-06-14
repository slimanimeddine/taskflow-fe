import { useQueryState } from 'nuqs'
import { parseAsJson } from 'nuqs'
import { z } from 'zod'

const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export function useTaskProjectFilter() {
  const [project, setProject] = useQueryState(
    'project',
    parseAsJson(projectSchema.parse)
  )

  return {
    project,
    setProject,
  }
}
