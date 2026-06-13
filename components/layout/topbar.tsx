"use client";

import { ArrowLeft, Bell, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { logout } from "@/app/lib/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/components/ui/sidebar";

type TopbarProps = {
  user: { fullName: string; email: string };
  roleLabel: string;
  /** Ordered avatar URLs to try (Google photo first, Gravatar last). */
  avatarSrcs: string[];
};

export function Topbar({ user, roleLabel, avatarSrcs }: TopbarProps) {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);

  const currentPage =
    navItems.find((item) => item.href && pathname.startsWith(item.href))
      ?.title ?? "Beranda";

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-[72px]
        items-center
        justify-between
        border-b
        border-[#ece7e4]
        bg-white/80
        px-8
        backdrop-blur-md
      "
    >
      <div className="flex items-center gap-3">
        <ArrowLeft className="text-muted-foreground" />
        <h1 className="font-geist text-xl font-semibold text-[#2f2623]">
          {currentPage}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifikasi"
          className="rounded-full p-2 transition hover:bg-[#f4f1ef]"
        >
          <Bell size={20} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-[#ece7e4]
                bg-white
                py-1.5
                pl-1.5
                pr-3
                shadow-sm
                transition
                hover:bg-[#faf8f7]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-pink-primary/40
              "
            >
              <Avatar srcs={avatarSrcs} name={user.fullName} />
              <span className="text-left">
                <span className="block text-sm font-medium leading-tight">
                  {firstName(user.fullName)}
                </span>
                <span className="block text-xs text-muted-foreground leading-tight">
                  {roleLabel}
                </span>
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="flex items-center gap-3 py-2">
              <Avatar srcs={avatarSrcs} name={user.fullName} size={36} />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {user.fullName}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              disabled={pending}
              onSelect={(e) => {
                e.preventDefault();
                setPending(true);
                void logout();
              }}
            >
              <LogOut size={16} />
              {pending ? "Keluar…" : "Keluar"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function Avatar({
  srcs,
  name,
  size = 32,
}: {
  srcs: string[];
  name: string;
  size?: number;
}) {
  // Walk the candidate list (Google photo → Gravatar) on load failure, then
  // fall back to an icon when nothing loads.
  const [index, setIndex] = useState(0);
  const src = srcs[index];

  if (!src) {
    return (
      <span
        className="flex items-center justify-center rounded-full bg-pink-primary/15 text-pink-primary"
        style={{ width: size, height: size }}
      >
        <User size={size * 0.55} />
      </span>
    );
  }

  return (
    // Google / Gravatar are trusted external hosts; a plain <img> avoids
    // configuring next/image remote patterns for a tiny avatar.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setIndex((i) => i + 1)}
      referrerPolicy="no-referrer"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}
