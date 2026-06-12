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
  const res = await apiFetch<ApiEnvelope<AuthResponse>>("/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return ensureAuthResponse(res.data);
}
