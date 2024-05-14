import React from 'react'
import { User, Relationship } from '@/app/home/dashboard/[chaerybond]/page'
import GroceryList from './grocery-list'
import Reminders from './reminders_list'

export default function CouplesBoard({ currentUser, relationship }: { currentUser: User; relationship: Relationship }) {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-4">
        <GroceryList />
        <Reminders />
      </div>
    </section>
  )
}
