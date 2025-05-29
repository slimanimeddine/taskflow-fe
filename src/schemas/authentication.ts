import { z as zod } from 'zod'

/**
 * Register a new user
 * @summary Sign Up
 */
export const signUpBody = zod.object({
  name: zod.string().min(1, {
    message: 'Name is required',
  }),
  email: zod.string().email(),
  password: zod.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
})

/**
 * Sign in a user
 * @summary Sign In
 */
export const signInBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
})

/**
 * Changes the password of the authenticated user
 * @summary Change Password
 */
export const changePasswordBody = zod
  .object({
    current_password: zod.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    new_password: zod.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    new_password_confirmation: zod.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
  })
  .refine(
    (value) => {
      return value.new_password === value.new_password_confirmation
    },
    {
      message: 'Passwords does not match.',
      path: ['new_password_confirmation'],
    }
  )

/**
 * Sends a password reset link to the user's email
 * @summary Send Password Reset Link
 */
export const sendPasswordResetLinkBody = zod.object({
  email: zod.string().email(),
})

/**
 * Resets the password of the user
 * @summary Reset Password
 */
export const resetPasswordBody = zod
  .object({
    token: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    password_confirmation: zod.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
  })
  .refine(
    (value) => {
      return value.password === value.password_confirmation
    },
    {
      message: 'Passwords does not match.',
      path: ['password_confirmation'],
    }
  )
