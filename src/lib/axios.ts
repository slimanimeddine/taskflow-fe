import Axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse,
  type CancelTokenSource,
} from "axios";
import { env } from "@/env/client";

type AllowedMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Create typed instance
export const axiosInstance: AxiosInstance = Axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Extend Promise type to include cancel method
interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void;
}

// Custom config type with improved type safety
export interface CustomAxiosRequestConfig<TRequest = unknown>
  extends AxiosRequestConfig<TRequest> {
  method: AllowedMethod;
  data?: TRequest;
}

// Fully typed request function
export const customInstance = <TResponse, TRequest = unknown>(
  config: CustomAxiosRequestConfig<TRequest>,
  options?: AxiosRequestConfig,
): CancelablePromise<TResponse> => {
  const source: CancelTokenSource = Axios.CancelToken.source();

  const promise = axiosInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(
    (response: AxiosResponse<TResponse>) => response.data,
  ) as CancelablePromise<TResponse>;

  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// Optional utility types
export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
