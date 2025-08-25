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
  type SuccessNoDataApiResponse,
  type UnauthenticatedApiResponse,
  type UnauthorizedApiResponse,
} from "@/types/api-responses";
import { type Member } from "@/types/models";
import { type z } from "zod/v4";
import { type createMemberBody } from "@/schemas/members";

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export type CreateMember200 = ApiResource<Member>;
export type CreateMember400 = ErrorApiResponse;
export type CreateMember401 = UnauthenticatedApiResponse;
export type CreateMember404 = NotFoundApiResponse;
export type CreateMemberBody = z.infer<typeof createMemberBody>;

export type DeleteMember200 = SuccessNoDataApiResponse;
export type DeleteMember400 = ErrorApiResponse;
export type DeleteMember403 = UnauthorizedApiResponse;
export type DeleteMember401 = UnauthenticatedApiResponse;
export type DeleteMember404 = NotFoundApiResponse;

export type ShowAuthenticatedUserMember200 = ApiResource<Member>;
export type ShowAuthenticatedUserMember404 = NotFoundApiResponse;
export type ShowAuthenticatedUserMember401 = UnauthenticatedApiResponse;

export type PromoteMember200 = ApiResource<Member>;
export type PromoteMember403 = UnauthorizedApiResponse;
export type PromoteMember401 = UnauthenticatedApiResponse;
export type PromoteMember404 = NotFoundApiResponse;

/**
 * Create a new member in a workspace.
 * @summary Create member
 */
export const createMember = (
  workspaceId: string,
  createMemberBody: BodyType<CreateMemberBody>,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<CreateMember200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/members`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: createMemberBody,
      signal,
    },
    options,
  );
};

export const getCreateMemberMutationOptions = <
  TError = ErrorType<CreateMember400 | CreateMember401 | CreateMember404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createMember>>,
    TError,
    { workspaceId: string; data: BodyType<CreateMemberBody> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof createMember>>,
  TError,
  { workspaceId: string; data: BodyType<CreateMemberBody> },
  TContext
> => {
  const mutationKey = ["createMember"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createMember>>,
    { workspaceId: string; data: BodyType<CreateMemberBody> }
  > = (props) => {
    const { workspaceId, data } = props ?? {};

    return createMember(workspaceId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateMemberMutationResult = NonNullable<
  Awaited<ReturnType<typeof createMember>>
>;
export type CreateMemberMutationBody = BodyType<CreateMemberBody>;
export type CreateMemberMutationError = ErrorType<
  CreateMember400 | CreateMember401 | CreateMember404
>;

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
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof createMember>>,
  TError,
  { workspaceId: string; data: BodyType<CreateMemberBody> },
  TContext
> => {
  const mutationOptions = getCreateMemberMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Delete a member from a workspace.
 * @summary Delete member
 */
export const deleteMember = (
  workspaceId: string,
  userId: string,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<DeleteMember200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/users/${userId}/members`,
      method: "DELETE",
    },
    options,
  );
};

export const getDeleteMemberMutationOptions = <
  TError = ErrorType<
    DeleteMember400 | DeleteMember401 | DeleteMember403 | DeleteMember404
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteMember>>,
    TError,
    { workspaceId: string; userId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteMember>>,
  TError,
  { workspaceId: string; userId: string },
  TContext
> => {
  const mutationKey = ["deleteMember"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteMember>>,
    { workspaceId: string; userId: string }
  > = (props) => {
    const { workspaceId, userId } = props ?? {};

    return deleteMember(workspaceId, userId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteMemberMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteMember>>
>;

export type DeleteMemberMutationError = ErrorType<
  DeleteMember400 | DeleteMember401 | DeleteMember403 | DeleteMember404
>;

/**
 * @summary Delete member
 */
export const useDeleteMember = <
  TError = ErrorType<
    DeleteMember400 | DeleteMember401 | DeleteMember403 | DeleteMember404
  >,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof deleteMember>>,
      TError,
      { workspaceId: string; userId: string },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof deleteMember>>,
  TError,
  { workspaceId: string; userId: string },
  TContext
> => {
  const mutationOptions = getDeleteMemberMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

/**
 * Retrieve the member details of the authenticated user in a specific workspace.
 * @summary Show authenticated user member
 */
export const showAuthenticatedUserMember = (
  workspaceId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<ShowAuthenticatedUserMember200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/users/me/members`,
      method: "GET",
      signal,
    },
    options,
  );
};

export const getShowAuthenticatedUserMemberQueryKey = (workspaceId: string) => {
  return [`/api/v1/workspaces/${workspaceId}/users/me/members`] as const;
};

export const getShowAuthenticatedUserMemberQueryOptions = <
  TData = Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
  TError = ErrorType<
    ShowAuthenticatedUserMember401 | ShowAuthenticatedUserMember404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getShowAuthenticatedUserMemberQueryKey(workspaceId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof showAuthenticatedUserMember>>
  > = ({ signal }) =>
    showAuthenticatedUserMember(workspaceId, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!workspaceId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ShowAuthenticatedUserMemberQueryResult = NonNullable<
  Awaited<ReturnType<typeof showAuthenticatedUserMember>>
>;
export type ShowAuthenticatedUserMemberQueryError = ErrorType<
  ShowAuthenticatedUserMember401 | ShowAuthenticatedUserMember404
>;

export function useShowAuthenticatedUserMember<
  TData = Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
  TError = ErrorType<
    ShowAuthenticatedUserMember401 | ShowAuthenticatedUserMember404
  >,
>(
  workspaceId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
          TError,
          Awaited<ReturnType<typeof showAuthenticatedUserMember>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowAuthenticatedUserMember<
  TData = Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
  TError = ErrorType<
    ShowAuthenticatedUserMember401 | ShowAuthenticatedUserMember404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
          TError,
          Awaited<ReturnType<typeof showAuthenticatedUserMember>>
        >,
        "initialData"
      >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
};
export function useShowAuthenticatedUserMember<
  TData = Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
  TError = ErrorType<
    ShowAuthenticatedUserMember401 | ShowAuthenticatedUserMember404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
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
 * @summary Show authenticated user member
 */

export function useShowAuthenticatedUserMember<
  TData = Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
  TError = ErrorType<
    ShowAuthenticatedUserMember401 | ShowAuthenticatedUserMember404
  >,
>(
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
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
  const queryOptions = getShowAuthenticatedUserMemberQueryOptions(
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
 * @summary Show authenticated user member
 */
export const prefetchShowAuthenticatedUserMember = async <
  TData = Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
  TError = ErrorType<
    ShowAuthenticatedUserMember401 | ShowAuthenticatedUserMember404
  >,
>(
  queryClient: QueryClient,
  workspaceId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof showAuthenticatedUserMember>>,
        TError,
        TData
      >
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): Promise<QueryClient> => {
  const queryOptions = getShowAuthenticatedUserMemberQueryOptions(
    workspaceId,
    options,
  );

  await queryClient.prefetchQuery(queryOptions);

  return queryClient;
};

/**
 * Promote a member to admin in a workspace.
 * @summary Promote member
 */
export const promoteMember = (
  workspaceId: string,
  userId: string,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<PromoteMember200>(
    {
      url: `/api/v1/workspaces/${workspaceId}/users/${userId}/members`,
      method: "PATCH",
    },
    options,
  );
};

export const getPromoteMemberMutationOptions = <
  TError = ErrorType<PromoteMember401 | PromoteMember403 | PromoteMember404>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof promoteMember>>,
    TError,
    { workspaceId: string; userId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof promoteMember>>,
  TError,
  { workspaceId: string; userId: string },
  TContext
> => {
  const mutationKey = ["promoteMember"];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      "mutationKey" in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof promoteMember>>,
    { workspaceId: string; userId: string }
  > = (props) => {
    const { workspaceId, userId } = props ?? {};

    return promoteMember(workspaceId, userId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PromoteMemberMutationResult = NonNullable<
  Awaited<ReturnType<typeof promoteMember>>
>;

export type PromoteMemberMutationError = ErrorType<
  PromoteMember401 | PromoteMember403 | PromoteMember404
>;

/**
 * @summary Promote member
 */
export const usePromoteMember = <
  TError = ErrorType<PromoteMember401 | PromoteMember403 | PromoteMember404>,
  TContext = unknown,
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof promoteMember>>,
      TError,
      { workspaceId: string; userId: string },
      TContext
    >;
    request?: SecondParameter<typeof customInstance>;
  },
  queryClient?: QueryClient,
): UseMutationResult<
  Awaited<ReturnType<typeof promoteMember>>,
  TError,
  { workspaceId: string; userId: string },
  TContext
> => {
  const mutationOptions = getPromoteMemberMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};
