import { useCustomer } from "@/Context/CustomerContext";
import { DataTable } from "../UI/shadcn-UI/DataTable";
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
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function CustomerEntry() {
  const { customer } = useCustomer();

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
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link to="/data">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
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
