import { NextResponse, type NextRequest } from "next/server";
import { startsWithAny } from "./lib/utils";
import { getSession } from "./actions/session";

const protectedStaticRoutes = ["/", "/workspaces/create"];
const protectedDynamicRoutes = ["/workspaces"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    protectedStaticRoutes.includes(path) ||
    startsWithAny(path, protectedDynamicRoutes);

  const session = await getSession();

  if (isProtectedRoute && !session?.id && !session?.token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (
    (req.nextUrl.pathname === "/sign-in" ||
      req.nextUrl.pathname === "/sign-up") &&
    session?.id &&
    session?.token
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
