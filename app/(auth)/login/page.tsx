import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Masuk · Invitee",
  description: "Login untuk melanjutkan ke akun Invitee Anda.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Selamat datang kembali"
      subtitle="Login untuk melanjutkan ke akun Anda."
    >
      <LoginForm />
    </AuthShell>
  );
}
