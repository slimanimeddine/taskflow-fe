import { useMutation, useQuery } from "@tanstack/react-query";
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
import { customInstance } from "@/lib/axios";
import type { ErrorType, BodyType } from "@/lib/axios";
import {
  type ApiResource,
  type ErrorApiResponse,
  type NotFoundApiResponse,
  type PaginatedApiResponse,
  type SuccessNoDataApiResponse,
  type UnauthenticatedApiResponse,
  type UnauthorizedApiResponse,
} from "@/types/api-responses";
import { type Task } from "@/types/models";
import { type z } from "zod/v4";
import {
  type bulkEditTasksPositionsBody,
  type createTaskBody,
  type editTaskBody,
} from "@/schemas/tasks";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type CreateTask200 = ApiResource<Task>;
export type CreateTask400 = ErrorApiResponse;
export type CreateTask401 = UnauthenticatedApiResponse;
export type CreateTask403 = UnauthorizedApiResponse;
export type CreateTask404 = NotFoundApiResponse;
export type CreateTaskBody = z.infer<typeof createTaskBody>;

export type ListTasks200 = PaginatedApiResponse<Task> | ApiResource<Task[]>;
export type ListTasks403 = UnauthorizedApiResponse;
export type ListTasks404 = NotFoundApiResponse;
export type ListTasks401 = UnauthenticatedApiResponse;
export type ListTasksParams = {
  "filter[name]"?: string;
  "filter[due_date]"?: string;
  "filter[position]"?: number;
  "filter[status]"?: "backlog" | "todo" | "in_progress" | "in_review" | "done";
  "filter[workspace]"?: string;
  "filter[project]"?: string;
  "filter[assignee]"?: string;
  sort?: (
    | "name"
    | "-name"
    | "due_date"
    | "-due_date"
    | "status"
    | "-status"
    | "project"
    | "-project"
    | "assignee"
    | "-assignee"
  )[];
  paginate: 1 | 0;
  page?: number;
};

export type DeleteTask200 = SuccessNoDataApiResponse;
export type DeleteTask403 = UnauthorizedApiResponse;
export type DeleteTask401 = UnauthenticatedApiResponse;
export type DeleteTask404 = NotFoundApiResponse;

export type EditTask200 = ApiResource<Task>;
export type EditTask403 = UnauthorizedApiResponse;
export type EditTask401 = UnauthenticatedApiResponse;
export type EditTask404 = NotFoundApiResponse;
export type EditTaskBody = z.infer<typeof editTaskBody>;

export type ShowTask200 = ApiResource<Task>;
export type ShowTask403 = UnauthorizedApiResponse;
export type ShowTask401 = UnauthenticatedApiResponse;
export type ShowTask404 = NotFoundApiResponse;

export type BulkEditTasksPositions200 = SuccessNoDataApiResponse;
export type BulkEditTasksPositions401 = UnauthenticatedApiResponse;
export type BulkEditTasksPositions400 = ErrorApiResponse;
export type BulkEditTasksPositionsBody = z.infer<
  typeof bulkEditTasksPositionsBody
>;

/**
 * List all tasks in a workspace, with optional filters for project, assignee, and status.
 * @summary List tasks
 */
export const listTasks = <
  T extends PaginatedApiResponse<Task> | ApiResource<Task[]>,
>(
  params?: ListTasksParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<T>(
    { url: `/api/v1/tasks`, method: "GET", params, signal },
    options,
  );
};

export const getListTasksQueryKey = (params?: ListTasksParams) => {
  return [`/api/v1/tasks`, ...(params ? [params] : [])] as const;
};

export const getListTasksQueryOptions = <
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403 | ListTasks404>,
>(
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getListTasksQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listTasks>>> = ({
    signal,
  }) => listTasks(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listTasks>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ListTasksQueryResult = NonNullable<
  Awaited<ReturnType<typeof listTasks>>
>;
export type ListTasksQueryError = ErrorType<
  ListTasks401 | ListTasks403 | ListTasks404
>;

export function useListTasks<
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403 | ListTasks404>,
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
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useListTasks<
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403 | ListTasks404>,
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
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useListTasks<
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403 | ListTasks404>,
>(
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary List tasks
 */

export function useListTasks<
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403 | ListTasks404>,
>(
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getListTasksQueryOptions(params, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary List tasks
 */
export const prefetchListTasks = async <
  TData = Awaited<ReturnType<typeof listTasks>>,
  TError = ErrorType<ListTasks401 | ListTasks403 | ListTasks404>,
>(
  queryClient: QueryClient,
  params?: ListTasksParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof listTasks>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getListTasksQueryOptions(params, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Create a new task in a project within a workspace.
 * @summary Create task
 */
export const createTask = (
  createTaskBody: BodyType<CreateTaskBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<CreateTask200>(
    {
      url: `/api/v1/tasks`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: createTaskBody,
      signal,
    },
    options,
  );
};

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
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof createTask>>,
  TError,
  { data: BodyType<CreateTaskBody> },
  TContext
> => {
  const mutationKey = ["createTask"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createTask>>,
    { data: BodyType<CreateTaskBody> }
  > = (props) => {
    const { data } = props ?? {};

    return createTask(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateTaskMutationResult = NonNullable<
  Awaited<ReturnType<typeof createTask>>
>;
export type CreateTaskMutationBody = BodyType<CreateTaskBody>;
export type CreateTaskMutationError = ErrorType<
  CreateTask400 | CreateTask401 | CreateTask403 | CreateTask404
>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof createTask>>,
  TError,
  { data: BodyType<CreateTaskBody> },
  TContext
> => {
  const mutationOptions = getCreateTaskMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Delete the specified task.
 * @summary Delete task
 */
export const deleteTask = (
  taskId: string,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<DeleteTask200>(
    { url: `/api/v1/tasks/${taskId}`, method: "DELETE" },
    options,
  );
};

export const getDeleteTaskMutationOptions = <
  TError = ErrorType<DeleteTask401 | DeleteTask403 | DeleteTask404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteTask>>,
    TError,
    { taskId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteTask>>,
  TError,
  { taskId: string },
  TContext
> => {
  const mutationKey = ["deleteTask"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteTask>>,
    { taskId: string }
  > = (props) => {
    const { taskId } = props ?? {};

    return deleteTask(taskId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteTaskMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteTask>>
>;

export type DeleteTaskMutationError = ErrorType<
  DeleteTask401 | DeleteTask403 | DeleteTask404
>;

/**
 * @summary Delete task
 */
export const useDeleteTask = <
  TError = ErrorType<DeleteTask401 | DeleteTask403 | DeleteTask404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteTask>>,
      TError,
      { taskId: string },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof deleteTask>>,
  TError,
  { taskId: string },
  TContext
> => {
  const mutationOptions = getDeleteTaskMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Edit the specified task.
 * @summary Edit task
 */
export const editTask = (
  taskId: string,
  editTaskBody?: BodyType<EditTaskBody>,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<EditTask200>(
    {
      url: `/api/v1/tasks/${taskId}`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: editTaskBody,
    },
    options,
  );
};

export const getEditTaskMutationOptions = <
  TError = ErrorType<EditTask401 | EditTask403 | EditTask404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof editTask>>,
    TError,
    { taskId: string; data: BodyType<EditTaskBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof editTask>>,
  TError,
  { taskId: string; data: BodyType<EditTaskBody> },
  TContext
> => {
  const mutationKey = ["editTask"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof editTask>>,
    { taskId: string; data: BodyType<EditTaskBody> }
  > = (props) => {
    const { taskId, data } = props ?? {};

    return editTask(taskId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type EditTaskMutationResult = NonNullable<
  Awaited<ReturnType<typeof editTask>>
>;
export type EditTaskMutationBody = BodyType<EditTaskBody>;
export type EditTaskMutationError = ErrorType<
  EditTask401 | EditTask403 | EditTask404
>;

/**
 * @summary Edit task
 */
export const useEditTask = <
  TError = ErrorType<EditTask401 | EditTask403 | EditTask404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof editTask>>,
      TError,
      { taskId: string; data: BodyType<EditTaskBody> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof editTask>>,
  TError,
  { taskId: string; data: BodyType<EditTaskBody> },
  TContext
> => {
  const mutationOptions = getEditTaskMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Show the specified task.
 * @summary Show task
 */
export const showTask = (
  taskId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ShowTask200>(
    { url: `/api/v1/tasks/${taskId}`, method: "GET", signal },
    options,
  );
};

export const getShowTaskQueryKey = (taskId: string) => {
  return [`/api/v1/tasks/${taskId}`] as const;
};

export const getShowTaskQueryOptions = <
  TData = Awaited<ReturnType<typeof showTask>>,
  TError = ErrorType<ShowTask401 | ShowTask403 | ShowTask404>,
>(
  taskId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showTask>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getShowTaskQueryKey(taskId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof showTask>>> = ({
    signal,
  }) => showTask(taskId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!taskId,
    ...queryOptions,
  } as UseQueryOptions<Awaited<ReturnType<typeof showTask>>, TError, TData> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };
};

export type ShowTaskQueryResult = NonNullable<
  Awaited<ReturnType<typeof showTask>>
>;
export type ShowTaskQueryError = ErrorType<
  ShowTask401 | ShowTask403 | ShowTask404
>;

export function useShowTask<
  TData = Awaited<ReturnType<typeof showTask>>,
  TError = ErrorType<ShowTask401 | ShowTask403 | ShowTask404>,
>(
  taskId: string,
  options: {
    query: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showTask>>, TError, TData>
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showTask>>,
          TError,
          Awaited<ReturnType<typeof showTask>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowTask<
  TData = Awaited<ReturnType<typeof showTask>>,
  TError = ErrorType<ShowTask401 | ShowTask403 | ShowTask404>,
>(
  taskId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showTask>>, TError, TData>
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showTask>>,
          TError,
          Awaited<ReturnType<typeof showTask>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowTask<
  TData = Awaited<ReturnType<typeof showTask>>,
  TError = ErrorType<ShowTask401 | ShowTask403 | ShowTask404>,
>(
  taskId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showTask>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
/**
 * @summary Show task
 */

export function useShowTask<
  TData = Awaited<ReturnType<typeof showTask>>,
  TError = ErrorType<ShowTask401 | ShowTask403 | ShowTask404>,
>(
  taskId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showTask>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getShowTaskQueryOptions(taskId, options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Show task
 */
export const prefetchShowTask = async <
  TData = Awaited<ReturnType<typeof showTask>>,
  TError = ErrorType<ShowTask401 | ShowTask403 | ShowTask404>,
>(
  queryClient: QueryClient,
  taskId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof showTask>>, TError, TData>
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getShowTaskQueryOptions(taskId, options);

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Bulk edit tasks positions in a workspace.
 * @summary Bulk edit tasks positions
 */
export const bulkEditTasksPositions = (
  bulkEditTasksPositionsBody: BodyType<BulkEditTasksPositionsBody>,
  options?: SecondParameter<typeof customInstance>,
) => {
  const data = new FormData();
  bulkEditTasksPositionsBody.tasks.forEach((value, index) => {
    data.append(`tasks[${index}][id]`, value.id);
    data.append(`tasks[${index}][position]`, `${value.position}`);
  });

  const reconstructedTasks: { id: string; position: string }[] = [];
  for (const [key, value] of data.entries()) {
    const match = /tasks\[(\d+)\]\[(id|position)\]/.exec(key);
    if (match) {
      const index = parseInt(match[1]);
      const property = match[2];

      if (!reconstructedTasks[index]) {
        reconstructedTasks[index] = {} as { id: string; position: string };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reconstructedTasks[index] as any)[property] = value;
    }
  }
  return customInstance<BulkEditTasksPositions200>(
    {
      url: `/api/v1/tasks`,
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      data: {
        tasks: reconstructedTasks,
      },
    },
    options,
  );
};

export const getBulkEditTasksPositionsMutationOptions = <
  TError = ErrorType<BulkEditTasksPositions400 | BulkEditTasksPositions401>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof bulkEditTasksPositions>>,
    TError,
    { data: BodyType<BulkEditTasksPositionsBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof bulkEditTasksPositions>>,
  TError,
  { data: BodyType<BulkEditTasksPositionsBody> },
  TContext
> => {
  const mutationKey = ["bulkEditTasksPositions"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof bulkEditTasksPositions>>,
    { data: BodyType<BulkEditTasksPositionsBody> }
  > = (props) => {
    const { data } = props ?? {};

    return bulkEditTasksPositions(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type BulkEditTasksPositionsMutationResult = NonNullable<
  Awaited<ReturnType<typeof bulkEditTasksPositions>>
>;
export type BulkEditTasksPositionsMutationBody =
  BodyType<BulkEditTasksPositionsBody>;
export type BulkEditTasksPositionsMutationError = ErrorType<
  BulkEditTasksPositions400 | BulkEditTasksPositions401
>;

/**
 * @summary Bulk edit tasks positions
 */
export const useBulkEditTasksPositions = <
  TError = ErrorType<BulkEditTasksPositions400 | BulkEditTasksPositions401>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof bulkEditTasksPositions>>,
      TError,
      { data: BodyType<BulkEditTasksPositionsBody> },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof bulkEditTasksPositions>>,
  TError,
  { data: BodyType<BulkEditTasksPositionsBody> },
  TContext
> => {
  const mutationOptions = getBulkEditTasksPositionsMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
