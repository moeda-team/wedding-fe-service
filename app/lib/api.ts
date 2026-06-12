// Thin fetch wrapper around the backend API. Centralizes the base URL,
// JSON handling, and error normalization so callers never duplicate request
// or error-parsing logic.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** A normalized API error with a user-friendly `message`. */
export class ApiError extends Error {
  /** HTTP status (0 for network/connection failures). */
  readonly status: number;
  /** Backend error code when provided (e.g. "AUTH_001"). */
  readonly code?: string;
  /** Individual validation messages when the backend returns a list. */
  readonly details?: string[];

  constructor(
    message: string,
    status: number,
    options?: { code?: string; details?: string[] },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = options?.code;
    this.details = options?.details;
  }
}

type ErrorBody = {
  message?: string | string[];
  error?: string;
  code?: string;
  statusCode?: number;
};

function messageFromBody(body: ErrorBody | null, status: number): string {
  const raw = body?.message;
  if (Array.isArray(raw) && raw.length > 0) return raw.join(". ");
  if (typeof raw === "string" && raw.trim()) return raw;

  // Fall back to friendly messages by status class.
  if (status >= 500) return "Terjadi kesalahan pada server. Coba lagi nanti.";
  if (status === 401 || status === 403) return "Akses ditolak.";
  return "Permintaan gagal. Silakan coba lagi.";
}

/**
 * Perform a JSON request against the backend.
 *
 * Resolves with the parsed response body on success, and rejects with an
 * {@link ApiError} on any failure (non-2xx, network error, or malformed JSON).
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...init?.headers,
      },
      cache: "no-store",
    });
  } catch {
    // DNS failure, connection refused, timeout, offline, etc.
    throw new ApiError(
      "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      0,
    );
  }

  // Some success responses (e.g. 204) have no body.
  const text = await res.text();
  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      if (res.ok) {
        throw new ApiError("Respons server tidak valid.", res.status);
      }
      // Non-JSON error body — fall through to status-based message.
    }
  }

  if (!res.ok) {
    const errorBody = (body ?? null) as ErrorBody | null;
    const details = Array.isArray(errorBody?.message)
      ? errorBody?.message
      : undefined;
    throw new ApiError(messageFromBody(errorBody, res.status), res.status, {
      code: errorBody?.code,
      details,
    });
  }

  return body as T;
}
