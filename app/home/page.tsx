import BudgetWidget from '@/components/budget-widget'
import CalendarWidget from '@/components/calender-widget'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Homepage() {
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

  // const { data, error } = await supabase.auth.getUser()
  // if (error || !data?.user) {
  //   redirect('/login')
  // }

  return (
    <div className="flex flex-col gap-4">
      <CalendarWidget />
      <BudgetWidget />
    </div>
  )
}
