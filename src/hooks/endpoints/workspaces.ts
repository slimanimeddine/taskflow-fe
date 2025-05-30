import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

export type CreateWorkspace200 = ApiResource<WorkspaceModel>

export type CreateWorkspaceBody = z.infer<typeof createWorkspaceBody>

export type ListAuthenticatedUserWorkspaces200 = ApiResource<WorkspaceModel[]>

import { customInstance } from '@/lib/axios'
import type { ErrorType, BodyType } from '@/lib/axios'
import { ApiResource } from '@/types/api-responses'
import { WorkspaceModel } from '@/types/models/workspace'
import { z } from 'zod'
import { createWorkspaceBody } from '@/schemas/workspaces'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * List all workspaces for the authenticated user.
 * @summary List authenticated user workspaces
 */
export const listAuthenticatedUserWorkspaces = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListAuthenticatedUserWorkspaces200>(
    { url: `/api/v1/users/me/workspaces`, method: 'GET', signal },
    options
  )
}

export const getListAuthenticatedUserWorkspacesQueryKey = () => {
  return [`/api/v1/users/me/workspaces`] as const
}

export const getListAuthenticatedUserWorkspacesQueryOptions = <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
  TError = ErrorType<string>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
      TError,
      TData
    >
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListAuthenticatedUserWorkspacesQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>
  > = ({ signal }) => listAuthenticatedUserWorkspaces(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListAuthenticatedUserWorkspacesQueryResult = NonNullable<
  Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>
>
export type ListAuthenticatedUserWorkspacesQueryError = ErrorType<string>

export function useListAuthenticatedUserWorkspaces<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
  TError = ErrorType<string>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserWorkspaces<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
  TError = ErrorType<string>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
          TError,
          Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListAuthenticatedUserWorkspaces<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
  TError = ErrorType<string>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List authenticated user workspaces
 */

export function useListAuthenticatedUserWorkspaces<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
  TError = ErrorType<string>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListAuthenticatedUserWorkspacesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List authenticated user workspaces
 */
export const prefetchListAuthenticatedUserWorkspaces = async <
  TData = Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
  TError = ErrorType<string>,
>(
  queryClient: QueryClient,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListAuthenticatedUserWorkspacesQueryOptions(options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Create a new workspace for the authenticated user.
 * @summary Create workspace
 */
export const createWorkspace = (
  createWorkspaceBody: BodyType<CreateWorkspaceBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  const formData = new FormData()
  formData.append('name', createWorkspaceBody.name)
  if (
    createWorkspaceBody.image !== undefined &&
    createWorkspaceBody.image !== null
  ) {
    formData.append('image', createWorkspaceBody.image)
  }

  return customInstance<CreateWorkspace200>(
    {
      url: `/api/v1/workspaces`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options
  )
}

export const getCreateWorkspaceMutationOptions = <
  TError = ErrorType<string>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createWorkspace>>,
    TError,
    { data: BodyType<CreateWorkspaceBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof createWorkspace>>,
  TError,
  { data: BodyType<CreateWorkspaceBody> },
  TContext
> => {
  const mutationKey = ['createWorkspace']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createWorkspace>>,
    { data: BodyType<CreateWorkspaceBody> }
  > = (props) => {
    const { data } = props ?? {}

    return createWorkspace(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateWorkspaceMutationResult = NonNullable<
  Awaited<ReturnType<typeof createWorkspace>>
>
export type CreateWorkspaceMutationBody = BodyType<CreateWorkspaceBody>
export type CreateWorkspaceMutationError = ErrorType<string>

/**
 * @summary Create workspace
 */
export const useCreateWorkspace = <
  TError = ErrorType<string>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof createWorkspace>>,
      TError,
      { data: BodyType<CreateWorkspaceBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof createWorkspace>>,
  TError,
  { data: BodyType<CreateWorkspaceBody> },
  TContext
> => {
  const mutationOptions = getCreateWorkspaceMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
