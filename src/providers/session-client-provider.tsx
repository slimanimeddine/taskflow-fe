"use client";

import type React from "react";
import { createContext } from "react";
import type { Session } from "@/types/misc";

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
