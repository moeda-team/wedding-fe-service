import {
  decodeJwtPayload,
  getAccessToken,
  getSession,
} from "@/app/lib/session";
import { normalizeProfilePicture } from "@/lib/avatar";

export type CurrentUser = {
  id: string;
  email: string;
  fullName: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  /** Provider avatar URL (e.g. Google), or null to fall back to Gravatar. */
  image: string | null;
  provider: string | null;
};

/**
 * Resolve the signed-in user for Server Components. Identity comes from the
 * signed session cookie; when older sessions lack the display fields we fall
 * back to the access token's JWT claims. Returns null when unauthenticated.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();
  if (!session) return null;

  let fullName = session.fullName;
  let role = session.role;
  let image = session.image ?? null;
  let provider = session.provider ?? null;

  if (!fullName || !role || !provider) {
    const token = await getAccessToken();
    const claims = token ? decodeJwtPayload(token) : null;
    fullName ??= claims?.fullName;
    role ??= claims?.role;
    provider ??= claims?.provider ?? null;
    image ??=
      normalizeProfilePicture(claims?.picture) ??
      normalizeProfilePicture(claims?.profilePicture) ??
      normalizeProfilePicture(claims?.image);
  }

  return {
    id: session.userId,
    email: session.email,
    // Fall back to the email's local part so the topbar always has a label.
    fullName: fullName ?? session.email.split("@")[0],
    role: (role as CurrentUser["role"]) ?? "USER",
    image,
    provider,
  };
}

const ROLE_LABELS: Record<CurrentUser["role"], string> = {
  USER: "Pengguna",
  ADMIN: "Administrator",
  SUPER_ADMIN: "Super Admin",
};

export function roleLabel(role: CurrentUser["role"]): string {
  return ROLE_LABELS[role] ?? "Pengguna";
}
