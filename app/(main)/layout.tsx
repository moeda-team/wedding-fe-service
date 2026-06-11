"use client";

import { logout } from "@/app/lib/auth-actions";
import { navItems, Sidebar } from "@/components/ui/sidebar";
import { ArrowLeft, Bell, LogOut, UserCircle2Icon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentPage =
    navItems.find((item) => pathname.startsWith(item.href ?? "/"))?.title ??
    "Dashboard";

  return (
    <div className="flex bg-[#f7f4f2]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT AREA */}
      <div className="w-full">
        {/* TOPBAR */}
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
          <div className="flex gap-3">
            <ArrowLeft></ArrowLeft>
            <h1 className="font-geist text-xl font-semibold text-[#2f2623] ">
              {currentPage}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 transition hover:bg-[#f4f1ef]">
              <Bell size={20} />
            </button>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-[#ece7e4]
                bg-white
                px-3
                py-2
                shadow-sm
              "
            >
              <UserCircle2Icon size={22} />

              <div className="text-left">
                <p className="text-sm font-medium">Rizky</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>

              <form action={logout}>
                <button
                  type="submit"
                  aria-label="Keluar"
                  className="ml-1 rounded-full p-1.5 text-muted-foreground transition hover:bg-[#f4f1ef] hover:text-foreground"
                >
                  <LogOut size={18} />
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
