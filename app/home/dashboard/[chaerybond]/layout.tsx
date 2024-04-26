
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {RelationshipInfo } from '@/components/relationship-info'

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { chaerybond: string }
}>) {
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

  const getInfoFromChaeryBond = async () => {
    const { data, error } = await supabase.from('Users').select('*').eq('bondID', params.chaerybond)

    if (error) {
      console.log('Error fetching user data from database:', error)
    }
    return data
  }

  const userData = await getInfoFromChaeryBond()
  const CurrentUser = userData?.find((user) => user.email === data.user.email)
  const Partner = userData?.find((user) => user.email !== data.user.email)

  return (
    <section className="w-full flex flex-col gap-6 self-start">
      <RelationshipInfo />
      <div>

      </div>
      {children}
    </section>
  )
}
