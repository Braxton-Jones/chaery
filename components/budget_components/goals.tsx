import React from 'react'
import { Button } from '@/components/ui/button'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import ModalDrawer from '../modalDrawer'
import SavingsGoal from './add-goal'
import Goal from './savings-goal'

export default function FinancialGoals() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Savings Goals</h2>
        <ModalDrawer
          title=""
          trigger={
            <Button size="sm" variant="outline">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          }
          content={<SavingsGoal />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Goal
          title="Vacation Fund"
          goal={5000}
          current={4250}
          projected_date="2022-12-31"
          description="Save up for a vacation to the Bahamas."
        />
      </div>
    </div>
  )
}
function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
