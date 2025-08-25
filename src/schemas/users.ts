import { z } from "zod/v4";

/**
 * Deletes the authenticated user
 * @summary Delete User
 */
export const deleteUserBody = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
