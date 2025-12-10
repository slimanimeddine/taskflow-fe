import { z } from "zod/v4";
import { MAX_IMAGE_SIZE } from "@/lib/constants";

/**
 * Create a new workspace for the authenticated user.
 * @summary Create workspace
 */
export const createWorkspaceBody = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character.")
    .max(50, "Name must not be greater than 50 characters."),
  image: z
    .instanceof(File)
    .refine(
      (f) => f.size < MAX_IMAGE_SIZE,
      "Image must not be greater than 5mb.",
    )
    .refine(
      (file) =>
        [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/svg",
          "image/jpg",
        ].includes(file.type),
      "Only .jpg, .jpeg, .png, .svg and .webp formats are supported.",
    )
    .optional(),
});

/**
 * Edit the specified workspace.
 * @summary Edit workspace
 */
export const editWorkspaceBody = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character.")
    .max(50, "Name must not be greater than 50 characters.")
    .optional(),
  image: z
    .instanceof(File)
    .refine(
      (f) => f.size < MAX_IMAGE_SIZE,
      "Image must not be greater than 5mb.",
    )
    .refine(
      (file) =>
        [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/svg",
          "image/jpg",
        ].includes(file.type),
      "Only .jpg, .jpeg, .png, .svg and .webp formats are supported.",
    )
    .optional(),
});
