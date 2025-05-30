'use client'

import { Session } from '@/types/misc'
import React, { createContext, useContext } from 'react'

const SessionContext = createContext<Session | undefined>(undefined)

export function SessionClientProvider({
  children,
  initialSessionData,
}: {
  children: React.ReactNode
  initialSessionData: Session | undefined
}) {
  return (
    <SessionContext.Provider value={initialSessionData}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionData() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(
      'useSessionData must be used within a SessionClientProvider'
    )
  }
  return context
}
