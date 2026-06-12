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

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const initialError = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <AuthShell
      title="Selamat datang kembali"
      subtitle="Login untuk melanjutkan ke akun Anda."
    >
      <LoginForm initialError={initialError} />
    </AuthShell>
  );
}
