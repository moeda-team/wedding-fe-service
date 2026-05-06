"use client";

import { Home, Settings, Users } from "lucide-react";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LucideIcon, ChevronDown } from "lucide-react";
import { NavItem } from "@/types/sidebar-interface";

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
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
    <ul className="flex flex-col gap-1">
      {navItems.map((item) => (
        <SidebarItem key={item.href ?? item.label} item={item} />
      ))}
    </ul>
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
