"use client"

import { ColumnDef } from "@tanstack/react-table"
import { parse } from "path"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Bill ={
    category: "Rent" | "Utilities" | "Food" | "Entertainment" | "Internet" | "Phone" | "Insurance" | "Other",
    dueDate: string,
    amount: number,
    company: string | null,
}

export const columns: ColumnDef<Bill>[] = [
    {
        accessorKey: "category",
        header: () => <div className="text-xs">Category</div>,
        
    },
    {
        accessorKey: "company",
        header: () => <div className="text-xs">Company</div>,
            },
    {
        accessorKey: "dueDate",
        header: () => <div className="text-xs">Due Date</div>,
            },
    {
        accessorKey: "amount",
        header: () => <div className="text-xs">Amount Due</div>,
        cell: ({row}) => {
            const amount = parseFloat(row.getValue("amount"))
            const format = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-cherry_light-800 bg-black-100 py-0.5 px-1 w-fit rounded-sm font-semibold">{format}</div>
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button size="icon" variant="ghost">
                            <span className="sr-only">Open actions</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                            >
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                                <circle cx="5" cy="12" r="1"></circle>
                            </svg>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
    
]
