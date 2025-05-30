/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryResult } from '@/types/misc'
import { type UseQueryResult } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import { notFound } from 'next/navigation'
import { JSX } from 'react'
import toast from 'react-hot-toast'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function onError(error: Error) {
  if (axios.isAxiosError(error) && error.response) {
    toast.error(`${error.response.data.message || 'Something went wrong'}`)
  } else {
    toast.error(`${error.message}`)
  }
}

export function fileUrl(url: string | null | undefined) {
  if (!url) return undefined
  const modifiedUrl = url.replace('public', '')
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${modifiedUrl}`
}

export function authHeader(token: string) {
  return {
    request: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }
}

export function matchQueryStatus<T extends QueryResult<unknown>>(
  query: UseQueryResult<T>,
  options: {
    Loading: JSX.Element
    Errored: JSX.Element | ((error: unknown) => JSX.Element)
    Empty: JSX.Element
    Success: (
      data: UseQueryResult<T> & {
        data: NonNullable<UseQueryResult<T>['data']>
      }
    ) => JSX.Element
  }
): JSX.Element
export function matchQueryStatus<T extends QueryResult<unknown>>(
  query: UseQueryResult<T>,
  options: {
    Loading: JSX.Element
    Errored: JSX.Element | ((error: unknown) => JSX.Element)
    Success: (data: UseQueryResult<T>) => JSX.Element
  }
): JSX.Element
export function matchQueryStatus<T extends QueryResult<unknown>>(
  query: UseQueryResult<T>,
  {
    Loading,
    Errored,
    Empty,
    Success,
  }: {
    Loading: JSX.Element
    Errored: JSX.Element | ((error: unknown) => JSX.Element)
    Empty?: JSX.Element
    Success: (data: UseQueryResult<T>) => JSX.Element
  }
): JSX.Element {
  if (query.isLoading) {
    return Loading
  }

  if (query.isError) {
    if (isAxiosError(query.error) && query.error.response?.status === 404) {
      notFound()
    }

    if (typeof Errored === 'function') {
      return Errored(query.error)
    }
    return Errored
  }

  const isEmpty =
    query.data === undefined ||
    query.data === null ||
    (Array.isArray(query.data?.data) && query.data?.data.length === 0)

  if (isEmpty && Empty) {
    return Empty
  }

  return Success(query)
}

export type DirtyFieldsType =
  | boolean
  | null
  | {
      [key: string]: DirtyFieldsType
    }
  | DirtyFieldsType[]

export function getDirtyValues<T extends Record<string, any>>(
  dirtyFields: Partial<Record<keyof T, DirtyFieldsType>>,
  values: T
): Partial<T> {
  const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
    const value = dirtyFields[key]
    if (!value) {
      return prev
    }
    const isObject = typeof value === 'object'
    const isArray = Array.isArray(value)
    const nestedValue =
      isObject && !isArray
        ? getDirtyValues(value as Record<string, any>, values[key])
        : values[key]
    return { ...prev, [key]: isArray ? values[key] : nestedValue }
  }, {} as Partial<T>)
  return dirtyValues
}

export function getFirstLetter(str: string) {
  return str.charAt(0).toUpperCase()
}
