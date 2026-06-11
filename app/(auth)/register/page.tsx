import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar · Invitee",
  description: "Buat akun untuk mulai membuat undangan digital Anda.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Buat akun baru"
      subtitle="Daftar untuk mulai membuat undangan digital Anda."
    >
      <RegisterForm />
    </AuthShell>
  );
}
