import React from 'react'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Schedule from '@/components/event_components/schedule'
import { User, Relationship } from '@/app/home/dashboard/[chaerybond]/page'
import Events from './events'
import RelationshipCalendar from './events'
type CalendarProps = {
  currentUser: User
  partner: User
  relationship: Relationship
}
export default async function Calendar({
  currentUser: CurrentUser,
  partner: Partner,
  relationship: Relationship,
}: CalendarProps) {
  const yourSchedule = JSON.parse(CurrentUser.schedule)
  const partnerSchedule = JSON.parse(Partner?.schedule)
  const chaery_link = Relationship?.chaery_link_id
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
  if (error) {
    console.error(error)
  }

  const getEvents = async () => {
    const { data: events, error } = await supabase
      .from('Relationships')
      .select('couples_events')
      .eq('chaery_link_id', chaery_link)
    if (error) {
      console.error(error)
    }
    return events
  }
  const events = await getEvents()

  return (
    <section className="w-full h-full space-y-5">
      <RelationshipCalendar chaerybond={chaery_link} events={events && events[0]?.couples_events} />
      <Schedule
        name={CurrentUser.first_name}
        schedule={yourSchedule}
        last_updated={CurrentUser.last_schedule_update}
        isUser={true}
        chaerybond={CurrentUser.chaery_id}
      />
      <Schedule
        name={Partner?.first_name}
        schedule={partnerSchedule}
        isUser={false}
        chaerybond={null}
        last_updated={Partner?.last_schedule_update}
      />
    </section>
  )
}
