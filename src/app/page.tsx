'use client'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex flex-col justify-between">
      <Link href="/sign-in">sign in</Link>
      <Link href="/sign-up">sign up</Link>
      <Link href="/dashboard">dashboard</Link>
    </div>
  )
}
