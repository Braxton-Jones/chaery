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
  return (
    <section className="w-full h-full space-y-5">
      <RelationshipCalendar />
      <Schedule
        name={CurrentUser.first_name}
        schedule={CurrentUser.schedule}
        isUser={true}
        chaerybond={CurrentUser.chaery_id}
      />
      <Schedule name={Partner?.first_name} schedule={Partner?.schedule} isUser={false} chaerybond={null} />
    </section>
  )
}
