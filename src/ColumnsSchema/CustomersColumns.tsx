import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "../Components/UI/shadcn-UI/button";
import { Checkbox } from "../Components/UI/shadcn-UI/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Components/UI/shadcn-UI/dropdown-menu";
import { Editcustomer } from "@/Components/UI/UI-Components/Editcustomer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
} from "@/Components/UI/shadcn-UI/dialog";

export type Customer = {
  id: number;
  cname: string;
  cphone_number: number;
  caddress: string;
  bottle_price: number;
  delivery_sequence_number: number;
};

export const columns: ColumnDef<Customer>[] = [
  // {
  //   id: "_id",
  //   accessorKey: "_id",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "cname",
    header: () => <div className="text-left">Customer Names</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cname")}</div>
    ),
  },
  {
    accessorKey: "cphone_number",
    header: ({ column }) => {
      return (

        <div className="text-left">
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("cphone_number")}</div>
    ),
  },
  {
    accessorKey: "caddress",
    header: () => <div className="text-left">Address</div>,
    cell: ({ row }) => {
      return <div className="lowercase">{row.getValue("caddress")}</div>;
    },
  },
  {
    accessorKey: "bottle_price",
    header: () => "Bottle Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("bottle_price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "delivery_sequence_number",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sequence Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">
        {row.getValue("delivery_sequence_number")}
      </div>
    ),
  },
  {
    header: () => <div className="text-left">Actions</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      return <Editcustomer id={customer._id} />;
    },
  },
];
