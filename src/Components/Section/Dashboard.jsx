import { CreditCard, Users } from "lucide-react";
// import { Badge } from "@/Components/UI/shadcn-UI/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/UI/shadcn-UI/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/Components/UI/shadcn-UI/table";
import { DataTable } from "@/Components/DataTables/ToprevenueDataTable";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { CurrencyRupee, Money } from "@mui/icons-material";
import { GetdashboardData } from "@/Handlers/GetdashboardData";
import { columns } from "@/ColumnsSchema/DashboardColumns";
import Skeleton from "react-loading-skeleton";

export function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  // const [data, setData] = useState({});
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    GetdashboardData().then((data) => {
      setData(data);
    });
  }, [navigate]);

  // console.log(data);

  const transformedTopCustomers =
    data?.topCustomers?.map((customer, index) => ({
      _id: customer.cid,
      id: index + 1,
      cname: customer.customerDetails.cname,
      cphone_number: customer.customerDetails.cphone_number,
      bottle_price: customer.customerDetails.bottle_price,
      totalRevenue: customer.totalRevenue,
    })) || [];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {data ? (
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <CurrencyRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{data?.totalRevenue}</div>
                <p className="text-xs text-muted-foreground">
                  {/* +20.1% from last month */}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="">
              <Skeleton
                className="h-[130px] w-full rounded-md"
                enableAnimation={true}
              />
            </div>
          )}

          {data ? (
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Customers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.totalCustomerData}
                </div>
                <p className="text-xs text-muted-foreground">
                  {/* +10% from last month */}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="">
              <Skeleton
                className="h-[130px] md:h-full w-full rounded-md"
                enableAnimation={true}
              />
            </div>
          )}

          {data ? (
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <Money className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{data?.totalRevenue}</div>
                <p className="text-xs text-muted-foreground">
                  {/* +19% from last month */}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="">
              <Skeleton
                className="h-[130px] w-full rounded-md"
                enableAnimation={true}
              />
            </div>
          )}

          {data ? (
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Due</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{data?.totalDueAmount}
                </div>
                <p className="text-xs text-muted-foreground">
                  {/* +5% from last month */}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="">
              <Skeleton
                className="h-[130px] md:h-full w-full rounded-md"
                enableAnimation={true}
              />
            </div>
          )}
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {data ? (
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Top Revenue Customers</CardTitle>
                  <CardDescription>
                    Top 5 customers with the highest revenue
                  </CardDescription>
                </div>
                {/* <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button> */}
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={transformedTopCustomers} />
              </CardContent>
            </Card>
          ) : (
            <div className="xl:col-span-2">
              <Skeleton
                className="h-[350px] w-full rounded-md"
                enableAnimation={true}
              />
            </div>
          )}

          <div className="space-y-5">
            {data ? (
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Payment Details
                  </CardTitle>
                  <CurrencyRupee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.pendingPaymentCustomersCount}/
                    {data?.totalCustomerData}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {/* +20.1% from last month */}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div>
                <Skeleton
                  className="h-[130px] w-full rounded-md"
                  enableAnimation={true}
                />
              </div>
            )}

            {data ? (
              <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                  <CardTitle>Due Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  {data?.pendingPaymentCustomers.length != 0 ? data?.pendingPaymentCustomers?.map((customer, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center justify-between"
                    >
                      <div className="flex flex-row items-center gap-4">
                        <div>
                          <p className="text-sm font-medium">
                            {customer.customerDetails.cname}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {customer.customerDetails.cphone_number}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ₹{customer.totalDue}
                      </div>
                    </div>
                  )) : 
                  <div>
                     <div className="flex flex-row items-center gap-4">
                      No Due Payment
                     </div>
                  </div>}
                </CardContent>
              </Card>
            ) : (
              <div>
                <Skeleton
                  className="h-[130px] w-full rounded-md"
                  enableAnimation={true}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
