'use client'
import React from 'react'
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type GoalProps = {
  title: string
  description: string | null
  goal: number
  current: number
  projected_date: string
}
export default function Goal({ title, goal, description, current, projected_date }: GoalProps) {
  const progress = (current / goal) * 100
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-cherry_light-700 h-2 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Projected Date:</span>
            <span className="font-medium">{projected_date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Goal:</span>
            <span className="font-medium">${goal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Current:</span>
            <span className="font-medium">${current}</span>
          </div>
        </div>

        <Popover>
          <PopoverTrigger className="w-full">
            <Button className=" w-full bg-cherry_light-700 hover:bg-cherry_light-800">Edit Goal</Button>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}
