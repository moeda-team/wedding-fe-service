"use server";

import { redirect } from "next/navigation";

import { ApiError } from "@/app/lib/api";
import { forgotPassword } from "@/app/lib/auth-service";

export type ForgotPasswordState = { error?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function requestPasswordReset(
  _prevState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return { error: "Format email tidak valid." };
  }

  try {
    // The backend responds the same whether or not the email exists, so this
    // never leaks account existence.
    await forgotPassword({ email });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Terjadi kesalahan. Silakan coba lagi." };
  }

  redirect(`/verify-otp?mode=reset&email=${encodeURIComponent(email)}`);
}
