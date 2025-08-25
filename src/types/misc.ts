import { type JWTPayload } from "jose";
import {
  type ApiResource,
  type PaginatedApiResponse,
  type SuccessApiResponse,
} from "./api-responses";

export type SessionPayload = {
  id: string;
  token: string;
};

export type Session = JWTPayload & SessionPayload;

export type QueryResult<T> =
  | ApiResource<T>
  | PaginatedApiResponse<T>
  | SuccessApiResponse<T>;
