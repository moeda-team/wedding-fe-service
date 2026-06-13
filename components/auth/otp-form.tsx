"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import {
  resendOtpAction,
  submitResetCodeAction,
  verifyOtpAction,
  type ResendOtpState,
  type VerifyOtpState,
} from "@/app/(auth)/verify-otp/actions";

const LENGTH = 6;

export type OtpMode = "register" | "reset";

export function OtpForm({
  email,
  mode = "register",
}: {
  email: string;
  mode?: OtpMode;
}) {
  const otpType = mode === "reset" ? "FORGOT_PASSWORD" : "REGISTER";
  const restartHref = mode === "reset" ? "/forgot-password" : "/register";
  const restartLabel = mode === "reset" ? "Ulangi" : "Daftar ulang";

  const [state, formAction, pending] = useActionState<VerifyOtpState, FormData>(
    mode === "reset" ? submitResetCodeAction : verifyOtpAction,
    undefined,
  );
  const [resendState, resendAction, resending] = useActionState<
    ResendOtpState,
    FormData
  >(resendOtpAction, undefined);

  const [digits, setDigits] = useState<string[]>(() => Array(LENGTH).fill(""));
  const [handledNonce, setHandledNonce] = useState<number | undefined>(
    undefined,
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const autoSubmitted = useRef(false);

  const code = digits.join("");

  // Adjust-during-render: when a new verification error arrives, clear the
  // boxes. (React's sanctioned alternative to a setState-in-effect.)
  if (state?.nonce !== undefined && state.nonce !== handledNonce) {
    setHandledNonce(state.nonce);
    setDigits(Array(LENGTH).fill(""));
    // The auto-submit effect re-arms itself once `code` drops below full length.
  }

  // Auto-submit once all boxes are filled — the design has no submit button.
  useEffect(() => {
    if (code.length === LENGTH && !autoSubmitted.current) {
      autoSubmitted.current = true;
      formRef.current?.requestSubmit();
    }
    if (code.length < LENGTH) autoSubmitted.current = false;
  }, [code]);

  // Focus the first box on mount and after each cleared error (no state writes).
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, [handledNonce]);

  function writeFrom(index: number, raw: string) {
    const cleaned = raw.replace(/\D/g, "");
    setDigits((prev) => {
      const next = [...prev];
      if (cleaned === "") {
        next[index] = "";
        return next;
      }
      // Support pasting/typing multiple digits at once.
      for (let k = 0; k < cleaned.length && index + k < LENGTH; k++) {
        next[index + k] = cleaned[k];
      }
      return next;
    });
    if (cleaned !== "") {
      const target = Math.min(index + cleaned.length, LENGTH - 1);
      inputsRef.current[target]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  if (!email) {
    return (
      <div className="mt-8 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
        Sesi verifikasi tidak ditemukan.{" "}
        <Link href={restartHref} className="font-medium underline">
          {restartLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {state?.error && (
        <p className="mb-4 rounded-2xl bg-destructive/10 px-4 py-2.5 text-center text-sm text-destructive">
          {state.error}
        </p>
      )}
      {resendState?.sent && !state?.error && (
        <p className="mb-4 rounded-2xl bg-emerald-500/10 px-4 py-2.5 text-center text-sm text-emerald-700">
          Kode baru telah dikirim ke email Anda.
        </p>
      )}
      {resendState?.error && (
        <p className="mb-4 rounded-2xl bg-destructive/10 px-4 py-2.5 text-center text-sm text-destructive">
          {resendState.error}
        </p>
      )}

      <form ref={formRef} action={formAction}>
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="code" value={code} />

        <div className="flex justify-center gap-2.5 sm:gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={LENGTH}
              value={digit}
              disabled={pending}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => writeFrom(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => e.target.select()}
              className="h-13 w-11 rounded-xl border border-[#e3dcd8] bg-white text-center text-xl font-semibold text-[#2f2623] outline-none transition focus:border-pink-primary focus:ring-2 focus:ring-pink-primary/30 disabled:opacity-60 sm:h-14 sm:w-12"
            />
          ))}
        </div>
      </form>

      {pending && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <LoaderCircle className="size-4 animate-spin" />
          Memverifikasi...
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
        <span>Tidak menerima kode?</span>
        <form action={resendAction} className="inline-flex">
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="type" value={otpType} />
          <button
            type="submit"
            disabled={resending}
            className="font-medium text-pink-primary hover:underline disabled:opacity-60"
          >
            {resending ? "Mengirim..." : "Kirim ulang"}
          </button>
        </form>
      </div>
    </div>
  );
}
