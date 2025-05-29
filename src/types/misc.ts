import { JWTPayload } from 'jose'
import {
  ApiResource,
  PaginatedApiResponse,
  SuccessApiResponse,
} from './api-responses'

export type SessionPayload = {
  id: string
  token: string
}

export type Session = JWTPayload & SessionPayload

export type QueryResult<T> =
  | ApiResource<T>
  | PaginatedApiResponse<T>
  | SuccessApiResponse<T>
