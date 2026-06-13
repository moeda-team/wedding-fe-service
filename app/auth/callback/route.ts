import { NextResponse, type NextRequest } from "next/server";

import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  SESSION_COOKIE_NAME,
  createSessionToken,
  decodeJwtPayload,
  sessionCookieOptions,
} from "@/app/lib/session";
import { normalizeProfilePicture } from "@/lib/avatar";

// Receives the result of the backend's Google OAuth flow. The backend handles
// register-or-login and should redirect the browser here with the issued
// tokens:
//   /auth/callback?accessToken=...&refreshToken=...&expiresIn=900
// We persist them (httpOnly) and the signed session cookie, then land the user
// on the dashboard. On any failure we send the user back to /login.
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const accessToken = params.get("accessToken");
  const refreshToken = params.get("refreshToken");
  const expiresIn = Number(params.get("expiresIn") ?? "0");
  const oauthError = params.get("error");

  const fail = (reason: string) => {
    console.warn(
      `[auth/callback] rejected: ${reason}. received params: [${[
        ...params.keys(),
      ].join(", ")}]`,
    );
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("error", "google_failed");
    return NextResponse.redirect(url);
  };

  if (oauthError) return fail(`oauth error=${oauthError}`);
  if (!accessToken || !refreshToken) return fail("missing accessToken/refreshToken");

  const claims = decodeJwtPayload(accessToken);
  if (!claims?.sub || !claims.email) return fail("access token has no sub/email");

  // This route only handles the Google flow, so the picture (if any) is the
  // Google profile photo. Prefer JWT claims, then an explicit callback param.
  const googleImage =
    normalizeProfilePicture(claims.picture) ??
    normalizeProfilePicture(claims.profilePicture) ??
    normalizeProfilePicture(claims.image) ??
    normalizeProfilePicture(
      params.get("picture") ?? params.get("profilePicture"),
    );

  console.log(`[auth/callback] success for ${claims.email} -> /dashboard`);

  const res = NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  res.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    ...base,
    maxAge: expiresIn > 0 ? expiresIn : 60 * 15,
  });
  res.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...base,
    maxAge: 60 * 60 * 24 * 7,
  });
  res.cookies.set(
    SESSION_COOKIE_NAME,
    createSessionToken({
      id: claims.sub,
      email: claims.email,
      fullName: claims.fullName,
      role: claims.role,
      image: googleImage,
      provider: "GOOGLE",
    }),
    sessionCookieOptions(),
  );
  return res;
}
