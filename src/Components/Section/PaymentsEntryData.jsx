import { File, ListFilter } from "lucide-react";
import { Button } from "@/Components/UI/shadcn-UI/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Tabs, TabsContent } from "@/Components/UI/shadcn-UI/tabs";
import { TooltipProvider } from "@/Components/UI/shadcn-UI/tooltip";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { DataTable } from "@/Components/DataTables/PaymentEntryDatatable";
import { columns1 } from "@/ColumnsSchema/PaymentsEntryDataColumns";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const PaymentsEntryData = () => {
  const location = useLocation();
  const intialdata = location.state;
  const navigate = useNavigate();
  const [paymentEntrys, setPaymentEntrys] = useState([...intialdata]);

  useEffect(() => {
    if (intialdata === undefined || intialdata.length === 0) {
      navigate("/paymentdetails");
    }
  }, [intialdata, navigate]);
  // const [presentcheck, setPresentcheck] = useState(false);
  // const [absentcheck, setAbsentcheck] = useState(false);
  // console.log(customers);
  // const getallfilteredcustomers = (option) => {
  //   if (option === "Absent") {
  //     const absentcustomers = customers.filter((customer) => {
  //       return customer.delivery_status === "Absent";
  //     });

  //     setCustomers(absentcustomers);
  //     return;
  //   }

  //   if (option === "Present") {
  //     const presentcustomers = customers.filter((customer) => {
  //       return customer.delivery_status === "Present";
  //     });

  //     setCustomers(presentcustomers);
  //     return;
  //   }

  //   if (option === "All") {
  //     setCustomers(customers);
  //     return;
  //   }

  //   return;
  // };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen mx-auto w-screen flex-col bg-muted/40">
        <TooltipProvider>
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <Tabs defaultValue="all">
                <TabsContent value="all">
                  <Card x-chunk="dashboard-06-chunk-0">
                    {paymentEntrys.length ? (
                      <CardHeader>
                        <CardTitle className="flex-col sm:flex-row sm:flex sm:items-center sm:justify-between"><span
                            className="
                            text-xl
                            font-semibold
                            text-primary
                            sm:text-2xl"
                          >
                          Payment Entry Data
                          </span>
                          <div className=" flex mt-5 sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
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
                                <DropdownMenuCheckboxItem
                                  // checked={presentcheck}
                                  onClick={() => {
                                    // setPresentcheck(!presentcheck);
                                    // if (!presentcheck === true) {
                                    //   getallfilteredcustomers("Present");
                                    // }
                                    // else{
                                    //   getallfilteredcustomers("All");
                                    // }
                                  }}
                                >
                                  Present
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                  // checked={absentcheck}
                                  onClick={() => {
                                    // setAbsentcheck(!absentcheck);
                                    // if (!absentcheck === true) {
                                    //   getallfilteredcustomers("Absent");
                                    // }else{
                                    //   getallfilteredcustomers("All");
                                    // }
                                    console.log("Absent");
                                  }}
                                >
                                  Absent
                                </DropdownMenuCheckboxItem>
                                {/* <DropdownMenuCheckboxItem>
                                Archived
                              </DropdownMenuCheckboxItem> */}
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
                              <span
                                onClick={() => {
                                  navigate("/paymentdetails");
                                }}
                              > 
                                  <Button size="sm" className="h-8 gap-1">
                                Back to Entry
                            </Button>
                              </span>
                          </div>
                        </CardTitle>
                        <CardDescription className="hidden sm:block">
                          <div className=" mt-4 flex items-center gap-1 float-end">
                            {/* <DatePickerForm /> */}
                          </div>
                          List of all the customers and their entries
                        </CardDescription>
                      </CardHeader>
                    ) : (
                      <div className="mt-4 py-3 px-4">
                        <Skeleton className="h-[90px]" enableAnimation={true} />
                      </div>
                    )}

                    {paymentEntrys.length ? (
                      <CardContent>
                        <DataTable data={paymentEntrys} columns={columns1} />
                      </CardContent>
                    ) : (
                      <div className="py-3 px-4 mb-4">
                        <Skeleton
                          className="h-[300px]"
                          enableAnimation={true}
                        />
                      </div>
                    )}

                    {/* <CardFooter>
                      <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                        customers
                      </div>
                    </CardFooter> */}
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </TooltipProvider>
        <ToastContainer />
      </div>
    </>
  );
};

export default PaymentsEntryData;
