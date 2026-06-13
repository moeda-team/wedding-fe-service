"use server";

import { redirect } from "next/navigation";

import { ApiError } from "@/app/lib/api";
import { resetPassword } from "@/app/lib/auth-service";
import {
  clearPasswordResetTicket,
  getPasswordResetTicket,
} from "@/app/lib/session";

export type ResetPasswordState = { error?: string } | undefined;

// Mirrors the backend rule: min 8 chars with upper, lower, and a number.
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export async function submitNewPassword(
  _prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!PASSWORD_RE.test(password)) {
    return {
      error:
        "Kata sandi minimal 8 karakter dan mengandung huruf besar, huruf kecil, dan angka.",
    };
  }
  if (password !== confirmPassword) {
    return { error: "Konfirmasi kata sandi tidak cocok." };
  }

  // The email + (still-unconsumed) OTP were stashed by the OTP step.
  const ticket = await getPasswordResetTicket();
  if (!ticket) {
    return {
      error: "Sesi reset tidak ditemukan atau telah kedaluwarsa. Silakan ulangi.",
    };
  }

  try {
    await resetPassword({
      email: ticket.email,
      code: ticket.code,
      newPassword: password,
    });
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Gagal mengatur ulang kata sandi. Silakan coba lagi." };
  }

  await clearPasswordResetTicket();
  redirect("/login?reset=1");
}
