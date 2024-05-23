import * as React from "react";
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
import { ArrowUpDown, ClipboardCheckIcon, ClipboardXIcon, EyeIcon, SortAsc, } from "lucide-react";
import { Button } from "../Components/UI/shadcn-UI/button";
import { Stack, TextField } from "@mui/material";


export type Customer = {
    cname: string;
    cphone_number: number;
    caddress: string;
    bottle_price: number;
    delivery_sequence_number: number;

};


const handleEntry = () => {
    console.log("Entry");
    const no_of_bottles = document.getElementById("no_of_bottles") as HTMLInputElement;
    if (no_of_bottles) {
        alert(no_of_bottles.value);
    } else {
        console.log("Please enter the number of bottles")
    }



}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "delivery_sequence_number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sequence
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">
                {row.getValue("delivery_sequence_number")}
            </div>
        ),
    },
    {
        accessorKey: "cname",
        header: "Customer Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("cname")}</div>
        ),
    },
    {
        accessorKey: "caddress",
        header: "Address",
        cell: ({ row }) => {
            return <div className="lowercase">{row.getValue("caddress")}</div>;
        },
    },
    {
        header: "No of Bottles",
        id: "no_of_bottle",
        enableHiding: false,

        cell: ({ row }) => {
            const customer = row.original;
            return (
                <>
                    {/* <TextField
                        id="no_of_bottles"
                        variant="outlined"
                        size="small"
                        type="number"
                        className="w-20"
                        
                    /> */}
                    <input type="number"
                        id="no_of_bottles"
                        className="w-20"
                        style={
                            {
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "6px 10px",
                                width: "50%",
                                margin: "8px 0",
                                display: "inline-block",
                                boxSizing: "border-box"
                            }
                        }
                    />
                </>
            );
        },

    },
    {
        header: "Actions",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const customer = row.original;

            return (
                <>
                    <Stack direction="row" spacing={1}>
                        <Button size="icon" className="h-8 gap-1 inl"
                            onClick={() => handleEntry()}
                        >
                            <ClipboardCheckIcon />
                        </Button>
                        <Button size="icon" className="h-8 gap-1"
                        >
                            <ClipboardXIcon />
                        </Button>
                        <Button size="icon" className="h-8 gap-1"
                            onClick={() => {
                                console.log("View");
                                alert(customer.cname);
                                alert(document.getElementById("no_of_bottles"));
                            }}
                        >
                            <EyeIcon />
                        </Button>
                    </Stack>
                </>
            );
        },
    },
];
