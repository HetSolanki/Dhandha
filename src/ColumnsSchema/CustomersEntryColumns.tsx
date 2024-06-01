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
import { addcustomerEntry } from "../Handlers/AddcustomerEntryHandler"
import { Input } from "@/Components/UI/shadcn-UI/input";
import '../index.css'

export type Customer = {
  cname: string;
  cphone_number: number;
  caddress: string;
  bottle_price: number;
  id: number;
  no_of_bottle: number;
  delivery_sequence_number: number;
};

const handleEntry = async (customer) => {
  const no_of_bottles = document.getElementById(customer._id);
  if (no_of_bottles.value !== "") {
    if (parseInt(no_of_bottles.value) > 0) {
      const newEntry = await addcustomerEntry({
        cid: customer._id,
        no_of_bottles: parseInt(no_of_bottles.value),
        delivery_status: "Presenet",
      });

      if (newEntry.status === "success") {
        alert("Entry added successfully");
      }
      else {
        alert("Entry could not be added");
      }

    } else {
      no_of_bottles.value = 0;
    }
  } else {
    alert("Please enter the quantity");
    no_of_bottles.value = 0;
  }
};
const handleAbsentEntry = async (customer) => {
  const no_of_bottles = document.getElementById(customer._id);
  const newEntry = await addcustomerEntry({
    cid: customer._id,
    no_of_bottles: 0,
    delivery_status: "Absent",
  });

  if (newEntry.status === "success") {
    alert("Absent Entry added successfully");
  }
  else {
    alert("Entry could not be added");
  }
};



export const columns: ColumnDef<Customer>[] = [
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
            Sr
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-left">
        {row.getValue("delivery_sequence_number")}
      </div>
    ),
  },
  {
    accessorKey: "cname",
    header: () => <div className="text-left">Customer Name</div>,
    cell: ({ row }) => (
      <div className="capitalize text-left">{row.getValue("cname")}</div>
    ),
  },
  {
    accessorKey: "caddress",
    header: () => <div className="text-left">Address</div>,
    cell: ({ row }) => {
      return (
        <div className="lowercase text-left">{row.getValue("caddress")}</div>
      );
    },
  },
  {
    accessorKey: "bottle_price",
    header: () => <div className="text-left">Bottle Price</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          <TextField
            variant="outlined"
            size="small"
            type="text"
            value={row.getValue("bottle_price")}
            className="w-20 text-center"
            disabled
          />
        </div>
      );
    },
  },
  {
    header: () => {
      return <div className="text-left pl-7">Quantity</div>;
    },
    accessorKey: "no_of_bottle",
    id: "no_of_bottle",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <>
          <div className="flex items-center justify-start space-x-1">
            <div
              className="cursor-pointer"
              onClick={() => {
                const no_of_bottles = document.getElementById(customer._id);
                if (no_of_bottles.value === "") {
                  no_of_bottles.value = 0;
                }
                no_of_bottles.value = parseInt(no_of_bottles.value) - 1;
                if (parseInt(no_of_bottles.value) < 0) {
                  no_of_bottles.value = 0;
                }
              }
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <Input
              id={customer._id}
              className="w-14 remove-arrow"
              type="number"
              step={1}
            />

            <div
              className="cursor-pointer"
              onClick={() => {
                const no_of_bottles = document.getElementById(customer._id);
                if (no_of_bottles.value === "") {
                  no_of_bottles.value = 0;
                }
                no_of_bottles.value = parseInt(no_of_bottles.value) + 1;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clipRule="evenodd"
                />
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
            <Button size="icon" className="h-8 gap-1"
              onClick={() => {
                handleAbsentEntry(customer);
              }}
            >
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
