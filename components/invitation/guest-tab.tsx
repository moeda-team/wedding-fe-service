"use client";
import { GuestDataTableProps } from "@/types/guest-interface";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Download, Pencil, Plus, Trash, Upload } from "lucide-react";

export default function GuestTab<TData, TValue>({
  columns,
  data,
}: GuestDataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      columnFilters,
      columnVisibility,
    },
  });
  //   guestName;
  //   guestType;
  //   guestPhoneNumber;
  //   guestInvitationLink;
  return (
    <div className="font-geist">
      <div className="flex flex-1 py-4">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-[150px] bg-white shadow-sm border rounded-lg">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {[5, 10, 20, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                className="font-geist"
              >
                {pageSize} Baris
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <hr className="h-8 border  mx-4" />
        <Input
          placeholder="Search..."
          value={
            (table.getColumn("guestName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("guestName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white shadow-sm border rounded-lg"
        />
        <Button className="ms-4 bg-white rounded-lg shadow-sm border">
          <Upload className="text-black" />
          <span className="text-black"> Export</span>
        </Button>
        <Button className="ms-4 bg-white rounded-lg shadow-sm border">
          <Download className="text-black" />
          <span className="text-black"> Download</span>
        </Button>
        <Button className="ms-auto rounded-lg shadow-sm border">
          <Plus className="" />
          <span className=""> Tambah tamu</span>
        </Button>
        <Button className="ms-4 bg-destructive/50 rounded-lg shadow-sm border ">
          <Trash className="text-white " />
          <span className="text-white "> Hapus</span>
        </Button>
      </div>
      <div className="overflow-hidden rounded-md ">
        <Table className="bg-white border rounded-lg">
          <TableHeader className="text-font-gray-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-font-gray-primary text-lg"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell className=" text-end">
                    <Button size={"icon"} variant="ghost">
                      <Pencil />
                    </Button>
                    <Button size={"icon"} variant="ghost" className="text-destructive">
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              data.length,
            )}{" "}
            of {data.length} guests
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
