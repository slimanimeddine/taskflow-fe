import { z as zod } from 'zod'

/**
 * Create a new member in a workspace.
 * @summary Create member
 */
export const createMemberBody = zod.object({
  invite_code: zod.string().regex(/^[a-zA-Z0-9]{10}$/, {
    message: 'Invalid code',
  }),
})
