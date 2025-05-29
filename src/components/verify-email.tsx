'use client'

import { useVerifyEmail } from '@/hooks/endpoints/authentication'
import { authHeader } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import LoadingUI from './loading-ui'

type VerifyEmailProps = {
  token: string
  slug: string[]
  expires: string
  signature: string
}

export default function VerifyEmail({
  token,
  slug,
  expires,
  signature,
}: VerifyEmailProps) {
  const [message, setMessage] = useState('')
  const id = slug[0]
  const hash = slug[1]

  const queryClient = useQueryClient()

  const { isLoading, isError, isSuccess, error } = useVerifyEmail(
    id,
    hash,
    {
      expires,
      signature,
    },
    authHeader(token)
  )

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email verified successfully')
      setMessage('Email verified successfully')
      queryClient.invalidateQueries({
        queryKey: ['/api/v1/users/me'],
      })
    }
  }, [isSuccess, queryClient])

  useEffect(() => {
    if (isError) {
      if (isAxiosError(error) && error.response) {
        setMessage(error.response.data.message)
      } else {
        setMessage('An error occurred while verifying your email')
      }
    }
  }, [error, isError])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingUI />
      </div>
    )
  }

  return <>{message}</>
}
