'use client'

import { createBrowserClient } from '@supabase/ssr'
import { ColumnDef } from '@tanstack/react-table'
import { parse } from 'path'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import edit from '@/public/edit.svg'
import Image from 'next/image'
import { MoreHorizontal } from 'lucide-react'

export type Bill = {
  id: string
  category: string
  dueDate: string
  amount: number
  company: string | null
}
const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: 'company',
    header: () => <div className="text-xs text-cherry_light-700">Company/Name</div>,
  },
  {
    accessorKey: 'dueDate',
    header: () => <div className="text-xs text-cherry_light-700">Due</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-xs text-cherry_light-700">Amount Due</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return (
        <div className="text-cherry_light-800 bg-black-100 py-0.5 px-1 w-fit rounded-sm font-semibold">{format}</div>
      )
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const payment = row.original
  //     console.log(payment)

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>Edit</DropdownMenuItem>
  //           <DropdownMenuItem
  //             onClick={async () => {
  //               const { data, error } = await supabase.from("Relationships").update({
  //                 // update the couples_bills array to remove the bill

  //               })
  //               console.log(payment.id)
  //               if (error) {
  //                 console.error(error)
  //                 return
  //               }
  //             }}
  //           >Delete</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
