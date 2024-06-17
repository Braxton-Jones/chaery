import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ModalDrawer from '../modalDrawer'
import { Button } from '../ui/button'
import EditSchedule from './edit-schedule'
import { Separator } from '../ui/separator'

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
  last_updated: string | null
  isUser: boolean
  chaerybond: string | null | undefined
}

export default function Schedule({ name, schedule, last_updated, isUser, chaerybond }: ScheduleProps) {
  // Sample schedule object:
  // {"monday_start":"00:00","monday_end":"04:30","tuesday_start":"00:00","tuesday_end":"06:30","wednesday_start":"00:00","wednesday_end":"11:00","thursday_start":"00:00","thursday_end":"13:00","friday_start":"00:00","friday_end":"21:00","saturday_start":"01:30","saturday_end":"07:30","sunday_start":"Off","sunday_end":"Off"}
  console.log(schedule, 'schedule')

  const militaryToStandard = (time: string | null) => {
    if (time === 'Off') return 'Off';
    if (time === null || typeof time === 'undefined' || time === '') return '';

    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const standardHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const standardMinutes = minutes;
    const amPm = hour >= 12 ? 'PM' : 'AM';

    return `${standardHour}:${standardMinutes} ${amPm}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-2">
            <CardTitle>{isUser ? 'Your' : `${name}'s`} Schedule</CardTitle>
            <CardDescription>
              {last_updated ? `Last updated: ${last_updated}` : 'No schedule update yet.'}
            </CardDescription>
          </div>
          {isUser && (
            <ModalDrawer
              title="What's your schedule?"
              trigger={
                <p className="border p-2 rounded-md text-sm hover:border-cherry_light-800 font-bold">Edit Schedule</p>
              }
              content={<EditSchedule schedule={schedule} chaerybond={chaerybond} />}
            />
          )}
        </div>
      </CardHeader>
      {schedule ? (
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-0 px-6 pb-4 text-cherry_light-700">Show Schedule</AccordionTrigger>
            <AccordionContent>
              <CardContent className="">
                <Separator className="mb-3" />
                {Object.entries(schedule).map(([day, time], index) => (
                  <div className="flex flex-row items-center justify-between mb-4" key={index}>
                    <p className="font-medium text-sm">{day.split('_')[0].charAt(0).toUpperCase() + day.split('_')[0].slice(1)}:</p>
                    {time === 'Off' ? (
                      <p className="text-white-300">Off work today!</p>
                    ) : (
                      <div className="flex gap-2">
                        <p className="text-white-300">{militaryToStandard(schedule[`${day.split('_')[0]}_start` as keyof typeof schedule])}</p>
                        <p className="text-white-300">-</p>
                        <p className="text-white-300">{militaryToStandard(schedule[`${day.split('_')[0]}_end` as keyof typeof schedule])}</p>
                      </div>
                    )}
                  </div>
                ))}
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
