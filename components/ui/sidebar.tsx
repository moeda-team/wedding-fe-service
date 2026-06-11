"use client";

import { Home, MailOpen, Settings, UserPen, Users } from "lucide-react";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { NavItem } from "@/types/sidebar-interface";
import { Button } from "./button";

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home, title: "Beranda" },
  {
    label: "Undangan Digital",
    href: "/invitation",
    icon: MailOpen,
    title: "Edit Undangan",
  },
  {
    label: "Users",
    icon: Users,
    children: [
      // no href, has children
      { label: "All Users", href: "/users" },
      { label: "Roles", href: "/users/roles" },
    ],
  },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-72 shrink-0 border-r-4 border-8 bg-white">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* HEADER */}
        <div className="px-6 py-5 border-b">
          <h1 className="font-serif text-3xl italic text-[#3b302d]">Invitee</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            BUILD YOUR DIGITAL INVITATION
          </p>
        </div>

        {/* NAV */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <SidebarItem key={item.href ?? item.label} item={item} />
            ))}
          </ul>

          {/* BOTTOM SECTION */}
          <div className="mt-auto pb-4">
            <div className="rounded-xl border-2 p-3">
              <div className="flex flex-col gap-3">
                <p className="text-lg font-semibold text-font-black-primary">
                  Jadi Creator & Hasilkan Pendapatan
                </p>

                <p className="text-md text-gray-500">
                  Invite friends and get 50 more
                </p>

                <Button className="rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <UserPen className="h-5 w-5 shrink-0" />

                    <p className="text-lg">Jadi Creator Template</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const router = useRouter();
  const hasChildren = item.children && item.children.length > 0;

  // auto expand kalau salah satu child aktif
  const isChildActive = item.children?.some((child) =>
    pathname.startsWith(child.href ?? ""),
  );
  const [open, setOpen] = useState(isChildActive ?? false);

  const isActive = item.href
    ? item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href)
    : false;

  const Icon = item.icon;

  function handleClick() {
    if (hasChildren) {
      setOpen((prev) => !prev); // toggle submenu
    } else if (item.href) {
      router.push(item.href); // navigate
    }
  }

  return (
    <li>
      <a
        onClick={handleClick}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition cursor-pointer
          ${
            isActive
              ? "bg-[#f5e7e2] font-medium text-[#b56c56]"
              : "text-muted-foreground hover:bg-muted"
          }`}
      >
        {Icon && <Icon size={18} />}
        <span className="flex-1 text-left">{item.label}</span>
        {hasChildren && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        )}
      </a>

      {/* Submenu */}
      {hasChildren && open && (
        <ul className="ml-6 mt-1 flex flex-col gap-1 border-l border-border pl-3">
          {item.children!.map((child) => (
            <SidebarItem key={child.href ?? child.label} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
