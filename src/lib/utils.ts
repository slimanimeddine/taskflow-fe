/* eslint-disable @typescript-eslint/no-explicit-any */
import type z from "zod/v4";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function fileUrl(url: string | null | undefined) {
  if (!url) return undefined;
  const modifiedUrl = url.replace("public", "");
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${modifiedUrl}`;
}

export function authHeader(token: string) {
  return {
    request: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export type DirtyFieldsType =
  | boolean
  | null
  | {
      [key: string]: DirtyFieldsType;
    }
  | DirtyFieldsType[];

export function getDirtyValues<T extends Record<string, any>>(
  dirtyFields: Partial<Record<keyof T, DirtyFieldsType>>,
  values: T,
): Partial<T> {
  const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
    const value = dirtyFields[key];
    if (!value) {
      return prev;
    }
    const isObject = typeof value === "object";
    const isArray = Array.isArray(value);
    const nestedValue =
      isObject && !isArray
        ? getDirtyValues(value as Record<string, any>, values[key])
        : values[key];
    return { ...prev, [key]: isArray ? values[key] : nestedValue };
  }, {} as Partial<T>);
  return dirtyValues;
}

export function getFirstLetter(str: string) {
  return str.charAt(0).toUpperCase();
}

export function startsWithAny(mainString: string, prefixes: string[]): boolean {
  for (const prefix of prefixes) {
    if (mainString.startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

export function statusLabel(status: string | null) {
  switch (status) {
    case "todo":
      return "To Do";
    case "backlog":
      return "Backlog";
    case "in_progress":
      return "In Progress";
    case "done":
      return "Done";
    case "in_review":
      return "In Review";
    default:
      return "All";
  }
}

export function parseParams<T extends z.ZodType>(data: unknown, schema: T) {
  return schema.safeParse(data);
}
