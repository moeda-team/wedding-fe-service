"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle, Mail } from "lucide-react";
import { useActionState, useState } from "react";

import { register, type RegisterState } from "@/app/register/actions";
import { GOOGLE_AUTH_URL, GoogleIcon } from "@/components/auth/google-icon";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    register,
    undefined,
  );

  return (
    <div className="min-h-screen bg-[#f5f2ef] flex items-center justify-center p-3 sm:p-6">
      <div className=" w-full
      max-w-6xl
      bg-white
      rounded-2xl
      shadow-lg
      overflow-hidden
      grid
      grid-cols-1
      lg:grid-cols-2

      min-h-[700px]
      lg:h-[90vh]
      xl:h-[92vh]">
        {/* LEFT SIDE */}
        <div className="   p-6
        sm:p-8
        lg:p-10

        flex
        flex-col
        justify-center

        overflow-y-auto   ">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src={"/images/Logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="w-[100px]"
            ></Image>
            <p className="text-sm text-muted-foreground">
              Build Your Digital Invitation
            </p>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#2f2a26]">
              Buat akun baru
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Daftar untuk mulai membuat undangan digital Anda
            </p>
          </div>

          {/* Google Button */}
          <a
            href={GOOGLE_AUTH_URL}
            className="flex w-full items-center justify-center gap-3 border border-gray-300 rounded-lg h-11 text-sm font-medium hover:bg-gray-50 transition"
          >
            <GoogleIcon />
            Daftar dengan Google
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-sm text-gray-400">Or</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          {/* Error message */}
          {state?.error && (
            <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-600">
              {state.error}
            </p>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-[#2f2a26]"
              >
                Nama Lengkap <span className="text-red-500">*</span>
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder="Masukkan nama lengkap"
                className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:ring-2 focus:ring-[#5c5248]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#2f2a26]"
              >
                Email <span className="text-red-500">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Masukkan alamat email"
                className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:ring-2 focus:ring-[#5c5248]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#2f2a26]"
              >
                Kata Sandi <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Min. 8 karakter, huruf besar, kecil & angka"
                  className="w-full h-11 rounded-lg border border-gray-300 px-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#5c5248]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-[#2f2a26]"
              >
                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
              </label>

              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Masukkan konfirmasi kata sandi"
                  className="w-full h-11 rounded-lg border border-gray-300 px-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#5c5248]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2">
              <input
                id="isTermsAccepted"
                name="isTermsAccepted"
                type="checkbox"
                required
                className="mt-1"
              />

              <label
                htmlFor="isTermsAccepted"
                className="text-sm text-muted-foreground"
              >
                Saya setuju dengan Syarat & Ketentuan dan Kebijakan Privasi
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="flex w-full h-11 items-center justify-center gap-2 rounded-lg bg-[#2f2a26] text-white font-medium hover:bg-[#221d1a] transition disabled:opacity-70"
            >
              {pending ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          {/* Login */}
          <p className="text-sm text-center text-muted-foreground mt-6">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#2f2a26] cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="  relative
        hidden
        lg:block

        h-[320px]
        lg:h-full

        p-4 bg-bg-muted">
          <div className="relative h-full rounded-lg overflow-hidden">
            {/* Background Image */}
            <Image
              src="/images/login-hero.png"
              alt="Wedding"
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
              <div>
                <h2 className="text-4xl font-bold leading-tight max-w-md">
                  Buat undangan digital dengan mudah & praktis
                </h2>

                <p className="mt-4 text-sm text-white/80 max-w-md leading-relaxed">
                  Bagikan momen spesial Anda kepada keluarga, sahabat, dan orang
                  terkasih dalam tampilan yang elegan
                </p>
              </div>

              {/* Floating Card */}
              <div className="bg-white text-black rounded-2xl p-6 max-w-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold leading-snug">
                      Mulai Ceritakan Momen Spesial Anda
                    </h3>

                    <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                      Kelola undangan, tamu, RSVP, dan bagikan link digital
                      dalam satu platform yang mudah digunakan.
                    </p>
                  </div>

                  <div className="size-10 rounded-full border flex items-center justify-center">
                    <Mail className="size-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END RIGHT */}
      </div>
    </div>
  );
}
