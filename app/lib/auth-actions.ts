"use server";

import { redirect } from "next/navigation";

import { logoutUser, refreshTokens } from "@/app/lib/auth-service";
import {
  createSession,
  deleteSession,
  getAccessToken,
  getRefreshToken,
  getSession,
  setAuthTokens,
} from "@/app/lib/session";
import { normalizeProfilePicture } from "@/lib/avatar";

/**
 * End the session: revoke it on the backend (best-effort) and clear the local
 * httpOnly cookies, then send the user to /login.
 */
export async function logout() {
  const accessToken = await getAccessToken();
  if (accessToken) {
    try {
      await logoutUser(accessToken);
    } catch {
      // Already-expired or network failure — clearing cookies below is enough.
    }
  }
  await deleteSession();
  redirect("/login");
}

/**
 * Exchange the stored refresh token for a fresh token pair and re-issue the
 * session cookie. Returns true on success. On failure the session is cleared
 * so the next navigation lands on /login.
 *
 * Safe to call from a server action or route handler (it writes cookies).
 */
export async function refreshSession(): Promise<boolean> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return false;

  const previous = await getSession();

  try {
    const { user, tokens } = await refreshTokens(refreshToken);
    await setAuthTokens(tokens);
    await createSession({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      // Backend refresh responses omit the Google photo — preserve it.
      image: normalizeProfilePicture(user.profilePicture) ?? previous?.image,
      provider: user.provider ?? previous?.provider,
    });
    return true;
  } catch {
    await deleteSession();
    return false;
  }
}
