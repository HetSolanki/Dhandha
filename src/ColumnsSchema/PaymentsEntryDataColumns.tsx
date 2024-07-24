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
    cid: string,
    cname: string,
    payment_date: string,
    amount: number,
    payment_status: string,
};

export const columns1: ColumnDef<Customer>[] = [
    {
        accessorKey: "cid",
        header: () => <div className="text-left">Customer Name</div>,
        cell: ({ row }) => {
            return (
            <div className="capitalize">{
                row.getValue("cid")?.cname}</div>
            )
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-left">Total Amount</div>,
        cell: ({ row }) => (
            console.log(row.original),
            <div className="capitalize">{row.getValue("amount")}</div>
        ),
    },
    {
        accessorKey: "payment_date",
        header: () => <div className="text-left">Payment Date</div>,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("payment_date")}</div>
        ),
    },
    {
        accessorKey: "payment_status",
        header: () => <div className="text-left">Payment Status</div>,
        cell: ({ row }) => (
            <>
                {row.getValue("payment_status") === "Received" ? (
                    <Badge
                    color="green"
                    >Received</Badge>
                ) : (
                    <Badge variant="destructive">Pending</Badge>
                )}
            </>
        ),
    },
    
];
