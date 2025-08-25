import { getSession } from "@/actions/session";
import SessionClientProvider from "./session-client-provider";

export async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <SessionClientProvider initialSessionData={session}>
      {children}
    </SessionClientProvider>
  );
}
