"use client";
export default function ErrorUI({ message }: { message: string }) {
  return <p className="mt-2 text-sm text-red-700">{message}</p>;
}
