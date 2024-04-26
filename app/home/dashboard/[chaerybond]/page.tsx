import { Budget } from '@/components/budget'
import Schedule from '@/components/event_components/schedule'
import UpcomingEvents from '@/components/event_components/upcoming-events'
import GroceryList from '@/components/food_components/grocery-list'
import MealVote from '@/components/food_components/meal-vote'
import React from 'react'

export default function Dashboard() {
  return (
    <main className='space-y-5'>
       <section className="w-full h-full space-y-5 px-4">
       <UpcomingEvents />
       <Schedule
          name="Chaerybond"
          schedule={{
            monday: '9:00 AM - 5:00 PM',
            tuesday: '1:00 AM - 2:00 PM',
            wednesday: '9:00 AM - 5:00 PM',
            thursday: '9:00 AM - 5:00 PM',
            friday: '9:00 AM - 5:00 PM',
            saturday: 'Off',
            sunday: 'Off',
          }}
          isUser={true}
        />
         <Schedule
          name="Chaerybond"
          schedule={{
            monday: '9:00 AM - 5:00 PM',
            tuesday: '9:00 AM - 5:00 PM',
            wednesday: '9:00 AM - 5:00 PM',
            thursday: '9:00 AM - 5:00 PM',
            friday: '9:00 AM - 5:00 PM',
            saturday: 'Off',
            sunday: 'Off',
          }}
          isUser={false}
        />
      </section>
      <section className="w-full h-full space-y-5 px-4">
        <Budget />
      </section>
      <section className="w-full h-full space-y-5 px-4">
        <MealVote />
        <GroceryList />
      </section>
    </main>
  )
}
