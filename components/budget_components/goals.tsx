import React from 'react'
import { Button } from '@/components/ui/button'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import ModalDrawer from '../modalDrawer'
import SavingsGoal from './add-goal'
import Goal from './savings-goal'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

type GoalProps = {
  id: number
  created_at: string
  chaery_link: string
  goal_name: string
  goal_description: string
  goal_amount: string
  amount_saved: string
  transactions: null | any[]
  goal_target: string
  chaery_goal_id: string
}

export default async function FinancialGoals({ chaery_bond }: { chaery_bond: string }) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )
  const user = supabase.auth.getUser() // Get the authenticated user first
  if (!user) {
    // Handle the case where the user is not authenticated
    console.error('User is not authenticated.')
    return null
  }

  const getGoals = async () => {
    const { data: goals, error } = await supabase.from('Goals').select('*').eq('chaery_link', chaery_bond)
    if (error) {
      console.error('Error fetching goals:', error)
    }
    return goals
  }
  const goals = await getGoals()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Savings Goals</h2>
        <ModalDrawer
          title="Create a new savings goal"
          trigger={
            <p className="flex items-center bg-white-900 p-2 text-sm rounded-md border">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Goal
            </p>
          }
          content={<SavingsGoal chaery_bond={chaery_bond} />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals &&
          (goals.length > 0 || (
            <div className="bg-cherry_light-800 p-2 rounded-md">
              <h2 className="text-lg font-semibold text-center">No Goals Yet</h2>
              <p className="text-sm">
                Select &quot;Add Goal&quot; to get started. You can create a goal for anything you want to save up for,
                like a vacation, a new car, or a new home.
              </p>
            </div>
          ))}
        {goals?.map((goal: GoalProps) => (
          <Goal
            key={goal.id}
            title={goal.goal_name}
            goal={parseInt(goal.goal_amount)}
            current={parseInt(goal.amount_saved)}
            projected_date={goal.goal_target}
            description={goal.goal_description}
            goalID={goal.chaery_goal_id}
          />
        ))}
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
