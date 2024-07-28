import { Badge } from "@/Components/UI/shadcn-UI/badge";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type Customer = {
  _id: string;
  bottle_count: number;
  delivery_date: string;
  delivery_status: string;
  cname: string;
};

export const columns1: ColumnDef<Customer>[] = [  
  {
    accessorKey: "cid.cname",
    header: () => <div className="text-center sm:text-left">Customer Name</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.getValue("cname")}</div>
      );
    }
  },
  {
    accessorKey: "delivery_date",
    header: () => <div className="text-center sm:text-left">Delivery Date</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("delivery_date")}</div>
    ),
  },
  {
    accessorKey: "bottle_count",
    header: () => <div className="text-center sm:text-left">Bottle Count</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("bottle_count")}</div>
    ),
  },
  {
    accessorKey: "delivery_status",
    header: () => (
      <div className="text-center sm:text-left">Delivery Status</div>
    ),
    cell: ({ row }) => (
      <>
        {row.getValue("delivery_status") === "Present" ? (
          <Badge variant="default">Present</Badge>
        ) : (
          <Badge variant="destructive">Abset</Badge>
        )}
      </>
    ),
  },
];
