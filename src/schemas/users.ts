import { z as zod } from 'zod'

/**
 * Deletes the authenticated user
 * @summary Delete User
 */
export const deleteUserBody = zod.object({
  password: zod.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
})
