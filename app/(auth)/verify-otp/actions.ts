"use server";

import { redirect } from "next/navigation";

import { ApiError } from "@/app/lib/api";
import { refreshSession } from "@/app/lib/auth-actions";
import { sendOtp, verifyOtp, type OtpType } from "@/app/lib/auth-service";
import { setPasswordResetTicket } from "@/app/lib/session";

// `nonce` lets the client reset the OTP inputs even when the same error
// message repeats (e.g. two wrong codes in a row).
export type VerifyOtpState = { error?: string; nonce?: number } | undefined;

export async function verifyOtpAction(
  _prevState: VerifyOtpState,
  formData: FormData,
): Promise<VerifyOtpState> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();

  const fail = (error: string): VerifyOtpState => ({ error, nonce: Date.now() });

  if (!email) {
    return fail("Email tidak ditemukan. Silakan daftar ulang.");
  }
  if (!/^\d{6}$/.test(code)) {
    return fail("Masukkan 6 digit kode OTP.");
  }

  try {
    await verifyOtp({ email, code, type: "REGISTER" });
  } catch (err) {
    if (err instanceof ApiError) return fail(err.message);
    return fail("Verifikasi gagal. Silakan coba lagi.");
  }

  // Email is now verified. Finalize the login by exchanging the refresh token
  // (stored at registration) for a session cookie.
  const ok = await refreshSession();
  if (!ok) {
    // Tokens lapsed before verification completed — fall back to a clean login.
    redirect("/login?verified=1");
  }

  redirect("/dashboard");
}

/**
 * Reset-password variant: the FORGOT_PASSWORD OTP must stay *unconsumed* so the
 * reset-password endpoint can validate it. So instead of calling verify-otp, we
 * stash the code in a short-lived httpOnly cookie and move to the reset step.
 */
export async function submitResetCodeAction(
  _prevState: VerifyOtpState,
  formData: FormData,
): Promise<VerifyOtpState> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();

  if (!email) {
    return { error: "Email tidak ditemukan. Silakan ulangi.", nonce: Date.now() };
  }
  if (!/^\d{6}$/.test(code)) {
    return { error: "Masukkan 6 digit kode OTP.", nonce: Date.now() };
  }

  await setPasswordResetTicket({ email, code });
  redirect("/reset-password");
}

export type ResendOtpState = { error?: string; sent?: boolean } | undefined;

const OTP_TYPES: OtpType[] = ["REGISTER", "LOGIN", "FORGOT_PASSWORD"];

export async function resendOtpAction(
  _prevState: ResendOtpState,
  formData: FormData,
): Promise<ResendOtpState> {
  const email = String(formData.get("email") ?? "").trim();
  const rawType = String(formData.get("type") ?? "REGISTER");
  const type: OtpType = OTP_TYPES.includes(rawType as OtpType)
    ? (rawType as OtpType)
    : "REGISTER";

  if (!email) {
    return { error: "Email tidak ditemukan. Silakan ulangi." };
  }

  try {
    await sendOtp({ email, type });
    return { sent: true };
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Gagal mengirim ulang kode. Silakan coba lagi." };
  }
}
