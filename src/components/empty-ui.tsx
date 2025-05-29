'use client'

type EmptyUIProps = {
  message: string
}

export default function EmptyUI({ message }: EmptyUIProps) {
  return <p className="mt-2 text-sm text-gray-700">{message}</p>
}
