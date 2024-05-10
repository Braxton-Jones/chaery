import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SavingsGoal() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Savings Goal</CardTitle>
        <CardDescription>Set a new savings goal to track your progress.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goal-name">Goal Name</Label>
          <Input id="goal-name" placeholder="e.g. New Car" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="target-amount">Target Amount</Label>
          <Input id="target-amount" placeholder="$5,000" type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="target-date">Target Date</Label>
          <Input id="target-date" type="date" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-cherry_light-700 hover:bg-cherry_light-800">Add Goal</Button>
      </CardFooter>
    </Card>
  )
}
