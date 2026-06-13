import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Masuk · Invitee",
  description: "Login untuk melanjutkan ke akun Invitee Anda.",
};

const ERROR_MESSAGES: Record<string, string> = {
  google_denied: "Login dengan Google dibatalkan.",
  google_state: "Sesi login tidak valid. Silakan coba lagi.",
  google_no_email: "Akun Google tidak memiliki email yang dapat digunakan.",
  google_failed: "Gagal masuk dengan Google. Silakan coba lagi.",
};

const NOTICE_MESSAGES: Record<string, string> = {
  reset: "Kata sandi berhasil diatur ulang. Silakan masuk dengan kata sandi baru Anda.",
  verified: "Email berhasil diverifikasi. Silakan masuk untuk melanjutkan.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reset?: string; verified?: string }>;
}) {
  const { error, reset, verified } = await searchParams;
  const initialError = error ? ERROR_MESSAGES[error] : undefined;
  const notice = reset
    ? NOTICE_MESSAGES.reset
    : verified
      ? NOTICE_MESSAGES.verified
      : undefined;

  return (
    <AuthShell
      title="Selamat datang kembali"
      subtitle="Login untuk melanjutkan ke akun Anda."
    >
      <LoginForm initialError={initialError} notice={notice} />
    </AuthShell>
  );
}
