import { z } from "zod/v4";

/**
 * Create a new task in a project within a workspace.
 * @summary Create task
 */
export const createTaskBody = z.object({
  name: z.string(),
  description: z.string().nullable(),
  due_date: z.date(),
  status: z.enum(["backlog", "todo", "in_progress", "in_review", "done"]),
  workspace_id: z.uuid(),
  project_id: z.uuid(),
  assignee_id: z.uuid(),
});

/**
 * Edit the specified task.
 * @summary Edit task
 */
export const editTaskBody = z.object({
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  due_date: z.date().optional(),
  position: z.number().int().min(1).optional(),
  status: z
    .enum(["backlog", "todo", "in_progress", "in_review", "done"])
    .optional(),
  project_id: z.uuid().optional(),
  assignee_id: z.uuid().optional(),
});

/**
 * Bulk edit tasks positions in a workspace.
 * @summary Bulk edit tasks positions
 */
export const bulkEditTasksPositionsBody = z.object({
  tasks: z
    .object({
      id: z.uuid(),
      position: z.number().int().min(1),
    })
    .array(),
});
