"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ApiError } from "@/app/lib/api";
import { loginUser } from "@/app/lib/auth-service";
import { createSession, setAuthTokens } from "@/app/lib/session";

export type LoginState = { error?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    await createSession(user.id, user.email);
  } catch (err) {
    if (err instanceof ApiError) return { error: err.message };
    return { error: "Terjadi kesalahan tak terduga. Silakan coba lagi." };
  }

  redirect("/dashboard");
}
