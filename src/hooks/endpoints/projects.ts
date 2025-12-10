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
} from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { z } from "zod/v4";
import type { BodyType, ErrorType } from "@/lib/axios";
import { customInstance } from "@/lib/axios";
import type { createProjectBody, editProjectBody } from "@/schemas/projects";
import type {
  ApiResource,
  NotFoundApiResponse,
  SuccessApiResponse,
  SuccessNoDataApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from "@/types/api-responses";
import type { Project } from "@/types/models";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type ListWorkspaceProjects200 = ApiResource<Project[]>;
export type ListWorkspaceProjects403 = UnauthorizedApiResponse;
export type ListWorkspaceProjects401 = UnauthenticatedApiResponse;
export type ListWorkspaceProjects404 = NotFoundApiResponse;

export type CreateProject200 = ApiResource<Project>;
export type CreateProject403 = UnauthorizedApiResponse;
export type CreateProject404 = NotFoundApiResponse;
export type CreateProject401 = UnauthenticatedApiResponse;
export type CreateProjectBody = z.infer<typeof createProjectBody>;

export type ShowProject200 = ApiResource<Project>;
export type ShowProject403 = UnauthorizedApiResponse;
export type ShowProject401 = UnauthenticatedApiResponse;
export type ShowProject404 = NotFoundApiResponse;

export type EditProject200 = ApiResource<Project>;
export type EditProject403 = UnauthorizedApiResponse;
export type EditProject404 = NotFoundApiResponse;
export type EditProject401 = UnauthenticatedApiResponse;
export type EditProjectBody = z.infer<typeof editProjectBody>;

export type DeleteProject200 = SuccessNoDataApiResponse;
export type DeleteProject403 = UnauthorizedApiResponse;
export type DeleteProject401 = UnauthenticatedApiResponse;
export type DeleteProject404 = NotFoundApiResponse;

export type ViewProjectStats200 = SuccessApiResponse<{
  total_tasks: number;
  incomplete_tasks: number;
  completed_tasks: number;
  overdue_tasks: number;
}>;
export type ViewProjectStats401 = UnauthenticatedApiResponse;
export type ViewProjectStats403 = UnauthorizedApiResponse;
export type ViewProjectStats404 = NotFoundApiResponse;

/**
 * List all projects in a specific workspace that the authenticated user has access to.
 * @summary List workspace projects
 */
export const listWorkspaceProjects = (
  workspaceId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ListWorkspaceProjects200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/projects`,
      method: "GET",
      signal,
    },
    options,
  );
};

export const getListWorkspaceProjectsQueryKey = (workspaceId: string) => {
  return [`/api/v1/workspaces/${workspaceId}/projects`] as const;
};

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getListWorkspaceProjectsQueryKey(workspaceId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listWorkspaceProjects>>
  > = ({ signal }) =>
    listWorkspaceProjects(workspaceId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!workspaceId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof listWorkspaceProjects>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ListWorkspaceProjectsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listWorkspaceProjects>>
>;
export type ListWorkspaceProjectsQueryError = ErrorType<
  ListWorkspaceProjects401 | ListWorkspaceProjects403 | ListWorkspaceProjects404
>;

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
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
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
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getListWorkspaceProjectsQueryOptions(
    workspaceId,
    options,
  );

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getListWorkspaceProjectsQueryOptions(
    workspaceId,
    options,
  );

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Create a new project in a specific workspace for the authenticated user.
 * @summary Create project
 */
export const createProject = (
  workspaceId: string,
  createProjectBody: BodyType<CreateProjectBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  formData.append("name", createProjectBody.name);
  if (
    createProjectBody.image !== undefined &&
    createProjectBody.image !== null
  ) {
    formData.append("image", createProjectBody.image);
  }

  return customInstance<CreateProject200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/projects`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      signal,
    },
    options,
  );
};

export const getCreateProjectMutationOptions = <
  TError = ErrorType<CreateProject401 | CreateProject403 | CreateProject404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createProject>>,
    TError,
    { workspaceId: string; data: BodyType<CreateProjectBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof createProject>>,
  TError,
  { workspaceId: string; data: BodyType<CreateProjectBody> },
  TContext
> => {
  const mutationKey = ["createProject"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createProject>>,
    { workspaceId: string; data: BodyType<CreateProjectBody> }
  > = (props) => {
    const { workspaceId, data } = props ?? {};

    return createProject(workspaceId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateProjectMutationResult = NonNullable<
  Awaited<ReturnType<typeof createProject>>
>;
export type CreateProjectMutationBody = BodyType<CreateProjectBody>;
export type CreateProjectMutationError = ErrorType<
  CreateProject401 | CreateProject403 | CreateProject404
>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof createProject>>,
  TError,
  { workspaceId: string; data: BodyType<CreateProjectBody> },
  TContext
> => {
  const mutationOptions = getCreateProjectMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Show the specified project.
 * @summary Show project
 */
export const showProject = (
  projectId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ShowProject200>(
    { url: `/api/v1/projects/${projectId}`, method: "GET", signal },
    options,
  );
};

export const getShowProjectQueryKey = (projectId: string) => {
  return [`/api/v1/projects/${projectId}`] as const;
};

export const getShowProjectQueryOptions = <
  TData = Awaited<ReturnType<typeof showProject>>,
  TError = ErrorType<ShowProject401 | ShowProject403 | ShowProject404>,
>(
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showProject>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getShowProjectQueryKey(projectId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof showProject>>> = ({
    signal,
  }) => showProject(projectId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!projectId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showProject>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ShowProjectQueryResult = NonNullable<
  Awaited<ReturnType<typeof showProject>>
>;
export type ShowProjectQueryError = ErrorType<
  ShowProject401 | ShowProject403 | ShowProject404
>;

export function useShowProject<
  TData = Awaited<ReturnType<typeof showProject>>,
  TError = ErrorType<ShowProject401 | ShowProject403 | ShowProject404>,
>(
  projectId: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showProject>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showProject>>,
          TError,
          Awaited<ReturnType<typeof showProject>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowProject<
  TData = Awaited<ReturnType<typeof showProject>>,
  TError = ErrorType<ShowProject401 | ShowProject403 | ShowProject404>,
>(
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showProject>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showProject>>,
          TError,
          Awaited<ReturnType<typeof showProject>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowProject<
  TData = Awaited<ReturnType<typeof showProject>>,
  TError = ErrorType<ShowProject401 | ShowProject403 | ShowProject404>,
>(
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showProject>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Show project
 */

export function useShowProject<
  TData = Awaited<ReturnType<typeof showProject>>,
  TError = ErrorType<ShowProject401 | ShowProject403 | ShowProject404>,
>(
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showProject>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getShowProjectQueryOptions(projectId, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Show project
 */
export const prefetchShowProject = async <
  TData = Awaited<ReturnType<typeof showProject>>,
  TError = ErrorType<ShowProject401 | ShowProject403 | ShowProject404>,
>(
  queryClient: QueryClient,
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showProject>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getShowProjectQueryOptions(projectId, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Edit the specified project.
 * @summary Edit project
 */
export const editProject = (
  projectId: string,
  editProjectBody?: BodyType<EditProjectBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  if (editProjectBody?.name !== undefined) {
    formData.append("name", editProjectBody.name);
  }
  if (editProjectBody?.image !== undefined && editProjectBody.image !== null) {
    formData.append("image", editProjectBody.image);
  }

  return customInstance<EditProject200>(
    {
      url: `/api/v1/projects/${projectId}`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
      signal,
    },
    options,
  );
};

export const getEditProjectMutationOptions = <
  TError = ErrorType<EditProject401 | EditProject403 | EditProject404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof editProject>>,
    TError,
    { projectId: string; data: BodyType<EditProjectBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof editProject>>,
  TError,
  { projectId: string; data: BodyType<EditProjectBody> },
  TContext
> => {
  const mutationKey = ["editProject"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof editProject>>,
    { projectId: string; data: BodyType<EditProjectBody> }
  > = (props) => {
    const { projectId, data } = props ?? {};

    return editProject(projectId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type EditProjectMutationResult = NonNullable<
  Awaited<ReturnType<typeof editProject>>
>;
export type EditProjectMutationBody = BodyType<EditProjectBody>;
export type EditProjectMutationError = ErrorType<
  EditProject401 | EditProject403 | EditProject404
>;

/**
 * @summary Edit project
 */
export const useEditProject = <
  TError = ErrorType<EditProject401 | EditProject403 | EditProject404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof editProject>>,
      TError,
      { projectId: string; data: BodyType<EditProjectBody> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof editProject>>,
  TError,
  { projectId: string; data: BodyType<EditProjectBody> },
  TContext
> => {
  const mutationOptions = getEditProjectMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Delete the specified project.
 * @summary Delete project
 */
export const deleteProject = (
  projectId: string,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<DeleteProject200>(
    { url: `/api/v1/projects/${projectId}`, method: "DELETE" },
    options,
  );
};

export const getDeleteProjectMutationOptions = <
  TError = ErrorType<DeleteProject401 | DeleteProject403 | DeleteProject404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteProject>>,
    TError,
    { projectId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteProject>>,
  TError,
  { projectId: string },
  TContext
> => {
  const mutationKey = ["deleteProject"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteProject>>,
    { projectId: string }
  > = (props) => {
    const { projectId } = props ?? {};

    return deleteProject(projectId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteProjectMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteProject>>
>;

export type DeleteProjectMutationError = ErrorType<
  DeleteProject401 | DeleteProject403 | DeleteProject404
>;

/**
 * @summary Delete project
 */
export const useDeleteProject = <
  TError = ErrorType<DeleteProject401 | DeleteProject403 | DeleteProject404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteProject>>,
      TError,
      { projectId: string },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof deleteProject>>,
  TError,
  { projectId: string },
  TContext
> => {
  const mutationOptions = getDeleteProjectMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * View statistics for the specified project.
 * @summary View project stats
 */
export const viewProjectStats = (
  projectId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ViewProjectStats200>(
    { url: `/api/v1/projects/${projectId}/stats`, method: "GET", signal },
    options,
  );
};

export const getViewProjectStatsQueryKey = (projectId: string) => {
  return [`/api/v1/projects/${projectId}/stats`] as const;
};

export const getViewProjectStatsQueryOptions = <
  TData = Awaited<ReturnType<typeof viewProjectStats>>,
  TError = ErrorType<
    ViewProjectStats401 | ViewProjectStats403 | ViewProjectStats404
  >,
>(
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewProjectStats>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getViewProjectStatsQueryKey(projectId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof viewProjectStats>>
  > = ({ signal }) => viewProjectStats(projectId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!projectId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof viewProjectStats>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ViewProjectStatsQueryResult = NonNullable<
  Awaited<ReturnType<typeof viewProjectStats>>
>;
export type ViewProjectStatsQueryError = ErrorType<
  ViewProjectStats401 | ViewProjectStats403 | ViewProjectStats404
>;

export function useViewProjectStats<
  TData = Awaited<ReturnType<typeof viewProjectStats>>,
  TError = ErrorType<
    ViewProjectStats401 | ViewProjectStats403 | ViewProjectStats404
  >,
>(
  projectId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewProjectStats>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof viewProjectStats>>,
          TError,
          Awaited<ReturnType<typeof viewProjectStats>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useViewProjectStats<
  TData = Awaited<ReturnType<typeof viewProjectStats>>,
  TError = ErrorType<
    ViewProjectStats401 | ViewProjectStats403 | ViewProjectStats404
  >,
>(
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewProjectStats>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof viewProjectStats>>,
          TError,
          Awaited<ReturnType<typeof viewProjectStats>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useViewProjectStats<
  TData = Awaited<ReturnType<typeof viewProjectStats>>,
  TError = ErrorType<
    ViewProjectStats401 | ViewProjectStats403 | ViewProjectStats404
  >,
>(
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewProjectStats>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary View project stats
 */

export function useViewProjectStats<
  TData = Awaited<ReturnType<typeof viewProjectStats>>,
  TError = ErrorType<
    ViewProjectStats401 | ViewProjectStats403 | ViewProjectStats404
  >,
>(
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewProjectStats>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getViewProjectStatsQueryOptions(projectId, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary View project stats
 */
export const prefetchViewProjectStats = async <
  TData = Awaited<ReturnType<typeof viewProjectStats>>,
  TError = ErrorType<
    ViewProjectStats401 | ViewProjectStats403 | ViewProjectStats404
  >,
>(
  queryClient: QueryClient,
  projectId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof viewProjectStats>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getViewProjectStatsQueryOptions(projectId, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};
