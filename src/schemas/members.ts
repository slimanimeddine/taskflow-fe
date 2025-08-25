import { z } from "zod/v4";

/**
 * Create a new member in a workspace.
 * @summary Create member
 */
export const createMemberBody = z.object({
  invite_code: z.string().regex(/^[a-zA-Z0-9]{10}$/, {
    message: "Invalid code",
  }),
});
