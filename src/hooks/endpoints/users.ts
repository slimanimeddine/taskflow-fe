import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { ErrorType } from "@/lib/axios";
import { customInstance } from "@/lib/axios";
import type {
  ApiResource,
  NotFoundApiResponse,
  UnauthenticatedApiResponse,
  UnauthorizedApiResponse,
} from "@/types/api-responses";
import type { User } from "@/types/models";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type GetAuthenticatedUser200 = ApiResource<User>;
export type GetAuthenticatedUser401 = UnauthenticatedApiResponse;

export type ListWorkspaceMembers200 = ApiResource<User[]>;
export type ListWorkspaceMembers401 = UnauthenticatedApiResponse;
export type ListWorkspaceMembers403 = UnauthorizedApiResponse;
export type ListWorkspaceMembers404 = NotFoundApiResponse;

/**
 * Retrieve the currently authenticated user
 * @summary Get Authenticated User
 */
export const getAuthenticatedUser = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<GetAuthenticatedUser200>(
    { url: `/api/v1/users/me`, method: "GET", signal },
    options,
  );
};

export const getGetAuthenticatedUserQueryKey = () => {
  return [`/api/v1/users/me`] as const;
};

export const getGetAuthenticatedUserQueryOptions = <
  TData = Awaited<ReturnType<typeof getAuthenticatedUser>>,
  TError = ErrorType<GetAuthenticatedUser401>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof getAuthenticatedUser>>,
      TError,
      TData
    >
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAuthenticatedUserQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getAuthenticatedUser>>
  > = ({ signal }) => getAuthenticatedUser(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getAuthenticatedUser>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetAuthenticatedUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAuthenticatedUser>>
>;
export type GetAuthenticatedUserQueryError = ErrorType<GetAuthenticatedUser401>;

export function useGetAuthenticatedUser<
  TData = Awaited<ReturnType<typeof getAuthenticatedUser>>,
  TError = ErrorType<GetAuthenticatedUser401>,
>(
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getAuthenticatedUser>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAuthenticatedUser>>,
          TError,
          Awaited<ReturnType<typeof getAuthenticatedUser>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetAuthenticatedUser<
  TData = Awaited<ReturnType<typeof getAuthenticatedUser>>,
  TError = ErrorType<GetAuthenticatedUser401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getAuthenticatedUser>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAuthenticatedUser>>,
          TError,
          Awaited<ReturnType<typeof getAuthenticatedUser>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useGetAuthenticatedUser<
  TData = Awaited<ReturnType<typeof getAuthenticatedUser>>,
  TError = ErrorType<GetAuthenticatedUser401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getAuthenticatedUser>>,
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
 * @summary Get Authenticated User
 */

export function useGetAuthenticatedUser<
  TData = Awaited<ReturnType<typeof getAuthenticatedUser>>,
  TError = ErrorType<GetAuthenticatedUser401>,
>(
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof getAuthenticatedUser>>,
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
  const queryOptions = getGetAuthenticatedUserQueryOptions(options);

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Retrieve a list of all users that are members of a specific workspace.
 * @summary List Workspace Members
 */
export const listWorkspaceMembers = (
  workspaceId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ListWorkspaceMembers200>(
    { url: `/api/v1/workspaces/${workspaceId}/users`, method: "GET", signal },
    options,
  );
};

export const getListWorkspaceMembersQueryKey = (workspaceId: string) => {
  return [`/api/v1/workspaces/${workspaceId}/users`] as const;
};

export const getListWorkspaceMembersQueryOptions = <
  TData = Awaited<ReturnType<typeof listWorkspaceMembers>>,
  TError = ErrorType<
    ListWorkspaceMembers401 | ListWorkspaceMembers403 | ListWorkspaceMembers404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceMembers>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getListWorkspaceMembersQueryKey(workspaceId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listWorkspaceMembers>>
  > = ({ signal }) => listWorkspaceMembers(workspaceId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!workspaceId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof listWorkspaceMembers>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ListWorkspaceMembersQueryResult = NonNullable<
  Awaited<ReturnType<typeof listWorkspaceMembers>>
>;
export type ListWorkspaceMembersQueryError = ErrorType<
  ListWorkspaceMembers401 | ListWorkspaceMembers403 | ListWorkspaceMembers404
>;

export function useListWorkspaceMembers<
  TData = Awaited<ReturnType<typeof listWorkspaceMembers>>,
  TError = ErrorType<
    ListWorkspaceMembers401 | ListWorkspaceMembers403 | ListWorkspaceMembers404
  >,
>(
  workspaceId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceMembers>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listWorkspaceMembers>>,
          TError,
          Awaited<ReturnType<typeof listWorkspaceMembers>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useListWorkspaceMembers<
  TData = Awaited<ReturnType<typeof listWorkspaceMembers>>,
  TError = ErrorType<
    ListWorkspaceMembers401 | ListWorkspaceMembers403 | ListWorkspaceMembers404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceMembers>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listWorkspaceMembers>>,
          TError,
          Awaited<ReturnType<typeof listWorkspaceMembers>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useListWorkspaceMembers<
  TData = Awaited<ReturnType<typeof listWorkspaceMembers>>,
  TError = ErrorType<
    ListWorkspaceMembers401 | ListWorkspaceMembers403 | ListWorkspaceMembers404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceMembers>>,
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
 * @summary List Workspace Members
 */

export function useListWorkspaceMembers<
  TData = Awaited<ReturnType<typeof listWorkspaceMembers>>,
  TError = ErrorType<
    ListWorkspaceMembers401 | ListWorkspaceMembers403 | ListWorkspaceMembers404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceMembers>>,
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
  const queryOptions = getListWorkspaceMembersQueryOptions(
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
 * @summary List Workspace Members
 */
export const prefetchListWorkspaceMembers = async <
  TData = Awaited<ReturnType<typeof listWorkspaceMembers>>,
  TError = ErrorType<
    ListWorkspaceMembers401 | ListWorkspaceMembers403 | ListWorkspaceMembers404
  >,
>(
  queryClient: QueryClient,
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listWorkspaceMembers>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getListWorkspaceMembersQueryOptions(
    workspaceId,
    options,
  );

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};
