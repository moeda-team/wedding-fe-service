"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useActionState } from "react";

import {
  requestPasswordReset,
  type ForgotPasswordState,
} from "@/app/(auth)/forgot-password/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<
    ForgotPasswordState,
    FormData
  >(requestPasswordReset, undefined);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {state?.error && (
        <p className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {state.error}
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

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <LoaderCircle className="animate-spin" />
            Mengirim...
          </>
        ) : (
          "Kirim Kode OTP"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Ingat kata sandi Anda?{" "}
        <Link
          href="/login"
          className="font-medium text-pink-primary hover:underline"
        >
          Masuk
        </Link>
      </p>
    </form>
  );
}
