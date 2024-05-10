import React from 'react'
import Schedule from '@/components/event_components/schedule'
import { User, Relationship } from '@/app/home/dashboard/[chaerybond]/page'
import Events from './events'
import RelationshipCalendar from './events'
type CalendarProps = {
  currentUser: User
  partner: User
  relationship: Relationship
}
export default function Calendar({
  currentUser: CurrentUser,
  partner: Partner,
  relationship: Relationship,
}: CalendarProps) {
  const yourSchedule = JSON.parse(CurrentUser.schedule)
  const partnerSchedule = JSON.parse(Partner?.schedule)
  return (
    <section className="w-full h-full space-y-5">
      <RelationshipCalendar />
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
