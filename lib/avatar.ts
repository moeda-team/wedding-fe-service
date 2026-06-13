import { gravatarUrl } from "./gravatar";

/**
 * The backend types `profilePicture` loosely (`object`) — in practice it's a
 * URL string for Google accounts, sometimes wrapped as `{ url }`, sometimes
 * null for password accounts. Coerce it to a usable http(s) URL or null.
 */
export function normalizeProfilePicture(value: unknown): string | null {
  if (typeof value === "string") {
    const v = value.trim();
    return v.startsWith("http") ? v : null;
  }
  if (value && typeof value === "object") {
    const url = (value as { url?: unknown }).url;
    if (typeof url === "string" && url.trim().startsWith("http")) {
      return url.trim();
    }
  }
  return null;
}

type AvatarInput = {
  email: string;
  image?: string | null;
  provider?: string;
  size?: number;
};

/**
 * Ordered list of avatar sources to try. Google accounts surface their Google
 * profile photo first; everyone falls back to Gravatar (which itself serves a
 * generated identicon when the email has no Gravatar). The UI walks this list
 * on image-load failure.
 */
export function avatarCandidates({
  email,
  image,
  provider,
  size = 80,
}: AvatarInput): string[] {
  const candidates: string[] = [];

  // Google login → use the Google-provided picture. Any other stored picture
  // is honoured too, but Gravatar remains the guaranteed fallback.
  if (image && (provider === "GOOGLE" || image.includes("googleusercontent"))) {
    candidates.push(image);
  } else if (image) {
    candidates.push(image);
  }

  candidates.push(gravatarUrl(email, { size, fallback: "identicon" }));
  return candidates;
}
