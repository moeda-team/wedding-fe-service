"use server";

import { ApiError } from "@/app/lib/api";
import { registerUser } from "@/app/lib/auth-service";
import { createSession, setAuthTokens } from "@/app/lib/session";

export type RegisterState = { error?: string; success?: boolean } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Mirrors the backend rule: min 8 chars with upper, lower, and a number.
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export async function register(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const isTermsAccepted = formData.get("isTermsAccepted") === "on";

  if (!fullName || !email || !password || !confirmPassword) {
    return { error: "Semua kolom wajib diisi." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Format email tidak valid." };
  }
  if (!PASSWORD_RE.test(password)) {
    return {
      error:
        "Kata sandi minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka.",
    };
  }
  if (password !== confirmPassword) {
    return { error: "Konfirmasi kata sandi tidak cocok." };
  }
  if (!isTermsAccepted) {
    return { error: "Anda harus menyetujui Syarat & Ketentuan." };
  }

  try {
    // The register endpoint also issues tokens, so we authenticate the new
    // user immediately. (Redirecting to /login would dead-end here: the
    // backend rejects login until the email is verified — AUTH_010.)
    const { user, tokens } = await registerUser({
      fullName,
      email,
      password,
      isTermsAccepted,
    });

    await setAuthTokens(tokens);
    await createSession(user.id, user.email);
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Terjadi kesalahan tak terduga. Silakan coba lagi." };
  }

  // Signal success so the form can show a notification, then redirect.
  return { success: true };
}
