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
    cid: string;
    bottle_count: number,
    delivery_date: string,
    delivery_status: string,

};

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "cid",
        header: () => <div className="text-left">Customer ID</div>,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("cid")}</div>
        ),
    },
    {
        accessorKey: "bottle_count",
        header: () => <div className="text-left">Bottle Count</div>,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("bottle_count")}</div>
        ),
    },
    {
        accessorKey: "delivery_date",
        header: () => <div className="text-left">Delivery Date</div>,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("delivery_date")}</div>
        ),
    },
    {
        accessorKey: "delivery_status",
        header: () => <div className="text-left">Delivery Status</div>,
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
