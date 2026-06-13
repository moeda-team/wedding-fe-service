"use server";

import { redirect } from "next/navigation";

import { ApiError } from "@/app/lib/api";
import { registerUser } from "@/app/lib/auth-service";
import { setAuthTokens } from "@/app/lib/session";

export type RegisterState = { error?: string } | undefined;

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
    // Register issues tokens but the account starts unverified. We stash the
    // tokens (so the OTP step can finalize the session via refresh) but do NOT
    // create the session cookie yet — the dashboard stays gated until the
    // email is verified with the OTP we just emailed.
    const { tokens } = await registerUser({
      fullName,
      email,
      password,
      isTermsAccepted,
    });

    await setAuthTokens(tokens);
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Terjadi kesalahan tak terduga. Silakan coba lagi." };
  }

  // Move the user into the OTP verification step, carrying their email.
  redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
}
