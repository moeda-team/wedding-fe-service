"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import { register, type RegisterState } from "@/app/(auth)/register/actions";
import { GOOGLE_AUTH_URL, GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    register,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  // On success the action has already set the session cookies; show the
  // confirmation briefly, then move the user into the app.
  useEffect(() => {
    if (!state?.success) return;
    const timer = setTimeout(() => router.replace("/dashboard"), 1200);
    return () => clearTimeout(timer);
  }, [state, router]);

  const done = state?.success === true;

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <Button asChild variant="outline" size="lg" className="w-full gap-3">
        <a href={GOOGLE_AUTH_URL}>
          <GoogleIcon />
          Daftar dengan Google
        </a>
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        <span className="whitespace-nowrap">Or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {done && (
        <p className="rounded-2xl bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-700">
          Registrasi berhasil! Mengalihkan ke dasbor...
        </p>
      )}

      {state?.error && (
        <p className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName">Nama Lengkap</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Masukkan nama lengkap"
          autoComplete="name"
          required
        />
      </div>

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
        <Label htmlFor="password">Kata Sandi</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 karakter, huruf besar, kecil & angka"
            autoComplete="new-password"
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Masukkan ulang kata sandi"
            autoComplete="new-password"
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={
              showConfirm
                ? "Sembunyikan konfirmasi kata sandi"
                : "Tampilkan konfirmasi kata sandi"
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <label
        htmlFor="isTermsAccepted"
        className="flex items-start gap-2.5 text-sm text-muted-foreground"
      >
        <input
          id="isTermsAccepted"
          name="isTermsAccepted"
          type="checkbox"
          required
          className="mt-0.5 size-4 shrink-0 rounded border-border accent-[#2f2623]"
        />
        <span>
          Saya menyetujui{" "}
          <a href="#" className="font-medium text-pink-primary hover:underline">
            Syarat &amp; Ketentuan
          </a>{" "}
          yang berlaku.
        </span>
      </label>

      <Button
        type="submit"
        size="lg"
        disabled={pending || done}
        className="w-full"
      >
        {pending || done ? (
          <>
            <LoaderCircle className="animate-spin" />
            {done ? "Berhasil" : "Memproses..."}
          </>
        ) : (
          "Daftar"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Sudah memiliki akun?{" "}
        <Link
          href="/login"
          className="font-medium text-pink-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
