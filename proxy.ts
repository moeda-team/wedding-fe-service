import { NextResponse, type NextRequest } from "next/server";

import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  SESSION_COOKIE_NAME,
  createSessionToken,
  decodeSession,
  sessionCookieOptions,
  type SessionPayload,
} from "@/app/lib/session";
import { normalizeProfilePicture } from "@/lib/avatar";

// Routes reachable without a session. Everything else requires authentication
// and unauthenticated visitors are redirected to /login.
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/verify-otp",
  "/forgot-password",
  "/reset-password",
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/**
 * The access token cookie expires on its own short TTL while the session lives
 * for days. When it's gone but a refresh token remains, silently mint a new
 * token pair so Server Component fetches stay authenticated. Mutates `res` with
 * the refreshed cookies. Returns false when the refresh token is dead.
 */
async function refreshAccessToken(
  req: NextRequest,
  res: NextResponse,
  current: SessionPayload | null,
): Promise<boolean> {
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) return false;

  try {
    const r = await fetch(`${API_BASE_URL}/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    if (!r.ok) return false;

    const { data } = (await r.json()) as {
      data?: {
        user?: {
          id: string;
          email: string;
          fullName?: string;
          role?: string;
          provider?: string;
          profilePicture?: unknown;
        };
        tokens?: { accessToken: string; refreshToken: string; expiresIn: number };
      };
    };
    if (!data?.user?.id || !data.tokens?.accessToken) return false;

    res.cookies.set(ACCESS_TOKEN_COOKIE, data.tokens.accessToken, {
      ...cookieBase,
      maxAge: data.tokens.expiresIn > 0 ? data.tokens.expiresIn : 60 * 15,
    });
    res.cookies.set(REFRESH_TOKEN_COOKIE, data.tokens.refreshToken, {
      ...cookieBase,
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookies.set(
      SESSION_COOKIE_NAME,
      createSessionToken({
        id: data.user.id,
        email: data.user.email,
        fullName: data.user.fullName,
        role: data.user.role,
        // The backend doesn't persist the Google photo, so refresh responses
        // omit it — keep whatever the session already carried.
        image: normalizeProfilePicture(data.user.profilePicture) ?? current?.image,
        provider: data.user.provider ?? current?.provider,
      }),
      sessionCookieOptions(),
    );
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  // Optimistic check: trust the signed cookie, no database round-trip.
  const session = decodeSession(req.cookies.get(SESSION_COOKIE_NAME)?.value);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Authenticated request whose access token has lapsed: refresh it in-flight.
  if (session && !isPublicRoute && !req.cookies.get(ACCESS_TOKEN_COOKIE)) {
    const res = NextResponse.next();
    const refreshed = await refreshAccessToken(req, res, session);
    if (!refreshed) {
      // Refresh token is dead too — force a clean re-login.
      const redirectRes = NextResponse.redirect(new URL("/login", req.nextUrl));
      redirectRes.cookies.delete(SESSION_COOKIE_NAME);
      redirectRes.cookies.delete(REFRESH_TOKEN_COOKIE);
      return redirectRes;
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // Skip API/auth routes, Next internals, and static assets. `auth/callback`
  // is the Google OAuth receiver — it sets the session itself.
  matcher: [
    "/((?!api|auth/callback|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
