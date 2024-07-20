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
import { ArrowUpDown, EyeIcon, File, MoreHorizontal, PlusCircle } from "lucide-react";
import { columns1 } from "@/ColumnsSchema/CustomersEntryDataColums"
import { Button } from "../Components/UI/shadcn-UI/button";
import { Editcustomer } from "@/Components/UI/UI-Components/Editcustomer";
import DeleteCustomer from "@/Components/UI/UI-Components/DeleteCustomer";
import { DataTable } from "@/Components/UI/shadcn-UI/DataTable";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/UI/shadcn-UI/sheet";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "@/Components/Section/Invoice";
import InvoiceDataContext from "@/Context/InvoiceDataContext";
import { createPaymentLink } from "@/Handlers/CreatepaymentLinkHandler";

export type Customer = {
  _id: number;
  id: number;
  cname: string;
  cphone_number: number;
  caddress: string;
  bottle_price: number;
  delivery_sequence_number: number;
};

export const columns: ColumnDef<Customer>[] = [
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
      <div className="lowercase text-left ">
        {row.getValue("delivery_sequence_number")}
      </div>
    ),
  },
  {
    header: () => <div className="text-left">Actions</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isLoading, setIsLoading] = React.useState(true);  // Loading state
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
      const [customerentrydetails, setCustomerentrydetails] = React.useState([]);
      // const navigate = useNavigate();
      const componentRef = useRef();

      const sendinvoicelink = async () => {
        alert("Sending Invoice Link");
        console.log(invoicedata);
        const cname = invoicedata.data.cid.cname
        const cphone_number = invoicedata.data.cid.cphone_number
        const amount = invoicedata.data.cid.bottle_price * invoicedata.total_bottles;
        console.log(amount, cname, cphone_number)
        const data = {
          amount: amount,
          description: "Payment for Bottles",
          customer_name: cname,
          customer_phone: cphone_number,
          customer_email: "",
          smsnotify: true,
          emailnotify: false,
          reminder_enable: false
        };
        const newpaymentlink = await createPaymentLink(data);

        if (newpaymentlink.status === "success") {
          alert("Payment Link Created");
          console.log(newpaymentlink);
          console.log(newpaymentlink.data.short_url);
          setInvoicedata(
            {
              data: {
                cid: {
                  cname: cname,
                  cphone_number: cphone_number,
                  bottle_price: amount,
                },
              },
              total_bottles: invoicedata.total_bottles,
              shorturl: newpaymentlink.data.short_url,
            }
          )
        } else {
          console.log(newpaymentlink);
        }
      };

      const handleprint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => {
          console.log(invoicedata);
          alert("Content will Load now");
          // setLoadinvoice(true);
        },
        onBeforePrint() {
          alert("Printing will start now");
        },
        onAfterPrint() {
          alert("Printing is done");

        },
        // pageStyle: "@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",

      });
      return (
        <>
          <InvoiceDataContext.Provider value={{ invoicedata, setInvoicedata }}>
            <div className="flex gap-x-3">
              <Editcustomer id={customer._id} />
              <DeleteCustomer cid={customer._id} />
              <div className="cursor-pointer w-5 h-5" >
                <Sheet>
                  <SheetTrigger onClick={
                    async () => {
                      setIsLoading(true);  // Start loading
                      const response = await fetch(`http://localhost:3001/api/customerentry/getallcustomerentry/${customer._id}`, {
                        method: "GET",
                        headers: {
                          authorization: "Bearer " + localStorage.getItem("token"),
                        },
                      });

                      const data = await response.json();
                      setCustomerentrydetails(data.data);
                      setIsLoading(false);  // End loading
                    }
                  }><EyeIcon strokeWidth={3} /></SheetTrigger>
                  <SheetContent
                    className="p-4  w-auto h-auto overflow-y-auto"
                  >
                    <SheetHeader>
                      <SheetTitle>
                        Customer Details
                      </SheetTitle>
                      <SheetDescription>
                        <div className="text-left">
                          <div className="flex justify-between">
                            <div className="font-medium">Name</div>
                            <div className="font-light">{customer.cname}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-medium">Phone Number</div>
                            <div className="font-light">{customer.cphone_number}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-medium">Address</div>
                            <div className="font-light">{customer.caddress}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-medium">Bottle Price</div>
                            <div className="font-light">{customer.bottle_price}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="font-medium">Sequence Number</div>
                            <div className="font-light">{customer.delivery_sequence_number}</div>
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
                        <div className="items-center float-start" id="datatable1">
                          <DataTable columns={columns1} data={customerentrydetails} />
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div >
            </div>
            <div className="hidden">

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="loader">Loading</div> {/* Add your loader component or spinner here */}
                </div>
              ) : (<Invoice ref={componentRef} c_id={customer._id} />
              )}

            </div>
          </InvoiceDataContext.Provider>
        </>
      );
    },
  },
];
