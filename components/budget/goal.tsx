import React from 'react'
import { Progress } from '@/components/ui/progress'

interface GoalProps {
  title: string
  amount: string
  progress: number
  addedBy: string
}

export default function Goal({ title, amount, progress, addedBy }: GoalProps) {
  return (
    <div className="bg-white-500 p-2 rounded-md w-full">
      <div className="flex">
        <div className="text-black font-bold  justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <p className="text-sm">{title}</p>
            <p className="text-xs italic">{`~ Added by ${addedBy}`}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-xs italic">{`$${amount / 2}`}</p>
            {'/'}
            <p className="text-xs italic">{`$${amount}`}</p>
          </div>
        </div>
        <div></div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
