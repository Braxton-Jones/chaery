import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'
import Calendar from './event-calendar'
import ModalDrawer from '../modalDrawer'

export default function RelationshipCalendar() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className='flex items-center justify-between'>
        <CardTitle className="text-lg">{`Today is ${format(new Date(), 'EEEE, MMMM do')}`}</CardTitle>
        <ModalDrawer
          title="Create a new event"
          trigger={
            <p className="flex items-center bg-cherry_dark-800 hover:bg-cherry_light-800 p-2 text-sm rounded-md border justify-center font-semibold text-white w-full">
              Add Event
            </p>
          }
          content={<section>Content</section>}
        />
        </div>
      </CardHeader>
      <CardContent>
        <Calendar />
      </CardContent>
    </Card>
  )
}
