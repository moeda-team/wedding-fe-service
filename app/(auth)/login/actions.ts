"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/app/lib/session";

export type LoginState = { error?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Format email tidak valid." };
  }
  if (password.length < 6) {
    return { error: "Kata sandi minimal 6 karakter." };
  }

  // TODO: replace with a real authentication API call. For now any
  // valid-looking credentials establish a session so the flow is usable.
  await createSession(email, email);

  redirect("/dashboard");
}
