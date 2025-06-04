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

export type ListWorkspaceProjects200 = ApiResource<Project[]>
export type ListWorkspaceProjects403 = UnauthorizedApiResponse
export type ListWorkspaceProjects401 = UnauthenticatedApiResponse
export type ListWorkspaceProjects404 = NotFoundApiResponse

export type CreateProject200 = ApiResource<Project>
export type CreateProject403 = UnauthorizedApiResponse
export type CreateProject404 = NotFoundApiResponse
export type CreateProject401 = UnauthenticatedApiResponse
export type CreateProjectBody = z.infer<typeof createProjectBody>

import { customInstance } from '@/lib/axios'
import type { BodyType, ErrorType } from '@/lib/axios'
import {
  ApiResource,
  NotFoundApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from '@/types/api-responses'
import { Project } from '@/types/models'
import { z } from 'zod'
import { createProjectBody } from '@/schemas/projects'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * List all projects in a specific workspace that the authenticated user has access to.
 * @summary List workspace projects
 */
export const listWorkspaceProjects = (
  workspaceId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListWorkspaceProjects200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/projects`,
      method: 'GET',
      signal,
    },
    options
  )
}

export const getListWorkspaceProjectsQueryKey = (workspaceId: string) => {
  return [`/api/v1/workspaces/${workspaceId}/projects`] as const
}

export const getListWorkspaceProjectsQueryOptions = <
  TData = Awaited<ReturnType<typeof listWorkspaceProjects>>,
  TError = ErrorType<
    | ListWorkspaceProjects401
    | ListWorkspaceProjects403
    | ListWorkspaceProjects404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceProjects>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey =
    queryOptions?.queryKey ?? getListWorkspaceProjectsQueryKey(workspaceId)

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listWorkspaceProjects>>
  > = ({ signal }) => listWorkspaceProjects(workspaceId, requestOptions, signal)

  return {
    queryKey,
    queryFn,
    enabled: !!workspaceId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof listWorkspaceProjects>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListWorkspaceProjectsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listWorkspaceProjects>>
>
export type ListWorkspaceProjectsQueryError = ErrorType<
  ListWorkspaceProjects401 | ListWorkspaceProjects403 | ListWorkspaceProjects404
>

export function useListWorkspaceProjects<
  TData = Awaited<ReturnType<typeof listWorkspaceProjects>>,
  TError = ErrorType<
    | ListWorkspaceProjects401
    | ListWorkspaceProjects403
    | ListWorkspaceProjects404
  >,
>(
  workspaceId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceProjects>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listWorkspaceProjects>>,
          TError,
          Awaited<ReturnType<typeof listWorkspaceProjects>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListWorkspaceProjects<
  TData = Awaited<ReturnType<typeof listWorkspaceProjects>>,
  TError = ErrorType<
    | ListWorkspaceProjects401
    | ListWorkspaceProjects403
    | ListWorkspaceProjects404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceProjects>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listWorkspaceProjects>>,
          TError,
          Awaited<ReturnType<typeof listWorkspaceProjects>>
        >,
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
export function useListWorkspaceProjects<
  TData = Awaited<ReturnType<typeof listWorkspaceProjects>>,
  TError = ErrorType<
    | ListWorkspaceProjects401
    | ListWorkspaceProjects403
    | ListWorkspaceProjects404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceProjects>>,
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
 * @summary List workspace projects
 */

export function useListWorkspaceProjects<
  TData = Awaited<ReturnType<typeof listWorkspaceProjects>>,
  TError = ErrorType<
    | ListWorkspaceProjects401
    | ListWorkspaceProjects403
    | ListWorkspaceProjects404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceProjects>>,
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
  const queryOptions = getListWorkspaceProjectsQueryOptions(
    workspaceId,
    options
  )

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}

/**
 * @summary List workspace projects
 */
export const prefetchListWorkspaceProjects = async <
  TData = Awaited<ReturnType<typeof listWorkspaceProjects>>,
  TError = ErrorType<
    | ListWorkspaceProjects401
    | ListWorkspaceProjects403
    | ListWorkspaceProjects404
  >,
>(
  queryClient: QueryClient,
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceProjects>>,
        TError,
        TData
      >
    >
    request?: SecondParameter<typeof customInstance>
  }
): Promise<QueryClient> => {
  const queryOptions = getListWorkspaceProjectsQueryOptions(
    workspaceId,
    options
  )

  await queryClient.prefetchQuery(queryOptions)

  return queryClient
}

/**
 * Create a new project in a specific workspace for the authenticated user.
 * @summary Create project
 */
export const createProject = (
  workspaceId: string,
  createProjectBody: BodyType<CreateProjectBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  const formData = new FormData()
  formData.append('name', createProjectBody.name)
  if (
    createProjectBody.image !== undefined &&
    createProjectBody.image !== null
  ) {
    formData.append('image', createProjectBody.image)
  }

  return customInstance<CreateProject200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/projects`,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      signal,
    },
    options
  )
}

export const getCreateProjectMutationOptions = <
  TError = ErrorType<CreateProject401 | CreateProject403 | CreateProject404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createProject>>,
    TError,
    { workspaceId: string; data: BodyType<CreateProjectBody> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof createProject>>,
  TError,
  { workspaceId: string; data: BodyType<CreateProjectBody> },
  TContext
> => {
  const mutationKey = ['createProject']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createProject>>,
    { workspaceId: string; data: BodyType<CreateProjectBody> }
  > = (props) => {
    const { workspaceId, data } = props ?? {}

    return createProject(workspaceId, data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type CreateProjectMutationResult = NonNullable<
  Awaited<ReturnType<typeof createProject>>
>
export type CreateProjectMutationBody = BodyType<CreateProjectBody>
export type CreateProjectMutationError = ErrorType<
  CreateProject401 | CreateProject403 | CreateProject404
>

/**
 * @summary Create project
 */
export const useCreateProject = <
  TError = ErrorType<CreateProject401 | CreateProject403 | CreateProject404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof createProject>>,
      TError,
      { workspaceId: string; data: BodyType<CreateProjectBody> },
      TContext
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof createProject>>,
  TError,
  { workspaceId: string; data: BodyType<CreateProjectBody> },
  TContext
> => {
  const mutationOptions = getCreateProjectMutationOptions(options)

  return useMutation(mutationOptions, queryClient)
}
