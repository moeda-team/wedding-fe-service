"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type Guests = {
  id: string;
  guestName: string;
  guestType: string;
  guestPhoneNumber: string;
  guestInvitationLink: string;
};

export interface GuestDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
