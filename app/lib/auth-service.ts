import { ApiError, apiFetch } from "@/app/lib/api";

// The backend wraps every successful response in a standard envelope.
type ApiEnvelope<T> = {
  statusCode: number;
  message: string | null;
  data: T;
};

// Types mirror the backend Swagger DTOs:
//   RegisterDto / LoginDto (requests) and AuthResponseDto (response).

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
  isTermsAccepted: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
  userAgent?: string;
};

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  profilePicture?: unknown;
  provider: "LOCAL" | "GOOGLE";
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  emailVerified: boolean;
  isTermsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type AuthResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};

function ensureAuthResponse(data: AuthResponse | undefined): AuthResponse {
  if (!data?.user?.id || !data?.tokens?.accessToken) {
    throw new ApiError("Respons server tidak valid.", 502);
  }
  return data;
}

export async function registerUser(
  body: RegisterRequest,
): Promise<AuthResponse> {
  const res = await apiFetch<ApiEnvelope<AuthResponse>>("/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return ensureAuthResponse(res.data);
}

export async function loginUser(body: LoginRequest): Promise<AuthResponse> {
  // const res = await apiFetch<ApiEnvelope<AuthResponse>>("/v1/auth/login", {
  //   method: "POST",
  //   body: JSON.stringify(body),
  // });

  return ensureAuthResponse(createMockAuthResponse());
}
export const createMockAuthResponse = (): AuthResponse => ({
  user: {
    id: "usr_123456",
    fullName: "Rizky Naufal",
    email: "rizky.naufal@example.com",
    profilePicture: null,
    provider: "LOCAL",
    role: "USER",
    emailVerified: true,
    isTermsAccepted: true,
    createdAt: "2026-06-14T10:00:00.000Z",
    updatedAt: "2026-06-14T10:00:00.000Z",
  },
  tokens: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "eyJzdWIiOiJ1c3JfMTIzNDU2IiwiZW1haWwiOiJyaXpreS5uYXVmYWxAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc4MTQyNjQwMCwiZXhwIjoxNzgxNDMwMDAwfQ." +
      "dummySignature123456789",
    refreshToken: "refresh_token_123456789abcdefghijklmnopqrstuvwxyz",
    expiresIn: 3600, // 1 hour in seconds
  },
});
/**
 * Exchange a refresh token for a fresh access/refresh token pair (and the
 * current user). Throws {@link ApiError} when the refresh token is invalid or
 * revoked (typically 401/403) — the caller should then end the session.
 */
export async function refreshTokens(
  refreshToken: string,
): Promise<AuthResponse> {
  const res = await apiFetch<ApiEnvelope<AuthResponse>>("/v1/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
  return ensureAuthResponse(res.data);
}

/**
 * Revoke the active session on the backend. Authenticated with the access
 * token; the backend invalidates the associated refresh token. Best-effort —
 * callers should still clear local cookies even if this throws.
 */
export async function logoutUser(accessToken: string): Promise<void> {
  await apiFetch("/v1/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export type OtpType = "REGISTER" | "LOGIN" | "FORGOT_PASSWORD";

/** Verify a one-time code. Throws {@link ApiError} on an invalid/expired code. */
export async function verifyOtp(body: {
  email: string;
  code: string;
  type: OtpType;
}): Promise<void> {
  await apiFetch("/v1/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** (Re)send a one-time code. Throws {@link ApiError} (e.g. cooldown). */
export async function sendOtp(body: {
  email: string;
  type: OtpType;
}): Promise<void> {
  await apiFetch("/v1/auth/send-otp", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Request a password-reset OTP. Always resolves (the backend doesn't reveal
 *  whether the email exists); throws {@link ApiError} only on transport/5xx. */
export async function forgotPassword(body: { email: string }): Promise<void> {
  await apiFetch("/v1/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Set a new password using the FORGOT_PASSWORD OTP. Throws {@link ApiError}
 *  on an invalid/expired code or a password that fails backend rules. */
export async function resetPassword(body: {
  email: string;
  code: string;
  newPassword: string;
}): Promise<void> {
  await apiFetch("/v1/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
