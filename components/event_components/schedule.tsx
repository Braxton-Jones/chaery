import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ModalDrawer from '../modalDrawer'
import { Button } from '../ui/button'
import EditSchedule from './edit-schedule'

type ScheduleProps = {
  name: string
  schedule: {
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
  } | null
  isUser: boolean
  chaerybond: string | null | undefined
}

export default function Schedule({ name, schedule, isUser, chaerybond }: ScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isUser ? 'Your' : `${name}'s`} Schedule</CardTitle>
        <CardDescription>Updated 1 day</CardDescription>
        {isUser && (
          <ModalDrawer
            title="What's your schedule?"
            trigger={<p>Edit Schedule</p>}
            content={<EditSchedule schedule={schedule} chaerybond={chaerybond} />}
          />
        )}
      </CardHeader>
      {schedule !== null ? (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-0 px-6 pb-4">Show Schedule</AccordionTrigger>
            <AccordionContent>
              <CardContent className="space-y-2">
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Monday:</p>
                  <p className="text-white-300">{schedule?.monday_start}</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Tuesday:</p>
                  <p className="text-white-300">{schedule?.tuesday_start}</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Wednesday:</p>
                  <p className="text-white-300">{schedule?.wednesday_start}</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Thursday:</p>
                  <p className="text-white-300">{schedule?.thursday_start}</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Friday:</p>
                  <p className="text-white-300">{schedule?.friday_start}</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Saturday:</p>
                  <p className="text-white-300">{schedule?.saturday_start}</p>
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Sunday:</p>
                  <p className="text-white-300">{schedule?.sunday_start}</p>
                </div>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div>
          <p className="p-0 px-6 pb-4">No Schedule Yet.</p>
        </div>
      )}
    </Card>
  )
}
