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

export type CreateWorkspace200 = ApiResource<Workspace>
export type CreateWorkspace401 = UnauthenticatedApiResponse
export type CreateWorkspaceBody = z.infer<typeof createWorkspaceBody>

export type ListAuthenticatedUserWorkspaces200 = ApiResource<Workspace[]>
export type ListAuthenticatedUserWorkspaces401 = UnauthenticatedApiResponse

export type EditWorkspace200 = ApiResource<Workspace>
export type EditWorkspace403 = UnauthorizedApiResponse
export type EditWorkspace404 = NotFoundApiResponse
export type EditWorkspace401 = UnauthenticatedApiResponse
export type EditWorkspaceBody = z.infer<typeof editWorkspaceBody>

export type ShowWorkspace200 = ApiResource<Workspace>
export type ShowWorkspace403 = UnauthorizedApiResponse
export type ShowWorkspace404 = NotFoundApiResponse
export type ShowWorkspace401 = UnauthenticatedApiResponse

export type DeleteWorkspace200 = SuccessNoDataApiResponse
export type DeleteWorkspace403 = UnauthorizedApiResponse
export type DeleteWorkspace404 = NotFoundApiResponse
export type DeleteWorkspace401 = UnauthenticatedApiResponse

export type ResetWorkspaceInviteCode200 = ApiResource<Workspace>
export type ResetWorkspaceInviteCode403 = UnauthorizedApiResponse
export type ResetWorkspaceInviteCode404 = NotFoundApiResponse
export type ResetWorkspaceInviteCode401 = UnauthenticatedApiResponse

export type ViewWorkspaceStats200 = SuccessApiResponse<{
  total_projects: number
  total_tasks: number
  total_members: number
  completed_tasks: number
  overdue_tasks: number
}>
export type ViewWorkspaceStats401 = UnauthenticatedApiResponse
export type ViewWorkspaceStats403 = UnauthorizedApiResponse
export type ViewWorkspaceStats404 = NotFoundApiResponse

import { customInstance } from '@/lib/axios'
import type { ErrorType, BodyType } from '@/lib/axios'
import {
  ApiResource,
  NotFoundApiResponse,
  SuccessApiResponse,
  SuccessNoDataApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { Workspace } from '@/types/models'
import { z } from 'zod'
import { createWorkspaceBody, editWorkspaceBody } from '@/schemas/workspaces'

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
  TError = ErrorType<ListAuthenticatedUserWorkspaces401>,
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
export type ListAuthenticatedUserWorkspacesQueryError =
  ErrorType<ListAuthenticatedUserWorkspaces401>

export function useListAuthenticatedUserWorkspaces<
  TData = Awaited<ReturnType<typeof listAuthenticatedUserWorkspaces>>,
  TError = ErrorType<ListAuthenticatedUserWorkspaces401>,
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
  TError = ErrorType<ListAuthenticatedUserWorkspaces401>,
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
  TError = ErrorType<ListAuthenticatedUserWorkspaces401>,
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
  TError = ErrorType<ListAuthenticatedUserWorkspaces401>,
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
  TError = ErrorType<ListAuthenticatedUserWorkspaces401>,
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
  TError = ErrorType<CreateWorkspace401>,
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
export type CreateWorkspaceMutationError = ErrorType<CreateWorkspace401>

/**
 * @summary Create workspace
 */
export const useCreateWorkspace = <
  TError = ErrorType<CreateWorkspace401>,
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

/**
 * Edit the specified workspace.
 * @summary Edit workspace
 */
export const editWorkspace = (
  workspaceId: string,
  editWorkspaceBody?: BodyType<EditWorkspaceBody>,
  options?: SecondParameter<typeof customInstance>
) => {
  const formData = new FormData()
  if (editWorkspaceBody?.name !== undefined) {
    formData.append('name', editWorkspaceBody.name)
  }
  if (
    editWorkspaceBody?.image !== undefined &&
    editWorkspaceBody.image !== null
  ) {
    formData.append('image', editWorkspaceBody.image)
  }

  return customInstance<EditWorkspace200>(
    {
      url: `/api/v1/workspaces/${workspaceId}`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    },
    options
  )
}

export const getEditWorkspaceMutationOptions = <
  TError = ErrorType<EditWorkspace401 | EditWorkspace403 | EditWorkspace404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof editWorkspace>>,
    TError,
    { workspaceId: string; data: BodyType<EditWorkspaceBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof editWorkspace>>,
  TError,
  { workspaceId: string; data: BodyType<EditWorkspaceBody> },
  TContext
> => {
  const mutationKey = ['editWorkspace']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof editWorkspace>>,
    { workspaceId: string; data: BodyType<EditWorkspaceBody> }
  > = (props) => {
    const { workspaceId, data } = props ?? {}

    return editWorkspace(workspaceId, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type EditWorkspaceMutationResult = NonNullable<
  Awaited<ReturnType<typeof editWorkspace>>
>
export type EditWorkspaceMutationBody = BodyType<EditWorkspaceBody>
export type EditWorkspaceMutationError = ErrorType<
  EditWorkspace401 | EditWorkspace403 | EditWorkspace404
>

/**
 * @summary Edit workspace
 */
export const useEditWorkspace = <
  TError = ErrorType<EditWorkspace401 | EditWorkspace403 | EditWorkspace404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof editWorkspace>>,
      TError,
      { workspaceId: string; data: BodyType<EditWorkspaceBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof editWorkspace>>,
  TError,
  { workspaceId: string; data: BodyType<EditWorkspaceBody> },
  TContext
> => {
  const mutationOptions = getEditWorkspaceMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}

/**
 * Show the specified workspace.
 * @summary Show workspace
 */
export const showWorkspace = (
  workspaceId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ShowWorkspace200>(
    { url: `/api/v1/workspaces/${workspaceId}`, method: 'GET', signal },
    options
  )
}

export const getShowWorkspaceQueryKey = (workspaceId: string) => {
  return [`/api/v1/workspaces/${workspaceId}`] as const
}

export const getShowWorkspaceQueryOptions = <
  TData = Awaited<ReturnType<typeof showWorkspace>>,
  TError = ErrorType<ShowWorkspace401 | ShowWorkspace403 | ShowWorkspace404>,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showWorkspace>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getShowWorkspaceQueryKey(workspaceId)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof showWorkspace>>> = ({
    signal,
  }) => showWorkspace(workspaceId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!workspaceId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showWorkspace>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ShowWorkspaceQueryResult = NonNullable<
  Awaited<ReturnType<typeof showWorkspace>>
>
export type ShowWorkspaceQueryError = ErrorType<
  ShowWorkspace401 | ShowWorkspace403 | ShowWorkspace404
>

export function useShowWorkspace<
  TData = Awaited<ReturnType<typeof showWorkspace>>,
  TError = ErrorType<ShowWorkspace401 | ShowWorkspace403 | ShowWorkspace404>,
>(
  workspaceId: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showWorkspace>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showWorkspace>>,
          TError,
          Awaited<ReturnType<typeof showWorkspace>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowWorkspace<
  TData = Awaited<ReturnType<typeof showWorkspace>>,
  TError = ErrorType<ShowWorkspace401 | ShowWorkspace403 | ShowWorkspace404>,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showWorkspace>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showWorkspace>>,
          TError,
          Awaited<ReturnType<typeof showWorkspace>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useShowWorkspace<
  TData = Awaited<ReturnType<typeof showWorkspace>>,
  TError = ErrorType<ShowWorkspace401 | ShowWorkspace403 | ShowWorkspace404>,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showWorkspace>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary Show workspace
 */

export function useShowWorkspace<
  TData = Awaited<ReturnType<typeof showWorkspace>>,
  TError = ErrorType<ShowWorkspace401 | ShowWorkspace403 | ShowWorkspace404>,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showWorkspace>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getShowWorkspaceQueryOptions(workspaceId, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary Show workspace
 */
export const prefetchShowWorkspace = async <
  TData = Awaited<ReturnType<typeof showWorkspace>>,
  TError = ErrorType<ShowWorkspace401 | ShowWorkspace403 | ShowWorkspace404>,
>(
  queryClient: QueryClient,
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showWorkspace>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getShowWorkspaceQueryOptions(workspaceId, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Delete the specified workspace.
 * @summary Delete workspace
 */
export const deleteWorkspace = (
  workspaceId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DeleteWorkspace200>(
    { url: `/api/v1/workspaces/${workspaceId}`, method: 'DELETE' },
    options
  )
}

export const getDeleteWorkspaceMutationOptions = <
  TError = ErrorType<
    DeleteWorkspace401 | DeleteWorkspace403 | DeleteWorkspace404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteWorkspace>>,
    TError,
    { workspaceId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteWorkspace>>,
  TError,
  { workspaceId: string },
  TContext
> => {
  const mutationKey = ['deleteWorkspace']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteWorkspace>>,
    { workspaceId: string }
  > = (props) => {
    const { workspaceId } = props ?? {}

    return deleteWorkspace(workspaceId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type DeleteWorkspaceMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteWorkspace>>
>

export type DeleteWorkspaceMutationError = ErrorType<
  DeleteWorkspace401 | DeleteWorkspace403 | DeleteWorkspace404
>

/**
 * @summary Delete workspace
 */
export const useDeleteWorkspace = <
  TError = ErrorType<
    DeleteWorkspace401 | DeleteWorkspace403 | DeleteWorkspace404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteWorkspace>>,
      TError,
      { workspaceId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof deleteWorkspace>>,
  TError,
  { workspaceId: string },
  TContext
> => {
  const mutationOptions = getDeleteWorkspaceMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}

/**
 * Reset the invite code for the specified workspace.
 * @summary Reset workspace invite code
 */
export const resetWorkspaceInviteCode = (
  workspaceId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<ResetWorkspaceInviteCode200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/reset-invite-code`,
      method: 'PATCH',
    },
    options
  )
}

export const getResetWorkspaceInviteCodeMutationOptions = <
  TError = ErrorType<
    | ResetWorkspaceInviteCode401
    | ResetWorkspaceInviteCode403
    | ResetWorkspaceInviteCode404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof resetWorkspaceInviteCode>>,
    TError,
    { workspaceId: string },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof resetWorkspaceInviteCode>>,
  TError,
  { workspaceId: string },
  TContext
> => {
  const mutationKey = ['resetWorkspaceInviteCode']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof resetWorkspaceInviteCode>>,
    { workspaceId: string }
  > = (props) => {
    const { workspaceId } = props ?? {}

    return resetWorkspaceInviteCode(workspaceId, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type ResetWorkspaceInviteCodeMutationResult = NonNullable<
  Awaited<ReturnType<typeof resetWorkspaceInviteCode>>
>

export type ResetWorkspaceInviteCodeMutationError = ErrorType<
  | ResetWorkspaceInviteCode401
  | ResetWorkspaceInviteCode403
  | ResetWorkspaceInviteCode404
>

/**
 * @summary Reset workspace invite code
 */
export const useResetWorkspaceInviteCode = <
  TError = ErrorType<
    | ResetWorkspaceInviteCode401
    | ResetWorkspaceInviteCode403
    | ResetWorkspaceInviteCode404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof resetWorkspaceInviteCode>>,
      TError,
      { workspaceId: string },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof resetWorkspaceInviteCode>>,
  TError,
  { workspaceId: string },
  TContext
> => {
  const mutationOptions = getResetWorkspaceInviteCodeMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}

/**
 * View statistics for the specified workspace.
 * @summary View workspace stats
 */
export const viewWorkspaceStats = (
  workspaceId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ViewWorkspaceStats200>(
    { url: `/api/v1/workspaces/${workspaceId}/stats`, method: 'GET', signal },
    options
  )
}

export const getViewWorkspaceStatsQueryKey = (workspaceId: string) => {
  return [`/api/v1/workspaces/${workspaceId}/stats`] as const
}

export const getViewWorkspaceStatsQueryOptions = <
  TData = Awaited<ReturnType<typeof viewWorkspaceStats>>,
  TError = ErrorType<
    ViewWorkspaceStats401 | ViewWorkspaceStats403 | ViewWorkspaceStats404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewWorkspaceStats>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getViewWorkspaceStatsQueryKey(workspaceId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof viewWorkspaceStats>>
  > = ({ signal }) => viewWorkspaceStats(workspaceId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!workspaceId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof viewWorkspaceStats>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ViewWorkspaceStatsQueryResult = NonNullable<
  Awaited<ReturnType<typeof viewWorkspaceStats>>
>
export type ViewWorkspaceStatsQueryError = ErrorType<
  ViewWorkspaceStats401 | ViewWorkspaceStats403 | ViewWorkspaceStats404
>

export function useViewWorkspaceStats<
  TData = Awaited<ReturnType<typeof viewWorkspaceStats>>,
  TError = ErrorType<
    ViewWorkspaceStats401 | ViewWorkspaceStats403 | ViewWorkspaceStats404
  >,
>(
  workspaceId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewWorkspaceStats>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof viewWorkspaceStats>>,
          TError,
          Awaited<ReturnType<typeof viewWorkspaceStats>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useViewWorkspaceStats<
  TData = Awaited<ReturnType<typeof viewWorkspaceStats>>,
  TError = ErrorType<
    ViewWorkspaceStats401 | ViewWorkspaceStats403 | ViewWorkspaceStats404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewWorkspaceStats>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof viewWorkspaceStats>>,
          TError,
          Awaited<ReturnType<typeof viewWorkspaceStats>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useViewWorkspaceStats<
  TData = Awaited<ReturnType<typeof viewWorkspaceStats>>,
  TError = ErrorType<
    ViewWorkspaceStats401 | ViewWorkspaceStats403 | ViewWorkspaceStats404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewWorkspaceStats>>,
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
 * @summary View workspace stats
 */

export function useViewWorkspaceStats<
  TData = Awaited<ReturnType<typeof viewWorkspaceStats>>,
  TError = ErrorType<
    ViewWorkspaceStats401 | ViewWorkspaceStats403 | ViewWorkspaceStats404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewWorkspaceStats>>,
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
  const queryOptions = getViewWorkspaceStatsQueryOptions(workspaceId, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary View workspace stats
 */
export const prefetchViewWorkspaceStats = async <
  TData = Awaited<ReturnType<typeof viewWorkspaceStats>>,
  TError = ErrorType<
    ViewWorkspaceStats401 | ViewWorkspaceStats403 | ViewWorkspaceStats404
  >,
>(
  queryClient: QueryClient,
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewWorkspaceStats>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getViewWorkspaceStatsQueryOptions(workspaceId, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}
