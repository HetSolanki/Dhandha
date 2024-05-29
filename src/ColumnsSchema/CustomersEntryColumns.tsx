
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
import {
  ArrowUpDown,
  ClipboardCheckIcon,
  ClipboardXIcon,
  EyeIcon,
  SortAsc,
} from "lucide-react";
import { Button } from "../Components/UI/shadcn-UI/button";
import { Stack, TextField } from "@mui/material";

export type Customer = {
  cname: string;
  cphone_number: number;
  caddress: string;
  bottle_price: number;
  id: number;
  no_of_bottle: number;
  delivery_sequence_number: number;
};

const handleEntry = (customer) => {
  const no_of_bottles = document.getElementById(customer._id);
  if (no_of_bottles.value !== "") {
    alert(no_of_bottles.value);
  } else {
    alert("Please enter the number of bottles");
  }
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "delivery_sequence_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sr
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">
        {row.getValue("delivery_sequence_number")}
      </div>
    ),
  },
  {
    accessorKey: "cname",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cname")}</div>
    ),
  },
  {
    accessorKey: "caddress",
    header: "Address",
    cell: ({ row }) => {
      return <div className="lowercase">{row.getValue("caddress")}</div>;
    },
  },
  {
    accessorKey: "bottle_price",
    header: "Bottle Price",
    cell: ({ row }) => {
      return <div >
          <TextField
              variant="outlined"
              size="small"
              type="text"
              value={row.getValue("bottle_price")}
              className="w-20 text-center"
              disabled
            />
        </div>;
    },

  },
  {
    header: () => {
      return (<div className="text-center">Qty</div>)
    },
    accessorKey: "no_of_bottle",
    id: "no_of_bottle",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <>
          <div className="flex items-center space-x-1">
            <div className="cursor-pointer" onClick={
              () => {
                const no_of_bottles = document.getElementById(customer._id);
                if (no_of_bottles.value !== "") {
                  no_of_bottles.value = parseInt(no_of_bottles.value) + 1;
                }
              }
            }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
              </svg>
            </div>

            <TextField
              id={customer._id}
              variant="outlined"
              size="small"
              type="text"
              value={0}
              className="w-14"
            />
            <div className="cursor-pointer" onClick={
              () => {
                const no_of_bottles = document.getElementById(customer._id);
                if (no_of_bottles.value !== "") {
                  if (parseInt(no_of_bottles.value) > 0) {
                    no_of_bottles.value = parseInt(no_of_bottles.value) - 1;
                  }
                  else {
                    no_of_bottles.value = 0;
                  }
                }
              }

            }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
              </svg>
            </div>
          </div >
        </>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <>
          <Stack direction="row" spacing={1}>
            <Button
              size="icon"
              className="h-8 gap-1 inl"
              onClick={() => handleEntry(customer)}
            >
              <ClipboardCheckIcon />
            </Button>
            <Button size="icon" className="h-8 gap-1">
              <ClipboardXIcon />
            </Button>
            <Button
              size="icon"
              className="h-8 gap-1"
              onClick={() => {
                console.log("View");
                alert(customer.cname);
              }}
            >
              <EyeIcon />
            </Button>
          </Stack>
        </>
      );
    },
  },
];
