import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getPasswordResetTicket } from "@/app/lib/session";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Atur Ulang Kata Sandi · Invitee",
  description: "Buat kata sandi baru untuk akun Anda.",
};

export default async function ResetPasswordPage() {
  // Reachable only after the OTP step stashed a reset ticket.
  const ticket = await getPasswordResetTicket();
  if (!ticket) redirect("/forgot-password");

  return (
    <AuthShell
      title="Atur kata sandi baru"
      subtitle={`Buat kata sandi baru untuk ${ticket.email}.`}
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
