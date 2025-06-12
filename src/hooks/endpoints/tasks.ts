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

export type CreateTask200 = ApiResource<Task>
export type CreateTask400 = ErrorApiResponse
export type CreateTask401 = UnauthenticatedApiResponse
export type CreateTask403 = UnauthorizedApiResponse
export type CreateTask404 = NotFoundApiResponse
export type CreateTaskBody = z.infer<typeof createTaskBody>

export type ListTasks200 = PaginatedApiResponse<Task>
export type ListTasks403 = UnauthorizedApiResponse
export type ListTasks401 = UnauthenticatedApiResponse
export type ListTasksParams = {
  'filter[name]'?: string
  'filter[due_date]'?: string
  'filter[position]'?: number
  'filter[status]'?: 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done'
  'filter[workspace]'?: string
  'filter[project]'?: string
  'filter[assignee]'?: string
  sort?:
    | 'name'
    | 'due_date'
    | 'status'
    | '-name'
    | '-due_date'
    | '-status'
    | 'project'
    | '-project'
    | 'assignee'
    | '-assignee'
}

import { customInstance } from '@/lib/axios'
import type { ErrorType, BodyType } from '@/lib/axios'
import {
  ApiResource,
  ErrorApiResponse,
  NotFoundApiResponse,
  PaginatedApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { Task } from '@/types/models'
import { z } from 'zod'
import { createTaskBody } from '@/schemas/tasks'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * List all tasks in a workspace, with optional filters for project, assignee, and status.
 * @summary List tasks
 */
export const listTasks = (
  params?: ListTasksParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListTasks200>(
    { url: `/api/v1/tasks`, method: 'GET', params, signal },
    options
  )
}

export const getListTasksQueryKey = (params?: ListTasksParams) => {
  return [`/api/v1/tasks`, ...(params ? [params] : [])] as const
}

export const getListTasksQueryOptions = <
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403>,
>(
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getListTasksQueryKey(params)

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listTasks>>> = ({
    signal,
  }) => listTasks(params, requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listTasks>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListTasksQueryResult = NonNullable<
  Awaited<ReturnType<typeof listTasks>>
>
export type ListTasksQueryError = ErrorType<ListTasks401 | ListTasks403>

export function useListTasks<
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403>,
>(
  params: undefined | ListTasksParams,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listTasks>>,
          TError,
          Awaited<ReturnType<typeof listTasks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListTasks<
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403>,
>(
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listTasks>>,
          TError,
          Awaited<ReturnType<typeof listTasks>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListTasks<
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403>,
>(
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
/**
 * @summary List tasks
 */

export function useListTasks<
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403>,
>(
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getListTasksQueryOptions(params, options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List tasks
 */
export const prefetchListTasks = async <
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403>,
>(
  queryClient: QueryClient,
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListTasksQueryOptions(params, options)

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Create a new task in a project within a workspace.
 * @summary Create task
 */
export const createTask = (
  createTaskBody: BodyType<CreateTaskBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<CreateTask200>(
    {
      url: `/api/v1/tasks`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createTaskBody,
      signal,
    },
    options
  )
}

export const getCreateTaskMutationOptions = <
  TError = ErrorType<
    CreateTask400 | CreateTask401 | CreateTask403 | CreateTask404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createTask>>,
    TError,
    { data: BodyType<CreateTaskBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof createTask>>,
  TError,
  { data: BodyType<CreateTaskBody> },
  TContext
> => {
  const mutationKey = ['createTask']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createTask>>,
    { data: BodyType<CreateTaskBody> }
  > = (props) => {
    const { data } = props ?? {}

    return createTask(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateTaskMutationResult = NonNullable<
  Awaited<ReturnType<typeof createTask>>
>
export type CreateTaskMutationBody = BodyType<CreateTaskBody>
export type CreateTaskMutationError = ErrorType<
  CreateTask400 | CreateTask401 | CreateTask403 | CreateTask404
>

/**
 * @summary Create task
 */
export const useCreateTask = <
  TError = ErrorType<
    CreateTask400 | CreateTask401 | CreateTask403 | CreateTask404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof createTask>>,
      TError,
      { data: BodyType<CreateTaskBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof createTask>>,
  TError,
  { data: BodyType<CreateTaskBody> },
  TContext
> => {
  const mutationOptions = getCreateTaskMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
