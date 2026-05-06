// app/(dashboard)/layout.tsx

import { Sidebar } from "@/components/ui/sidebar";
import { Bell, Globe, LucideHome, LucideListTodo } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f7f4f2]">
      {/* SIDEBAR */}
      <aside className="hidden w-[260px] border-r-4 bg-white lg:flex lg:flex-col border-gray-200">
        <div className="border-b border-white px-6 py-5">
          <h1 className="font-serif text-3xl italic text-[#3b302d]">Invitee</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            BUILD YOUR DIGITAL INVITATION
          </p>
        </div>

        <nav className="flex-1 px-4 py-6">
          {/* <ul className="space-y-2">
            <SidebarItem active label="Beranda" icon={LucideHome}/>
            <SidebarItem label="To Do List" icon={LucideListTodo}/>
            <SidebarItem label="Undangan Digital" />

            <div className="pt-3">
              <p className="px-3 text-xs uppercase tracking-wider text-muted-foreground">
                Tamu
              </p>

              <div className="mt-2 space-y-2">
                <SidebarItem label="Tamu Undangan" />
                <SidebarItem label="RSVP" />
                <SidebarItem label="Ucapan" />
              </div>
            </div>

            <SidebarItem label="Transaksi" />
          </ul> */}
          <Sidebar />
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1">
        {/* TOPBAR */}
        <header className="flex h-[72px] items-center justify-between bg-white px-8">
          <h2 className="text-lg font-medium">Beranda</h2>

          <div className="flex items-center gap-4">
            <button className="rounded-full border p-2 hover:bg-muted">
              <Bell size={18} />
            </button>

            <button className="rounded-full border p-2 hover:bg-muted">
              <Globe size={18} />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
