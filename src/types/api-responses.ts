import { NotificationData, NotificationType } from './notification'

export type ApiResource<T> = {
  data: T
}

export type MetaLinksField = {
  url: string | null
  label: string
  active: boolean
}

export type MetaField<P extends number = 10> = {
  current_page: number
  from: number | null
  last_page: number
  links: MetaLinksField[]
  path: string
  per_page: P
  to: number | null
  total: number
}

export type LinksField = {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export type PaginatedApiResponse<T, P extends number = 10> = {
  data: T[]
  links: LinksField
  meta: MetaField<P>
}

export type SuccessApiResponse<T> = {
  data: T
  message: string
  status: 200
}

export type SuccessNoDataApiResponse = {
  message: string
  status: 200
}

export type ErrorApiResponse<
  T extends 400 | 401 | 403 | 404 | 422 | 429 = 400,
> = {
  message: string
  status: T
}

export type UnauthenticatedApiResponse = {
  message: 'Unauthenticated'
}

export type UnauthorizedApiResponse = ErrorApiResponse<403>

export type NotFoundApiResponse = ErrorApiResponse<404>

export type TooManyRequestsApiResponse = ErrorApiResponse<429>

export type NotificationResponse = {
  id: string
  type: string
  notifiable_type: NotificationType
  notifiable_id: number
  data: NotificationData
  read_at?: string
  created_at: string
  updated_at: string
}

export type PaginatedNotificationResponse<P extends number = 10> = {
  data: NotificationResponse[]
  current_page: number
  from: number | null
  last_page: number
  path: string
  per_page: P
  to: number | null
  total: number
  first_page_url: string | null
  last_page_url: string | null
  prev_page_url: string | null
  next_page_url: string | null
  links: MetaLinksField[]
}
