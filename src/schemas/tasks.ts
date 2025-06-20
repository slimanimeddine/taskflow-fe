import { z as zod } from 'zod'

/**
 * Create a new task in a project within a workspace.
 * @summary Create task
 */
export const createTaskBody = zod.object({
  name: zod.string(),
  description: zod.string().nullable(),
  due_date: zod.string().date().nullable(),
  status: zod.enum(['backlog', 'todo', 'in_progress', 'in_review', 'done']),
  workspace_id: zod.string().uuid(),
  project_id: zod.string().uuid(),
  assignee_id: zod.string().uuid(),
})

/**
 * Edit the specified task.
 * @summary Edit task
 */
export const editTaskBody = zod.object({
  name: zod.string().optional(),
  description: zod.string().nullable().optional(),
  due_date: zod.string().date().nullable().optional(),
  position: zod.number().int().min(1).optional(),
  status: zod
    .enum(['backlog', 'todo', 'in_progress', 'in_review', 'done'])
    .optional(),
  project_id: zod.string().uuid().optional(),
  assignee_id: zod.string().uuid().optional(),
})

/**
 * Bulk edit tasks positions in a workspace.
 * @summary Bulk edit tasks positions
 */
export const bulkEditTasksPositionsBody = zod.object({
  tasks: zod
    .object({
      id: zod.string().uuid(),
      position: zod.number().int().min(1),
    })
    .array(),
})
