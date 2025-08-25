"use client";

import { type Session } from "@/types/misc";
import React, { createContext } from "react";

export const SessionContext = createContext<Session | undefined>(undefined);

export default function SessionClientProvider({
  children,
  initialSessionData,
}: {
  children: React.ReactNode;
  initialSessionData: Session | undefined;
}) {
  return (
    <SessionContext.Provider value={initialSessionData}>
      {children}
    </SessionContext.Provider>
  );
}
