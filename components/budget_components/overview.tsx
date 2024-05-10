import React from 'react'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function FinancialOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-4 border-2">
        <h3 className="text-lg font-semibold mb-2">Spending Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">You</p>
              <p className="text-xl font-bold">$1,200</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Partner</p>
              <p className="text-xl font-bold">$900</p>
            </div>
          </div>
          <Progress className="w-full" value={57} />
          <p className="text-gray-500 dark:text-gray-400 text-sm">You&apos;ve contributed 57% of the total spending.</p>
        </div>
      </div>
    </div>
  )
}
