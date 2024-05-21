import React from 'react'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function FinancialOverview({ chaery_link }: { chaery_link: string }) {
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
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const getBills = async () => {
    const { data, error } = await supabase
      .from('Relationships')
      .select('couples_bills')
      .eq('chaery_link_id', chaery_link)
    if (error) {
      console.error(error)
      return
    }
    return data[0].couples_bills
  }
  const billData = await getBills()
  console.log(billData, 'bills')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {billData === undefined || billData?.length === 0 || billData === null ? (
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">No bills have been added yet.</p>
          </CardContent>
        </Card>
      ) : (
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
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              You&apos;ve contributed 57% of the total spending.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
