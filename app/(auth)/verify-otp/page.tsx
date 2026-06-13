import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { OtpForm } from "@/components/auth/otp-form";

export const metadata: Metadata = {
  title: "Verifikasi OTP · Invitee",
  description: "Masukkan kode OTP untuk memverifikasi email Anda.",
};

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; mode?: string }>;
}) {
  const { email, mode } = await searchParams;
  const otpMode = mode === "reset" ? "reset" : "register";

  return (
    <AuthShell
      title="Verifikasi OTP"
      subtitle="Masukkan kode OTP yang telah dikirim ke email Anda."
    >
      <OtpForm email={email ?? ""} mode={otpMode} />
    </AuthShell>
  );
}
