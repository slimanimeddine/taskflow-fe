import { useContext } from "react";
import { SessionContext } from "@/providers/session-client-provider";

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionClientProvider");
  }
  return context;
}
