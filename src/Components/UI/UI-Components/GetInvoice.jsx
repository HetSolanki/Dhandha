/* eslint-disable react/prop-types */
import { EyeIcon } from "lucide-react";
import {
  Sheet,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
  SheetContent,
  SheetHeader,
} from "../shadcn-UI/sheet";
import { DataTable } from "@/Components/DataTables/customerviewDatatable";
import { useState } from "react";
import { columns1 } from "@/ColumnsSchema/CustomerssheetColums";
import { fetchCustomerEnteries } from "@/Hooks/fetchCustomerEnteries";
import { fetchCustomer } from "@/Hooks/fetchCustomer";
import { InvoiceX } from "@/Components/Section/Invoicex";
import Skeleton from "react-loading-skeleton";

export default function GetInvoice({ cid }) {
  const [customerEntry, setCustomerEntry] = useState(null);
  const [customer, setCustomer] = useState(null);

  // const componentRef = useRef();

  // const sendinvoicelink = async () => {
  //   alert("Sending Invoice Link");
  //   console.log(invoicedata);
  //   const cname = invoicedata.data.cid.cname;
  //   const cphone_number = invoicedata.data.cid.cphone_number;
  //   const amount =
  //     invoicedata.data.cid.bottle_price * invoicedata.total_bottles;
  //   console.log(amount, cname, cphone_number);
  //   const data = {
  //     amount: amount,
  //     description: "Payment for Bottles",
  //     customer_name: cname,
  //     customer_phone: cphone_number,
  //     customer_email: "",
  //     smsnotify: true,
  //     emailnotify: false,
  //     reminder_enable: false,
  //   };
  //   const newpaymentlink = await createPaymentLink(data);

  //   if (newpaymentlink.status === "success") {
  //     alert("Payment Link Created");
  //     console.log(newpaymentlink);
  //     console.log(newpaymentlink.data.short_url);

  //     setInvoicedata({
  //       // data: {
  //       //   cid: {
  //       //     cname: cname,
  //       //     cphone_number: cphone_number,
  //       //     bottle_price: amount,
  //       //   },
  //       // },
  //       // total_bottles: invoicedata.total_bottles,
  //       data: invoicedata,
  //       shorturl: newpaymentlink.data.short_url,
  //     });
  //   } else {
  //     console.log(newpaymentlink);
  //   }
  // };

  // const handleprint = useReactToPrint({
  //   content: () => componentRef.current,
  //   onBeforeGetContent: () => {
  //     console.log(invoicedata);
  //     alert("Content will Load now");
  //     // setLoadinvoice(true);
  //   },
  //   onBeforePrint() {
  //     alert("Printing will start now");
  //   },
  //   onAfterPrint() {
  //     alert("Printing is done");
  //   },
  //   // pageStyle: "@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",
  // });

  return (
    <div className="cursor-pointer w-5 h-5">
      <Sheet>
        <SheetTrigger
          onClick={async () => {
            const customerEntryRes = await fetchCustomerEnteries(cid);
            setCustomerEntry(customerEntryRes.data);
            const customerRes = await fetchCustomer({ queryKey: ["", cid] });
            setCustomer(customerRes.data);
          }}
        >
          <EyeIcon strokeWidth={3} />
        </SheetTrigger>
        <SheetContent className="p-6 w-full">
          <SheetHeader>
            {customer ? (
              <div>
                <SheetTitle>Customer Details</SheetTitle>
                <SheetDescription>
                  <div className="text-left">
                    <div className="flex justify-between">
                      <div className="font-medium">Name</div>
                      <div className="font-light">{customer?.cname}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-medium">Phone Number</div>
                      <div className="font-light">
                        {customer?.cphone_number}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-medium">Address</div>
                      <div className="font-light">{customer?.caddress}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-medium">Bottle Price</div>
                      <div className="font-light">{customer?.bottle_price}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-medium">Sequence Number</div>
                      <div className="font-light">
                        {customer?.delivery_sequence_number}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2 float-start m-3">
                    <InvoiceX cid={cid} />
                    {/* <Button
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
                </Button> */}
                    {/* <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={() => {
                    // handleprint();
                    alert("Printing");
                    
                  }}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Generate Invoice
                  </span>
                </Button> */}
                    {/* <PDFDownloadLink  document={<Invoicex />} fileName="invoice">
                  {
                    ({loading}) => (loading ? <button>Loading....</button> : <Button >Download</Button>)
                  }
                </PDFDownloadLink> */}
                  </div>
                </SheetDescription>
              </div>
            ) : (
              <div className="mt-4">
                <Skeleton className="h-[90px] w-full" enableAnimation={true} />
              </div>
            )}

            <div className="items-center float-start" id="datatable1">
              {customerEntry ? (
                <DataTable columns={columns1} data={customerEntry} />
              ) : (
                <div className="mb-4">
                  <Skeleton className="h-[300px]" enableAnimation={true} />
                </div>
              )}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
