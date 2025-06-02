import { useMutation } from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'

export type CreateMember200 = ApiResource<Member>
export type CreateMember400 = ErrorApiResponse
export type CreateMember401 = UnauthenticatedApiResponse
export type CreateMember404 = NotFoundApiResponse
export type CreateMemberBody = z.infer<typeof createMemberBody>

import { customInstance } from '@/lib/axios'
import type { ErrorType, BodyType } from '@/lib/axios'
import {
  ApiResource,
  ErrorApiResponse,
  NotFoundApiResponse,
  UnauthenticatedApiResponse,
} from '@/types/api-responses'
import { Member } from '@/types/models'
import { z } from 'zod'
import { createMemberBody } from '@/schemas/members'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Create a new member in a workspace.
 * @summary Create member
 */
export const createMember = (
  workspaceId: string,
  createMemberBody: BodyType<CreateMemberBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<CreateMember200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/members`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createMemberBody,
      signal,
    },
    options
  )
}

export const getCreateMemberMutationOptions = <
  TError = ErrorType<CreateMember400 | CreateMember401 | CreateMember404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createMember>>,
    TError,
    { workspaceId: string; data: BodyType<CreateMemberBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof createMember>>,
  TError,
  { workspaceId: string; data: BodyType<CreateMemberBody> },
  TContext
> => {
  const mutationKey = ['createMember']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createMember>>,
    { workspaceId: string; data: BodyType<CreateMemberBody> }
  > = (props) => {
    const { workspaceId, data } = props ?? {}

    return createMember(workspaceId, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateMemberMutationResult = NonNullable<
  Awaited<ReturnType<typeof createMember>>
>
export type CreateMemberMutationBody = BodyType<CreateMemberBody>
export type CreateMemberMutationError = ErrorType<
  CreateMember400 | CreateMember401 | CreateMember404
>

/**
 * @summary Create member
 */
export const useCreateMember = <
  TError = ErrorType<CreateMember400 | CreateMember401 | CreateMember404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof createMember>>,
      TError,
      { workspaceId: string; data: BodyType<CreateMemberBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof createMember>>,
  TError,
  { workspaceId: string; data: BodyType<CreateMemberBody> },
  TContext
> => {
  const mutationOptions = getCreateMemberMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
