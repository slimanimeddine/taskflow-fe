import { z } from "zod/v4";

/**
 * Create a session cookie
 */
export const sessionCookieSchema = z.object({
  id: z.uuid(),
  token: z.string().regex(/^\d\|[A-Za-z0-9]{48}$/),
});

/**
 * Register a new user
 * @summary Sign Up
 */
export const signUpBody = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

/**
 * Sign in a user
 * @summary Sign In
 */
export const signInBody = z.object({
  email: z.email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

/**
 * Changes the password of the authenticated user
 * @summary Change Password
 */
export const changePasswordBody = z
  .object({
    current_password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    new_password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    new_password_confirmation: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  })
  .refine(
    (value) => {
      return value.new_password === value.new_password_confirmation;
    },
    {
      message: "Passwords does not match.",
      path: ["new_password_confirmation"],
    },
  );

/**
 * Sends a password reset link to the user's email
 * @summary Send Password Reset Link
 */
export const sendPasswordResetLinkBody = z.object({
  email: z.email(),
});

/**
 * Resets the password of the user
 * @summary Reset Password
 */
export const resetPasswordBody = z
  .object({
    token: z.string(),
    email: z.email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    password_confirmation: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  })
  .refine(
    (value) => {
      return value.password === value.password_confirmation;
    },
    {
      message: "Passwords does not match.",
      path: ["password_confirmation"],
    },
  );
