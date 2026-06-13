"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { login, type LoginState } from "@/app/(auth)/login/actions";
import { GOOGLE_AUTH_URL, GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  initialError,
  notice,
}: {
  initialError?: string;
  notice?: string;
}) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = state?.error ?? initialError;

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <Button asChild variant="outline" size="lg" className="w-full gap-3">
        <a href={GOOGLE_AUTH_URL}>
          <GoogleIcon />
          Masuk dengan Google
        </a>
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        <span className="whitespace-nowrap">atau masuk dengan email</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {notice && !errorMessage && (
        <p className="rounded-2xl bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-700">
          {notice}
        </p>
      )}

      {errorMessage && (
        <p className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Masukkan email Anda"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Kata Sandi</Label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-pink-primary hover:underline"
          >
            Lupa kata sandi?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi"
            autoComplete="current-password"
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={
              showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <LoaderCircle className="animate-spin" />
            Memproses...
          </>
        ) : (
          "Masuk"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Belum memiliki akun?{" "}
        <Link
          href="/register"
          className="font-medium text-pink-primary hover:underline"
        >
          Daftar Akun
        </Link>
      </p>
    </form>
  );
}
