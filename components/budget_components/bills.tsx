'use client'
import React from 'react'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { DataTable } from './bill-table'
import { columns } from './bill-columns'
import { Bill } from './bill-columns'
import editIcon from '@/public/edit.svg'
import plus from '@/public/plus.svg'
import Image from 'next/image'
import ModalDrawer from '@/components/modalDrawer'
import { useState } from 'react'
export default function FinancialResponsibilities() {
  const bills: Bill[] = [
    {
      category: 'Rent',
      dueDate: '2022-01-01',
      amount: 750,
      company: 'Landlord',
    },
    {
      category: 'Utilities',
      dueDate: '2022-01-15',
      amount: 150,
      company: 'Electric Company',
    },
    {
      category: 'Food',
      dueDate: '2022-01-20',
      amount: 300,
      company: 'Grocery Store',
    },
  ]

  const [billData, setBillData] = useState(bills)
  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold w-fit rounded-md text-sm">Bills Overview</h2>
        <ModalDrawer
          title="Edit Bills"
          trigger={
            <div className="flex items-center bg-cherry_light-700 hover:bg-cherry_light-800 p-2 text-sm rounded-md border w-full space-x-2">
              <Image src={editIcon} alt="edit icon" width={15} />
              <p>Edit Bills</p>
            </div>
          }
          content={<section></section>}
        />
      </div>
      <div className="space-y-1 flex flex-col items-center w-full ">
        <DataTable columns={columns} data={billData} />
      </div>
    </div>
  )
}
