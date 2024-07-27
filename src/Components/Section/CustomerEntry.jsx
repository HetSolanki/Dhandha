import { useCustomer } from "@/Context/CustomerContext";
import { DataTable } from "@/Components/DataTables/CustomerEntryDatatable";
import { columns } from "@/ColumnsSchema/CustomersEntryColumns";
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
import { useState } from "react";

const DOMAIN_NAME = import.meta.env.VITE_DOMAIN_NAME;

export default function CustomerEntry() {
  const navigate = useNavigate();
  const { customer } = useCustomer();
  const [intialdata, setIntialdata] = useState([]);

  const handleNavigate =async () => {
    const data = getintialdata();
    console.log(await data)
    navigate('/customerentrydata', { state: await data});
  };

  const getintialdata = async () => {
    alert(new Date(Date.now()).toISOString().split("T")[0]);
    const token = localStorage.getItem("token");
    const customers = await fetch(
      `${DOMAIN_NAME}/api/customerentry/getallcustomerentrys/`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    const res = await customers.json();
    if (res.status === "success") {
      const todayscustomer = res.data.filter((customer) => {
        return (
          customer.delivery_date === new Date(Date.now()).toISOString().split("T")[0]
        );
      });
      console.log(todayscustomer)
      setIntialdata(todayscustomer);
      return todayscustomer;
    } else {
      console.log(res);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Customer Entry</CardTitle>
              <CardDescription>
                List of all the customers and their entries
              </CardDescription>
            </div>
            <Button  size="sm" className="ml-auto gap-1" onClick={handleNavigate}>
                View All
                <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {customer && <DataTable data={customer} columns={columns} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
