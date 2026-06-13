"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ApiError } from "@/app/lib/api";
import { loginUser } from "@/app/lib/auth-service";
import { createSession, setAuthTokens } from "@/app/lib/session";
import { normalizeProfilePicture } from "@/lib/avatar";

export type LoginState = { error?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Backend ErrorCode for an unverified email (it (re)sends a REGISTER OTP).
const EMAIL_NOT_VERIFIED = "AUTH_012";

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  // Cheap client-mirrored checks to avoid an obviously-bad round-trip.
  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Format email tidak valid." };
  }

  try {
    const userAgent = (await headers()).get("user-agent") ?? undefined;
    const { user, tokens } = await loginUser({ email, password, userAgent });

    await setAuthTokens(tokens);
    await createSession({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      image: normalizeProfilePicture(user.profilePicture),
      provider: user.provider,
    });
  } catch (err) {
    if (err instanceof ApiError) {
      // Account exists but isn't verified — the backend just emailed an OTP.
      // Send the user to the verification page to finish.
      if (err.code === EMAIL_NOT_VERIFIED) {
        redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
      return { error: err.message };
    }
    return { error: "Terjadi kesalahan tak terduga. Silakan coba lagi." };
  }

  redirect("/dashboard");
}
