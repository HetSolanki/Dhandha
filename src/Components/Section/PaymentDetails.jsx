import { useCustomer } from "@/Context/CustomerContext";
import { DataTable } from "../UI/shadcn-UI/DataTable";
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
// import { useState } from "react";

const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export default function PaymentDetails() {
  const navigate = useNavigate();
  const { customer } = useCustomer();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchpaymentdata();
  }, []);

  const fetchpaymentdata = async () => {
    const paymentdata = await fetch(
      `${DOMAIN_NAME}/api/customerentry/customersforpayment`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const res = await paymentdata.json();
    setData(res.message);
    console.log(res.message);
    if (res.status === "success") {
      return res.data;
    } else {
      console.log(res);
    }
  };
  const transformedpaymentdata = data.map((customer, index) => ({
    _id: customer.cid,
    id: index + 1,
    cname: customer.customer.cname,
    cphone_number: customer.customer.cphone_number,
    caddress: customer.customer.caddress,
    totalamount: customer.totalBottle * customer.customer.bottle_price,
  }));

  const getintialdata = async () => {
    alert(new Date(Date.now()).toISOString().split("T")[0]);
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
      
      console.log(thisMonthCustomers);
      return thisMonthCustomers;
    } else {
      console.log(res);
    }
  };
  

  const handleNavigate = async () => {
    const data = getintialdata();
    console.log(await data)
    navigate("/paymentsdata",  { state: await data});
  };

  return (
    <>
    <div>
      <Navbar />
      <div className="p-8">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
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
          <CardContent>
            {customer && <DataTable data={transformedpaymentdata} columns={columns} />}
          </CardContent>
        </Card>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}
