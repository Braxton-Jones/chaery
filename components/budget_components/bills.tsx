import React from 'react'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { DataTable } from './bill-table'
import { columns } from './bill-columns'
import { Bill } from './bill-columns'
import editIcon from '@/public/edit.svg'
import plus from '@/public/plus.svg'
import Image from 'next/image'
export default function FinancialResponsibilities() {
  const bills : Bill[] = [
    {
      category: "Rent",
      dueDate: "2022-01-01",
      amount: 750,
      company: "Landlord"
    },
    {
      category: "Utilities",
      dueDate: "2022-01-15",
      amount: 150,
      company: "Electric Company"
    },
    {
      category: "Food",
      dueDate: "2022-01-20",
      amount: 300,
      company: "Grocery Store"
    }
  ]
  return (
    <div className="mt-4 space-y-4">
      <h2 className="font-bold bg-cherry_light-700 p-2 w-fit rounded-md text-sm text-white-700">Bills Overview</h2>
      <div className='space-y-1 flex flex-col items-center w-full '>
      <DataTable
      columns={columns}
      data={bills}
      />
      <div className='
  bg-cherry_light-700 
  text-sm 
  py-1 px-2 
  rounded-md 
  w-fit 
  self-center 
  cursor-pointer
  hover:px-4
  transition-all
  '>
    <Image src={plus} alt="plus icon" width={15} height={15} />
</div>
      </div>

    </div>
  )
}
