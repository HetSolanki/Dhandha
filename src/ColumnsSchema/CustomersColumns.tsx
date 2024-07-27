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
import { ArrowUpDown } from "lucide-react";
import { Button } from "../Components/UI/shadcn-UI/button";
import { Editcustomer } from "@/Components/UI/UI-Components/Editcustomer";
import DeleteCustomer from "@/Components/UI/UI-Components/DeleteCustomer";
import React from "react";
import GetInvoice from "@/Components/UI/UI-Components/GetInvoice";
import { InvoiceX } from "@/Components/Section/Invoicex";

export type Customer = {
  _id: number;
  id: number;
  cname: string;
  cphone_number: number;
  caddress: string;
  bottle_price: number;
  delivery_sequence_number: number;
  uid: {
    fname: string;
  };
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "delivery_sequence_number",
    header: ({ column }) => {
      return (
        <div
          className="
        "
        >
          <Button
            variant="ghost"
            className="px-0 
            text-center sm:text-left         
            "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sequence <br />
            Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-left ">
        {row.getValue("delivery_sequence_number")}
      </div>
    ),
  },
  {
    accessorKey: "cname",
    header: () => (
      <div className="text-center sm:text-left">Customer Names</div>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cname")}</div>
    ),
  },
  {
    accessorKey: "cphone_number",
    header: ({ column }) => {
      return (
        <div className="text-center sm:text-left w-10  ">
          <Button
            variant="ghost"
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone <br /> Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="capitalize text-left">
        {row.getValue("cphone_number")}
      </div>
    ),
  },
  {
    accessorKey: "caddress",
    header: () => <div className="text-center sm:text-left">Address</div>,
    cell: ({ row }) => {
      return (
        <div className="lowercase text-left">{row.getValue("caddress")}</div>
      );
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
    header: () => <div className="text-center sm:text-left">Actions</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <>
          <div className="flex gap-x-2">
            <Editcustomer id={customer._id} />
            <DeleteCustomer cid={customer._id} />
            <GetInvoice cid={customer._id} />
          </div>
        </>
      );
    },
  },
];
