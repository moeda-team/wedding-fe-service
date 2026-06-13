import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi · Invitee",
  description: "Minta kode OTP untuk mengatur ulang kata sandi Anda.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Lupa kata sandi"
      subtitle="Masukkan email Anda dan kami akan mengirimkan kode OTP untuk mengatur ulang kata sandi."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
