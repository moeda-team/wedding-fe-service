import crypto from "node:crypto";

// Gravatar identicons are derived from the MD5 of the lowercased, trimmed
// email. See https://docs.gravatar.com/api/avatars/images/.
//
// Server-only (uses node:crypto). Call it in a Server Component / action and
// pass the resulting URL to the client.

type GravatarOptions = {
  /** Requested image size in px (Gravatar serves a square). */
  size?: number;
  /**
   * Default image when the email has no Gravatar. One of Gravatar's keywords
   * ("identicon", "mp", "retro", …) or a full URL. We default to "identicon"
   * so accounts without a Gravatar still get a distinct generated avatar
   * (rather than a generic silhouette that looks like no avatar at all).
   */
  fallback?: string;
};

export function gravatarUrl(
  email: string,
  { size = 80, fallback = "identicon" }: GravatarOptions = {},
): string {
  const hash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");

  const params = new URLSearchParams({
    s: String(size),
    d: fallback,
  });
  return `https://www.gravatar.com/avatar/${hash}?${params.toString()}`;
}
