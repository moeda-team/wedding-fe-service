import { NextResponse, type NextRequest } from "next/server";

import { decodeSession } from "@/app/lib/session";

// Routes reachable without a session. Everything else requires authentication
// and unauthenticated visitors are redirected to /login.
const PUBLIC_ROUTES = ["/login", "/register"];

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  // Optimistic check: trust the signed cookie, no database round-trip.
  const session = decodeSession(req.cookies.get("session")?.value);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals, and static assets.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
