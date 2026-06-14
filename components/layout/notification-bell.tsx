"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck } from "lucide-react";

import {
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from "@/app/lib/notification-actions";
import type { NotificationDTO } from "@/app/lib/notification-service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function NotificationBell({
  initialNotifications,
  initialUnread,
}: {
  initialNotifications: NotificationDTO[];
  initialUnread: number;
}) {
  const router = useRouter();
  const [items, setItems] = useState<NotificationDTO[]>(initialNotifications);
  const [unread, setUnread] = useState<number>(initialUnread);

  function markOneRead(n: NotificationDTO) {
    if (!n.isRead) {
      setItems((prev) =>
        prev.map((it) => (it.id === n.id ? { ...it, isRead: true } : it)),
      );
      setUnread((u) => Math.max(0, u - 1));
      void markNotificationReadAction({ id: n.id });
    }
  }

  function handleClick(n: NotificationDTO) {
    markOneRead(n);
    if (n.link) router.push(n.link);
  }

  function markAllRead() {
    if (unread === 0) return;
    setItems((prev) => prev.map((it) => ({ ...it, isRead: true })));
    setUnread(0);
    void markAllNotificationsReadAction();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Notifikasi"
          className="relative rounded-full p-2 transition hover:bg-[#f4f1ef] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-primary/40"
        >
          <Bell size={20} />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex min-w-[18px] items-center justify-center rounded-full bg-[#e0483d] px-1 text-[10px] font-semibold leading-[18px] text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-[#2f2623]">
            Notifikasi
          </span>
          {unread > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="flex items-center gap-1 text-xs font-medium text-[#b56c56] transition hover:opacity-75"
            >
              <CheckCheck size={14} />
              Tandai semua dibaca
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto border-t border-[#ece7e4]">
          {items.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              Belum ada notifikasi.
            </p>
          ) : (
            items.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => handleClick(n)}
                className={cn(
                  "flex w-full gap-3 border-b border-[#f1ece9] px-4 py-3 text-left transition last:border-b-0 hover:bg-[#faf8f7]",
                  !n.isRead && "bg-[#fbf3f0]",
                )}
              >
                <span
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    n.isRead ? "bg-transparent" : "bg-[#e0483d]",
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-[#2f2623]">
                    {n.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                    {n.message}
                  </span>
                  <span className="mt-1 block text-[11px] text-[#b3aaa5]">
                    {formatRelative(n.createdAt)}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Compact Indonesian relative-time formatter. */
function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "Baru saja";
  if (min < 60) return `${min} menit lalu`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} hari lalu`;
  return new Date(then).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
