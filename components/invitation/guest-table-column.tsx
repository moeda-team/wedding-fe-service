"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { Guests } from "@/types/guest-interface";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Guests>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox className="bg-white border border-gray-300"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox className="bg-white  border border-gray-300"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "guestName",
    header: "Nama Tamu",
  },
  {
    accessorKey: "guestType",
    header: "Tipe Tamu",
  },
  {
    accessorKey: "guestPhoneNumber",
    header: "No. HP",
  },
  {
    accessorKey: "guestInvitationLink",
    header: "Link Undangan",
  },
];