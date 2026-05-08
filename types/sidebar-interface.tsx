import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href?: string; // optional kalau punya submenu
  icon?: LucideIcon;
  children?: NavItem[]; // submenu
  title?: string;
}
