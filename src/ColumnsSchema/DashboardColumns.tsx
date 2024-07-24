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
    _id: number;
    id: number;
    cname: string;
    cphone_number: number;
    bottle_price: number;
    totalRevenue: number;
  };
  
  export const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "cname",
      header: () => <div className="text-left">Customer Names</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("cname")}</div>
      ),
    },
    {
      accessorKey: "cphone_number",
      header: () => <div className="text-left">Phone Number</div>,
      cell: ({ row }) => (
        <div>{row.getValue("cphone_number")}</div>
      ),
    },
    {
      accessorKey: "bottle_price",
      header: () => <div className="text-left">Bottle Price</div>,
      cell: ({ row }) => (
        <div>{row.getValue("bottle_price")}</div>
      ),
    },
    {
      accessorKey: "totalRevenue",
      header: () => <div className="text-left">Total Revenue</div>,
      cell: ({ row }) => (
        <div>{row.getValue("totalRevenue")}</div>
      ),
    },
  ];
  