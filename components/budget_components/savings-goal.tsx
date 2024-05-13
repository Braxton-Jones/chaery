'use client'
import React from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import minus from '@/public/minus.svg'
import plus from '@/public/plus.svg'
import trash from '@/public/trash.svg'
import Image from 'next/image'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { set } from 'date-fns'

type GoalProps = {
  title: string
  description: string | null
  goal: number
  current: number
  projected_date: string
  goalID: string
}
export default function Goal({ title, goal, description, current, projected_date, goalID }: GoalProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const [progress, setProgress] = React.useState((current / goal) * 100)
  const [currentAmount, setCurrentAmount] = React.useState(current)
  console.log(title, goalID)

  const deleteGoal = async () => {
    const { data, error } = await supabase.from('Goals').delete().eq('chaery_goal_id', goalID)
    if (error) {
      console.error('Error deleting goal:', error)
      toast.error('Error deleting goal')
      return
    }
    console.log('Goal deleted:', data)
    window.location.reload()
    toast.success('Goal deleted')
  }

const updateSavedAmount = async () => {
  const { data, error } = await supabase
    .from('Goals')
    .update({ amount_saved: currentAmount })
    .eq('chaery_goal_id', goalID);
  if (error) {
    console.error('Error updating goal:', error);
    toast.error('Error updating goal');
    return;
  }
  console.log('Goal updated:', data);
  setProgress((currentAmount / goal) * 100);
  toast.success('Goal updated');
};
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            {title}

            {/* <Image src={trash} alt="Delete"  /> */}
            <AlertDialog>
              <AlertDialogTrigger>
                <div className="p-2 px-3 bg-cherry_light-800 rounded-sm hover:bg-cherry_light-900 cursor-pointer">
                  <Image src={trash} alt="Delete" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-black-300 rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-cherry_light-800">
                    This action cannot be undone. This will permanently delete the goal and all data will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-black-700 hover:bg-black-800">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-cherry_light-700 hover:bg-cherry_light-900" onClick={deleteGoal}>
                    Delete Goal
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardTitle>
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
            <span className="font-medium">${currentAmount}</span>
          </div>
        </div>

        <Popover>
          <PopoverTrigger className="w-full h-10 px-4 py-2 bg-cherry_light-700 hover:bg-cherry_light-800 rounded border text-white text-sm border-cherry_light-900 font-semibold">
            Edit Goal
          </PopoverTrigger>
          <PopoverContent className="w-full space-y-3">
            <div className="flex justify-between items-center gap-2">
              <p className="">Current Savings:</p>
              <input
                type="number"
                className="max-w-[100px] h-10 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded border text-gray-500 dark:text-gray-400 text-sm border-gray-300 dark:border-gray-700"
                placeholder={`${current}`}
                value={currentAmount}
                onChange={(e) => setCurrentAmount(parseInt(e.target.value))}
              />
              {/* <div className='space-x-2'>
                <Button className='p-2 h-min bg-cherry_light-800'>
                  <Image src={plus} alt="Add" />
                </Button>
                <Button className='p-2 h-min bg-cherry_light-800'>
                  <Image src={minus} alt="Subtract" />
                </Button>
                </div> */}
              <div></div>
            </div>
            <Button
  className="w-full h-10 px-4 py-2 bg-cherry_light-700 hover:bg-cherry_light-800 rounded border text-white text-sm border-cherry_light-900 font-semibold"
  disabled={currentAmount === current}
  onClick={updateSavedAmount}
>
              {' '}
              Save Changes
            </Button>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}
