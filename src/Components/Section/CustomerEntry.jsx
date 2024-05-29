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
import { DatePickerForm } from "../UI/UI-Components/Datepicker";

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
            {/* <Button asChild size="sm" className="ml-auto gap-1">
              <Link to="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
             */}
            <div
              className="ml-auto flex flex-row">
              <DatePickerForm />
            </div>
          </CardHeader>
          <CardContent>
            {customer && <DataTable data={customer} columns={columns} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
