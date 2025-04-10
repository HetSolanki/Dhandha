import { File } from "lucide-react";
import { Button } from "@/Components/UI/shadcn-UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/UI/shadcn-UI/card";
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
import { DataTable } from "@/Components/DataTables/CustomerDataTable";
import InvoiceAll from "./InvoiceAll";
import ReportPDFGenarator from "./ReportPDFGenarator";

// Schemas and hooks
import { columns } from "../../ColumnsSchema/CustomersColumns";
import { fetchCustomers } from "@/Hooks/fetchAllCustomers";
import { useCustomer } from "@/Context/CustomerContext";
import { useUser } from "@/Context/UserContext";
import { useTheme } from "@/Context/ThemeProviderContext ";

// Assets
import logo from "@/assets/paniwalalogo.png";

const Customers = () => {
  const navigate = useNavigate();
  const { customer } = useCustomer();
  const { user } = useUser();
  const { theme } = useTheme();

  // Authentication check
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch customers data
  const { data: customersData, isLoading } = useQuery({
    queryKey: ["customers", customer],
    queryFn: fetchCustomers,
  });

  // Prepare data for PDF export
  const pdfData = customersData?.data?.map((customer) => ({
    delivery_sequence_number: customer.delivery_sequence_number,
    cname: customer.cname,
    cphone_number: customer.cphone_number,
    caddress: customer.caddress,
    bottle_price: customer.bottle_price,
  })) || [];

  const pdfColumns = [
    {
      header: "Sequence Number",
      accessorKey: "delivery_sequence_number",
    },
    {
      header: "Customer Name", 
      accessorKey: "cname",
    },
    {
      header: "Phone Number",
      accessorKey: "cphone_number", 
    },
    {
      header: "Address",
      accessorKey: "caddress",
    },
    {
      header: "Bottle Price",
      accessorKey: "bottle_price",
    },
  ];

  return (
    <>
      <SkeletonTheme
        baseColor={theme === "dark" ? "#1c1c1c" : ""}
        highlightColor={theme === "dark" ? "#525252" : ""}
      >
        <Navbar />
        <div className="flex min-h-screen mx-auto flex-col bg-muted/40">
          <TooltipProvider>
            <div className="flex flex-col sm:gap-4 sm:py-4">
              <main className="grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                  <TabsContent value="all">
                    <Card>
                      {!isLoading ? (
                        <CardHeader className="px-2 sm:px-4">
                          <CardTitle className="flex-col pt-4 px-2 sm:flex-row sm:flex sm:items-center sm:justify-between">
                            <span className="text-xl font-semibold text-primary sm:text-2xl align-bottom">
                              Customers
                            </span>
                            <div className="mt-4 sm:mt-0 flex sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                              <InvoiceAll />
                              {pdfData.length > 0 && (
                                <PDFDownloadLink
                                  document={
                                    <ReportPDFGenarator
                                      data={pdfData}
                                      columns={pdfColumns}
                                      table_name="Customer Data"
                                      shop_name={user?.shop_name || ""}
                                      logo={logo}
                                    />
                                  }
                                  fileName="customers_data.pdf"
                                >
                                  {({ loading }) => (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-8 gap-1"
                                      disabled={loading}
                                    >
                                      <File className="h-3.5 w-3.5" />
                                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export
                                      </span>
                                    </Button>
                                  )}
                                </PDFDownloadLink>
                              )}
                              <Addcustomer />
                            </div>
                          </CardTitle>
                          <CardDescription className="hidden sm:block px-2">
                            Manage your customers and view their sales performance.
                          </CardDescription>
                        </CardHeader>
                      ) : (
                        <div className="mt-4 py-3 px-4">
                          <Skeleton className="h-[90px]" enableAnimation={true} />
                        </div>
                      )}

                      <CardContent className="py-3 px-2 sm:px-4">
                        {!isLoading ? (
                          <DataTable
                            data={customersData?.data || []}
                            columns={columns}
                          />
                        ) : (
                          <div className="mb-4">
                            <Skeleton className="h-[300px]" enableAnimation={true} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </main>
            </div>
          </TooltipProvider>
          <ToastContainer />
        </div>
      </SkeletonTheme>
    </>
  );
};

export default Customers;
