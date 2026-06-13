import { ApiError, apiFetch } from "@/app/lib/api";
import { refreshSession } from "@/app/lib/auth-actions";
import { getAccessToken } from "@/app/lib/session";

/**
 * Authenticated server-side request against the backend.
 *
 * Attaches the current access token as a Bearer header. On a 401 it transparently
 * refreshes the token once (see {@link refreshSession}) and retries.
 *
 * Because the refresh path writes cookies, call this from Server Actions or
 * Route Handlers. During a Server Component render the access token is kept
 * fresh by the middleware instead, so a refresh here is rarely needed.
 */
export async function authFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const run = (token: string | undefined) =>
    apiFetch<T>(path, {
      ...init,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    });

  const token = await getAccessToken();
  try {
    return await run(token);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      const refreshed = await refreshSession();
      if (refreshed) {
        return run(await getAccessToken());
      }
    }
    throw err;
  }
}
