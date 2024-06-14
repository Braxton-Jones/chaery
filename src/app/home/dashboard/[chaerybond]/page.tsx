import { Budget } from '@/components/budget_components/Budget'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Calendar from '@/components/event_components/Calendar'
import CouplesBoard from '@/components/board_components/Board'

type ScheduleProps = {
  monday_start: string | null
  monday_end: string | null
  tuesday_start: string | null
  tuesday_end: string | null
  wednesday_start: string | null
  wednesday_end: string | null
  thursday_start: string | null
  thursday_end: string | null
  friday_start: string | null
  friday_end: string | null
  saturday_start: string | null
  saturday_end: string | null
  sunday_start: string | null
  sunday_end: string | null
}
export type User = {
  id: number
  created_at: string
  chaery_id: string
  first_name: string
  last_name: string
  email: string
  isOnboarded: boolean
  partner_id: string
  avatar_url: string
  isDTF: boolean
  bondID: string
  schedule: null | ScheduleProps
  last_schedule_update: string | null
}
export type Relationship = {
  id: number
  created_at: string
  anniversary: null | string // Null or string type for anniversary
  spotify_playlist_id: null | string // Null or string type for Spotify playlist ID
  chaery_link_id: string
  couples_groceries: any
  couples_bills: any
  couples_events: any
  couples_reminders: any
}

export default async function Dashboard(params: { params: { chaerybond: string } }) {
  const chaerybond = params.params.chaerybond
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
    const { data, error } = await supabase.from('Users').select('*').eq('bondID', chaerybond)

    if (error) {
      console.log('Error fetching user data from database:', error)
    }
    return data
  }

  const getRelationshipInfo = async () => {
    const { data, error } = await supabase.from('Relationships').select('*').eq('chaery_link_id', chaerybond)
    if (error) {
      console.log('Error fetching relationship data from database:', error)
    }
    return data
  }

  const userData = await getInfoFromChaeryBond()
  const relationshipData = await getRelationshipInfo()
  const relationship: Relationship = relationshipData?.[0]
  const CurrentUser: User = userData?.find((user) => user.email === data.user.email)
  const Partner: User = userData?.find((user) => user.email !== data.user.email)

  return (
    <main className="space-y-5 mx-4 mb-8">
      <Tabs defaultValue="calendar" className="min-w-full">
        <TabsList className="w-full">
          <TabsTrigger value="calendar" className="w-full">
            Calendar
          </TabsTrigger>
          <TabsTrigger value="budget" className="w-full">
            Budget
          </TabsTrigger>
          <TabsTrigger value="board" className="w-full">
            Board
          </TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <Calendar currentUser={CurrentUser} partner={Partner} relationship={relationship} />
        </TabsContent>
        <TabsContent value="budget">
          <section className="w-full h-full space-y-5">
            <Budget currentUser={CurrentUser} relationship={relationship} />
          </section>
        </TabsContent>
        <TabsContent value="board">
          <section className="w-full h-full space-y-5">
            <CouplesBoard currentUser={CurrentUser} relationship={relationship} />
          </section>
        </TabsContent>
      </Tabs>
    </main>
  )
}
