import React from 'react'
import { User, Relationship } from '@/app/home/dashboard/[chaerybond]/page'
import GroceryList from './grocery-list'
import Reminders from './reminders_list'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default function CouplesBoard({ currentUser, relationship }: { currentUser: User; relationship: Relationship }) {
 
  const chaery_link = relationship.chaery_link_id
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-4">
        <GroceryList
          chaery_link={chaery_link}
          groceries={relationship.couples_groceries || []}
          currentUser={currentUser}
         />
        <Reminders
          chaery_link={chaery_link}
          reminders={relationship.couples_reminders || []}
          currentUser={currentUser}
         />
      </div>
    </section>
  )
}
