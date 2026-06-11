import { cookies } from "next/headers";
import crypto from "node:crypto";

// Lightweight, dependency-free session: a JSON payload signed with HMAC-SHA256
// and stored in an httpOnly cookie. The signature lets us trust the cookie
// without a database round-trip, which is what the Proxy optimistic check needs.
//
// NOTE: set SESSION_SECRET in the environment for production. The dev fallback
// is intentionally weak and must not be relied on.
const SECRET = process.env.SESSION_SECRET ?? "dev-insecure-secret-change-me";
const COOKIE_NAME = "session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

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
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const token = encodeSession({ userId, email, expiresAt });
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function deleteSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return decodeSession(store.get(COOKIE_NAME)?.value);
}
