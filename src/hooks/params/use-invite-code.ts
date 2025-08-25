import { useParams } from "next/navigation";

export function useInviteCode() {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  return inviteCode;
}
