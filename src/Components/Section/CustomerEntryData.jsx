import { File, ListFilter } from "lucide-react";
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
import { Tabs, TabsContent } from "@/Components/UI/shadcn-UI/tabs";
import { TooltipProvider } from "@/Components/UI/shadcn-UI/tooltip";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePickerForm } from "../UI/UI-Components/Datepicker";
import { useState } from "react";
import { DataTable } from "../UI/shadcn-UI/DataTable";
import { columns1 } from "@/ColumnsSchema/CustomersEntryDataColums";
import CustomerEntryContext from "@/Context/CustomerEntryContext";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerEntryData = () => {
  const location = useLocation();
  const intialdata = location.state;
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([...intialdata]);
  console.log(customers);
  const getallfilteredcustomers = (option) => {
    if (option === "Absent") {
      const absentcustomers = customers.filter((customer) => {
        return customer.delivery_status === "Absent";
      });

      setCustomers(absentcustomers);
      return;
    }

    if (option === "Present") {
      const presentcustomers = customers.filter((customer) => {
        return customer.delivery_status === "Present";
      });

      setCustomers(presentcustomers);
      return;
    }
  };

  return (
    <>
      <CustomerEntryContext.Provider value={{ customers, setCustomers }}>
        <Navbar />
        <div className="flex min-h-screen mx-auto w-screen flex-col bg-muted/40">
          <TooltipProvider>
            <div className="flex flex-col sm:gap-4 sm:py-4">
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                  <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                      <CardHeader>
                        <CardTitle>
                          Customers Entry Data
                          <div className="ml-auto flex items-center gap-2 float-end">
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
                                  onClick={() => {
                                    getallfilteredcustomers("Present");
                                  }}
                                >
                                  Present
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                  onClick={() => {
                                    getallfilteredcustomers("Absent");
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
                            <Button size="sm" className="h-8 gap-1">
                              <span
                                className="sr-only sm:not-sr-only sm:whitespace-nowrap"
                                onClick={() => {
                                  navigate("/customerentry");
                                }}
                              >
                                Back to Entry
                              </span>
                            </Button>
                          </div>
                        </CardTitle>
                        <CardDescription>
                          <div className=" mt-4 flex items-center gap-1 float-end">
                            <DatePickerForm />
                          </div>
                          List of all the customers and their entries
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DataTable data={customers} columns={columns1} />
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
      </CustomerEntryContext.Provider>
    </>
  );
};

export default CustomerEntryData;
