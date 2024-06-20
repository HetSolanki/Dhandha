import { File, ListFilter, PlusCircle, Send } from "lucide-react";
import { Button } from "@/Components/UI/shadcn-UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/UI/shadcn-UI/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/UI/shadcn-UI/dropdown-menu";

import {
  Tabs,
  TabsContent,
  // TabsList,
  // TabsTrigger,
} from "@/Components/UI/shadcn-UI/tabs";
import {
  // Tooltip,
  // TooltipContent,
  // TooltipTrigger,
  TooltipProvider,
} from "@/Components/UI/shadcn-UI/tooltip";
import Navbar from "./Navbar";
import { Addcustomer } from "../UI/UI-Components/Addcustomer";
import { DataTable } from "../UI/shadcn-UI/DataTable";
import { columns } from "../../ColumnsSchema/CustomersColumns";
// import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "@/Hooks/fetchAllCustomers";
import { useCustomer } from "@/Context/CustomerContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import { createPaymentLinkAll } from "@/Handlers/CreatePaymentLinkAll";

const Customers = () => {
  const { customer } = useCustomer();

  const customers = useQuery({
    queryKey: ["customers", customer],
    queryFn: fetchCustomers,
  });

  const handlesendinvoice = async () => {
    // const date = new Date(Date.now()).toISOString().split("T")[0];

    // let sortedCustomers = [];
    // const token = localStorage.getItem("token");
    // const customers = await fetch(
    //   `http://localhost:3001/api/customerentry/getallcustomerentrys/`,
    //   {
    //     method: "GET",
    //     headers: {
    //       authorization: "Bearer " + token,
    //     },
    //   }
    // );
    // const res = await customers.json();
    // if (res.status === "success") {
    //   const currentMonth = new Date().getMonth();
    //   console.log(currentMonth);
    //   const currentYear = new Date().getFullYear();
    //   // const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    //   const selectedCustomers = res.data.filter((customer) => {
    //     const deliveryDate = new Date(customer.delivery_date);
    //     return (
    //       deliveryDate.getMonth() === currentMonth &&
    //       deliveryDate.getFullYear() === currentYear
    //     );
    //   });

    //   sortedCustomers = selectedCustomers.sort(
    //     (a, b) => new Date(a.delivery_date) - new Date(b.delivery_date)
    //   );

    //   console.log(sortedCustomers);
    // } else {
    //   console.log(res);
    // }

    // const generatePaymentLinks = () => {
    //   sortedCustomers.forEach((customer) => {
    //     const { cid, bottle_count} = customer;
    //    console.log(cid, bottle_count);
    //     console.log(paymentLink);
    //   });
    // };

    alert("Send Invoice to All Customers");

    const paymentLink = await createPaymentLinkAll();
    console.log(paymentLink);
  };

  return (
    <>
      <Navbar />
      {customers.isLoading && (
        <div
          className="
        flex
        items-center
        justify-center
        min-h-screen
        mx-auto
        w-screen
        flex-col
        bg-muted/40
        "
        >
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
          />
        </div>
      )}
      {!customers.isLoading && (
        <div className="flex min-h-screen mx-auto w-screen flex-col bg-muted/40">
          <TooltipProvider>
            <div className="flex flex-col sm:gap-4 sm:py-4">
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                  <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                      <CardHeader>
                        <CardTitle>
                          Customers
                          <div className="ml-auto flex items-center gap-2 float-end">
                            <Button
                              size="sm"
                              className="h-8 gap-1"
                              onClick={handlesendinvoice}
                            >
                              <Send className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Send Invoice to All Customers
                              </span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 gap-1"
                                >
                                  <ListFilter className="h-3.5 w-3.5" />
                                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filter
                                  </span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                  Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                  Draft
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                  Archived
                                </DropdownMenuCheckboxItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1"
                            >
                              <File className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                              </span>
                            </Button>
                            <Addcustomer />
                          </div>
                        </CardTitle>
                        <CardDescription>
                          Manage your customers and view their sales
                          performance.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DataTable
                          data={customers?.data?.data}
                          columns={columns}
                        />
                      </CardContent>
                      <CardFooter>
                        <div className="text-xs text-muted-foreground">
                          Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                          customers
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </main>
            </div>
          </TooltipProvider>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Customers;
