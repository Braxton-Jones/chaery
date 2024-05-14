'use client'

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

export type Bill = {
  category: 'Rent' | 'Utilities' | 'Food' | 'Entertainment' | 'Internet' | 'Phone' | 'Insurance' | 'Other'
  dueDate: string
  amount: number
  company: string | null
}

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: 'category',
    header: () => <div className="text-xs text-cherry_light-700">Category</div>,
  },
  {
    accessorKey: 'company',
    header: () => <div className="text-xs text-cherry_light-700">Company</div>,
  },
  {
    accessorKey: 'dueDate',
    header: () => <div className="text-xs text-cherry_light-700">Due Date</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-xs text-cherry_light-700">Amount</div>,
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
]
