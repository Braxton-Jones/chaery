import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import SavingsGoals from './savings-goals'

export default function BudgetDetails() {
  return (
    <section className="bg-black-300 w-full rounded-sm flex p-4">
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-lg">Budget Summary</h3>
          <div className="flex gap-4 items-center">
            <div className="h-4 w-4 bg-mauve-600 rounded-full"></div>
            <p className="text-xs">
              {`In 2 days -> `} <span className="italic text-mauve-600">BangBrosCapital.inc</span> $500
            </p>
          </div>
        </div>

        <Separator />
        <div className="text-sm flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p>
                {`Yor Forger's split is `} <span className="text-red-300">$121</span> this month.
              </p>
              <p className="text-xs italic">{`💸 Send in your split? `}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p>
                {`Loid Forger's split is `} <span className="text-red-300">$1203</span> this month.
              </p>
              <p className="text-xs italic">{`✨ Loid Forger has sent in their split`}</p>
            </div>
          </div>
        </div>
        <SavingsGoals />
      </div>
    </section>
  )
}
