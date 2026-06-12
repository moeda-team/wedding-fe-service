import { cookies } from "next/headers";
import crypto from "node:crypto";

// Lightweight, dependency-free session: a JSON payload signed with HMAC-SHA256
// and stored in an httpOnly cookie. The signature lets us trust the cookie
// without a database round-trip, which is what the Proxy optimistic check needs.
//
// NOTE: set SESSION_SECRET in the environment for production. The dev fallback
// is intentionally weak and must not be relied on.
const SECRET = process.env.SESSION_SECRET ?? "dev-insecure-secret-change-me";
export const SESSION_COOKIE_NAME = "session";
export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

/** Cookie options shared by every place that writes the session cookie. */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

/** Build a signed session token (without touching cookies). */
export function createSessionToken(userId: string, email: string): string {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  return encodeSession({ userId, email, expiresAt });
}

export type SessionPayload = {
  userId: string;
  email: string;
  expiresAt: number; // epoch ms
};

function sign(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function encodeSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** Verify the signature + expiry and return the payload, or null when invalid. */
export function decodeSession(
  token: string | undefined | null,
): SessionPayload | null {
  if (!token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString(),
    ) as SessionPayload;
    if (!payload.userId || payload.expiresAt < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string, email: string) {
  const token = createSessionToken(userId, email);
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
}

export async function deleteSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
  store.delete(ACCESS_TOKEN_COOKIE);
  store.delete(REFRESH_TOKEN_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return decodeSession(store.get(SESSION_COOKIE_NAME)?.value);
}

/**
 * Persist the backend-issued tokens in httpOnly cookies — the project's
 * existing auth strategy. The access token is available to server code for
 * authenticated API calls via {@link getAccessToken}.
 */
export async function setAuthTokens(tokens: {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}) {
  const store = await cookies();
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  store.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...base,
    // Fall back to the session lifetime if the backend omits expiresIn.
    maxAge: tokens.expiresIn > 0 ? tokens.expiresIn : MAX_AGE_SECONDS,
  });
  store.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...base,
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_COOKIE)?.value;
}

export type JwtClaims = {
  sub?: string;
  email?: string;
  fullName?: string;
  role?: string;
  exp?: number;
};

/**
 * Decode (without verifying) the payload of a JWT. Used only to read identity
 * claims from a backend-issued access token we already trust.
 */
export function decodeJwtPayload(token: string): JwtClaims | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    return JSON.parse(Buffer.from(part, "base64url").toString()) as JwtClaims;
  } catch {
    return null;
  }
}
