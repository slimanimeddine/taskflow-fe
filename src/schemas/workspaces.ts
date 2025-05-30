import { z as zod } from 'zod'

/**
 * Create a new workspace for the authenticated user.
 * @summary Create workspace
 */
export const createWorkspaceBody = zod.object({
  name: zod.string(),
  image: zod
    .instanceof(File)
    .refine((f) => f.size < 5000000, 'Image must not be greater than 5mb.')
    .refine(
      (file) =>
        [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/svg',
          'image/jpg',
        ].includes(file.type),
      'Only .jpg, .jpeg, .png, .svg and .webp formats are supported.'
    )
    .optional(),
})
