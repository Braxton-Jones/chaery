import { Budget } from '@/components/budget_components/budget'
import Schedule from '@/components/event_components/schedule'
import UpcomingEvents from '@/components/event_components/upcoming-events'
import GroceryList from '@/components/food_components/grocery-list'
import MealVote from '@/components/food_components/meal-vote'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type ScheduleProps = {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
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
}
export type Relationship = {
  id: number
  created_at: string
  anniversary: null | string // Null or string type for anniversary
  spotify_playlist_id: null | string // Null or string type for Spotify playlist ID
  chaery_link_id: string
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
  const relationship = relationshipData?.[0]
  const CurrentUser = userData?.find((user) => user.email === data.user.email)
  const Partner = userData?.find((user) => user.email !== data.user.email)

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
          <TabsTrigger value="food" className="w-full">
            Food & Grocery
          </TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <section className="w-full h-full space-y-5">
            <Schedule
              name={CurrentUser.first_name}
              schedule={CurrentUser.schedule}
              isUser={true}
            />
            <Schedule
              name={Partner.first_name}
              schedule={Partner.schedule}
              isUser={false}
            />
          </section>
        </TabsContent>
        <TabsContent value="budget">
          <section className="w-full h-full space-y-5">
            <Budget />
          </section>
        </TabsContent>
        <TabsContent value="food">
          <section className="w-full h-full space-y-5">
            <MealVote />
            <GroceryList />
          </section>
        </TabsContent>
      </Tabs>
    </main>
  )
}
