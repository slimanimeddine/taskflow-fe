import { useQuery } from '@tanstack/react-query'
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
} from '@tanstack/react-query'

export type GetAuthenticatedUser200 = ApiResource<User>
export type GetAuthenticatedUser401 = UnauthenticatedApiResponse

import { customInstance } from '@/lib/axios'
import type { ErrorType } from '@/lib/axios'
import { ApiResource, UnauthenticatedApiResponse } from '@/types/api-responses'
import { User } from '@/types/models'

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Retrieve the currently authenticated user
 * @summary Get Authenticated User
 */
export const getAuthenticatedUser = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<GetAuthenticatedUser200>(
    { url: `/api/v1/users/me`, method: 'GET', signal },
    options
  )
}

export const getGetAuthenticatedUserQueryKey = () => {
  return [`/api/v1/users/me`] as const
}

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
  >
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetAuthenticatedUserQueryKey()

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getAuthenticatedUser>>
  > = ({ signal }) => getAuthenticatedUser(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getAuthenticatedUser>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetAuthenticatedUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAuthenticatedUser>>
>
export type GetAuthenticatedUserQueryError = ErrorType<GetAuthenticatedUser401>

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
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
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
        'initialData'
      >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
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
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
}
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
    >
    request?: SecondParameter<typeof customInstance>
  },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>
} {
  const queryOptions = getGetAuthenticatedUserQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as UseQueryResult<
    TData,
    TError
  > & { queryKey: DataTag<QueryKey, TData, TError> }

  query.queryKey = queryOptions.queryKey

  return query
}
