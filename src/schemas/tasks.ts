import { z as zod } from 'zod'

/**
 * Create a new task in a project within a workspace.
 * @summary Create task
 */
export const createTaskBody = zod.object({
  name: zod.string(),
  description: zod.string().optional(),
  due_date: zod.string().date(),
  status: zod.enum(['backlog', 'todo', 'in_progress', 'in_review', 'done']),
  workspace_id: zod.string().uuid(),
  project_id: zod.string().uuid(),
  assignee_id: zod.string().uuid(),
})
