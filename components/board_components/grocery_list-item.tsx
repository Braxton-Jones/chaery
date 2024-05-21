'use client'
import { GroceryItem } from './grocery-list'
import { createBrowserClient } from '@supabase/ssr'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export default function GroceryListItem({ id, name, category, quantity, checked }: GroceryItem) {
  const [checkedState, setChecked] = useState(checked)

  const toggleChecked = () => {
    console.log(checkedState)
    setChecked(!checkedState)
  }

  return (
    <Card className={`flex flex-row justify-between items-center ${checkedState ? 'bg-white-600' : ''}`}>
      <div className="flex items-center">
        <TrashIcon className="h-5 w-6 text-gray-500 cursor-pointer" />
        <CardHeader>
          <CardTitle className="text-sm">
            {name} / <span className="text-white-300 text-xs">{category}</span>
          </CardTitle>
          <CardDescription className="text-xs">{quantity}</CardDescription>
        </CardHeader>
      </div>

      <div className="mr-5 flex items-center justify-center">
        <Checkbox
          checked={checkedState}
          onClick={toggleChecked}
          className=" data-[state=checked]:bg-cherry_light-700"
        />
      </div>
    </Card>
  )
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
