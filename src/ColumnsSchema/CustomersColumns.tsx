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
  ArrowUpDown
} from "lucide-react";
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
        <div className="
        ">
          <Button
            variant="ghost"
            className="px-0 
            text-left          
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
    header: () => <div className="text-left">Customer Names</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cname")}</div>
    ),
  },
  {
    accessorKey: "cphone_number",
    header: ({ column }) => {
      return (
        <div className="text-left w-10  ">
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
    header: () => <div className="text-left">Address</div>,
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
    header: () => <div className="text-left">Actions</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isLoading, setIsLoading] = React.useState(true); // Loading state
      const customer = row.original;
      const [invoicedata, setInvoicedata] = React.useState({
        data: {
          cid: {
            cname: "",
            cphone_number: "",
            bottle_price: 0,
          },
        },
        total_bottles: 0,
        shorturl: "",
      }); // Invoice Data

      return (
        <>
          <div className="flex gap-x-2">
            <Editcustomer id={customer._id} />
            <DeleteCustomer cid={customer._id} />
            <GetInvoice cid={customer._id} />

            {/* <div className="cursor-pointer w-5 h-5">
                  <Sheet>
                    <SheetTrigger
                      onClick={async () => {
                        setIsLoading(true); // Start loading
                        const response = await fetch(
                          `${DOMAIN_NAME}/api/customerentry/getallcustomerentry/${customer._id}`,
                          {
                            method: "GET",
                            headers: {
                              authorization:
                                "Bearer " + localStorage.getItem("token"),
                            },
                          }
                        );

                        const data = await response.json();
                        setCustomerentrydetails(data.data);
                        setIsLoading(false); // End loading
                      }}
                    >
                      <EyeIcon strokeWidth={3} />
                    </SheetTrigger>
                    <SheetContent className="p-4  w-auto h-auto overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Customer Details</SheetTitle>
                        <SheetDescription>
                          <div className="text-left">
                            <div className="flex justify-between">
                              <div className="font-medium">Name</div>
                              <div className="font-light">{customer.cname}</div>
                            </div>
                            <div className="flex justify-between">
                              <div className="font-medium">Phone Number</div>
                              <div className="font-light">
                                {customer.cphone_number}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div className="font-medium">Address</div>
                              <div className="font-light">
                                {customer.caddress}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div className="font-medium">Bottle Price</div>
                              <div className="font-light">
                                {customer.bottle_price}
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div className="font-medium">Sequence Number</div>
                              <div className="font-light">
                                {customer.delivery_sequence_number}
                              </div>
                            </div>
                          </div>
                          <div className="ml-auto flex items-center gap-2 float-start m-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1"
                              onClick={() => {
                                sendinvoicelink();
                              }}
                            >
                              <File className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Send Invoice Link
                              </span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1"
                              onClick={() => {
                                handleprint();
                              }}
                            >
                              <PlusCircle className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Generate Invoice
                              </span>
                            </Button>
                          </div>
                          <div
                            className="items-center float-start"
                            id="datatable1"
                          >
                            <DataTable
                              columns={columns1}
                              data={customerentrydetails}
                            />
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
              </div> */}
          </div>
          {/* <div className="hidden">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="loader">Loading</div>{" "}
                  Add your loader component or spinner here
                </div>
              ) : (
                <Invoice ref={componentRef} c_id={customer._id} />
              )}
            </div> */}
        </>
      );
    },
  },
];
