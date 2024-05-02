import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ModalDrawer from '../modalDrawer'
import { Button } from '../ui/button'
import EditSchedule from './edit-schedule'

type ScheduleProps = {
  name: string
  schedule: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  } | null
  isUser: boolean
}

export default function Schedule({ name, schedule, isUser }: ScheduleProps) {
  console.log(schedule)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isUser ? 'Your' : `${name}'s`} Schedule</CardTitle>
        <CardDescription>Updated 1 day</CardDescription>
        {isUser && (
          <ModalDrawer
            title="Edit Schedule"
            trigger={<p>Edit Schedule</p>}
            content={<EditSchedule schedule={schedule} />}
          />
        )}
      </CardHeader>
      {schedule !== null ? (
        <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className='p-0 px-6 pb-4'>Show Schedule</AccordionTrigger>
          <AccordionContent>
            <CardContent className="space-y-2">
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="font-medium text-sm">Monday:</p>
                <p className="text-white-300">{schedule.monday}</p>
              </div>
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="font-medium text-sm">Tuesday:</p>
                <p className="text-white-300">{schedule.tuesday}</p>
              </div>
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="font-medium text-sm">Wednesday:</p>
                <p className="text-white-300">{schedule.wednesday}</p>
              </div>
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="font-medium text-sm">Thursday:</p>
                <p className="text-white-300">{schedule.thursday}</p>
              </div>
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="font-medium text-sm">Friday:</p>
                <p className="text-white-300">{schedule.friday}</p>
              </div>
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="font-medium text-sm">Saturday:</p>
                <p className="text-white-300">{schedule.saturday}</p>
              </div>
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="font-medium text-sm">Sunday:</p>
                <p className="text-white-300">{schedule.sunday}</p>
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion> 
      ) : <div>
        <p className='p-0 px-6 pb-4'>No Schedule Yet.</p>
      </div> }
      
       
    </Card>
  )
}
