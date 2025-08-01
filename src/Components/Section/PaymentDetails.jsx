import { DataTable } from "@/Components/DataTables/PaymentDetailDatatable";
import { columns } from "@/ColumnsSchema/PaymentDetailsColumns";
import Navbar from "./Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/Components/UI/shadcn-UI/card";
import { Button } from "../UI/shadcn-UI/button";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "@/Context/ThemeProviderContext ";

const DOMAIN_NAME = import.meta.env.VITE_API_BASE_URL;

export default function PaymentDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const {theme} = useTheme();
  useEffect(() => {
    fetchpaymentdata();
    if (!fetchpaymentdata) {
      alert("No Data Found");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchpaymentdata = async () => {
    const paymentdata = await fetch(
      `${DOMAIN_NAME}/api/customerentry/customersforpayment`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res = await paymentdata.json();
    // console.log(res.message);
    setData(res.message);
    if (res.status === "success") {
      return res.data;
    } else {
 return [];
    }
  };

  const transformedpaymentdata = data?.map((customer, index) => ({
    _id: customer?.cid,
    id: index + 1,
    cname: customer?.customer?.cname,
    cphone_number: customer?.customer?.cphone_number,
    caddress: customer?.customer?.caddress,
    totalamount: customer?.totalBottle * customer?.customer?.bottle_price,
  }));

  // console.log(transformedpaymentdata);

  const getintialdata = async () => {
    const token = localStorage.getItem("token");
    const entrys = await fetch(
      `${DOMAIN_NAME}/api/paymentdetails/getAllPaymentEntrys`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const res = await entrys.json();
    if (res.status === "success") {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const thisMonthCustomers = res.data.filter((customer) => {
        const PaymentDate = new Date(customer.payment_date);
        return (
          PaymentDate.getMonth() === currentMonth &&
          PaymentDate.getFullYear() === currentYear
        );
      });

       return thisMonthCustomers;
    } else {
     return [];
    }
  };

  const handleNavigate = async () => {
    const data = getintialdata();
  
    const paymentdata = await data;
    console.log(paymentdata);

    if (paymentdata.length === 0) {
      alert("No Data Found");
    }
    else{ 
      navigate("/paymentsdata", { state: await data });
    }
  };

  return (
    <>
    <SkeletonTheme
      baseColor={`${theme === "dark" ? "#1c1c1c" : ""}`}
      highlightColor={`${theme === "dark" ? "#525252" : ""}`}
    >
      <div>
        <Navbar />
        <div className="p-2 py-4 sm:p-8">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            {transformedpaymentdata.length ? (
              <CardHeader className="flex flex-row items-center px-4 sm:p-6">
                <div className="grid gap-2">
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>
                    View all the payments made by customers
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  className="ml-auto gap-1"
                  onClick={handleNavigate}
                >
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </CardHeader>
            ) : (
              <div className="mt-4 py-3 px-4">
                <Skeleton className="h-[90px]" enableAnimation={true} />
              </div>
            )}
            {transformedpaymentdata.length ? (
              <CardContent className="px-3 sm:p-6">
                {transformedpaymentdata.length && (
                  <DataTable data={transformedpaymentdata} columns={columns} />
                )}
              </CardContent>
            ) : (
              <div className="py-3 px-4 mb-4">
                <Skeleton className="h-[300px]" enableAnimation={true} />
              </div>
            )}
          </Card>
        </div>
      </div>
      <ToastContainer />
      </SkeletonTheme>
    </>
  );
}
