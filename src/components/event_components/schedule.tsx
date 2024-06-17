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
  const militaryToStandard = (time: string | null) => {
    if (time === 'Off') return 'Off'
    if (time === null) return ''
    if (time === '') return ''
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const standardHour = hour > 12 ? hour - 12 : hour
    const standardMinutes = minutes
    const amPm = hour >= 12 ? 'PM' : 'AM'
    return `${standardHour}:${standardMinutes} ${amPm}`
  }
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
      {schedule !== null ? (
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-0 px-6 pb-4 text-cherry_light-700">Show Schedule</AccordionTrigger>
            <AccordionContent>
              <CardContent className="">
                <Separator className="mb-3" />
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Monday:</p>
                  {schedule?.monday_start === 'Off' ? (
                    <p className="text-white-300">Off work today!</p>
                  ) : (
                    <div className="flex gap-2">
                      <p className="text-white-300">{militaryToStandard(schedule?.monday_start)}</p>
                      <p className="text-white-300">-</p>
                      <p className="text-white-300">{militaryToStandard(schedule?.monday_end)}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Tuesday:</p>
                  {schedule?.tuesday_start === 'Off' ? (
                    <p className="text-white-300">Off work today!</p>
                  ) : (
                    <div className="flex gap-2">
                      <p className="text-white-300">{militaryToStandard(schedule?.tuesday_start)}</p>
                      <p className="text-white-300">-</p>
                      <p className="text-white-300">{militaryToStandard(schedule?.tuesday_end)}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Wednesday:</p>
                  {schedule?.wednesday_start === 'Off' ? (
                    <p className="text-white-300">Off work today!</p>
                  ) : (
                    <div className="flex gap-2">
                      <p className="text-white-300">{militaryToStandard(schedule?.wednesday_start)}</p>
                      <p className="text-white-300">-</p>
                      <p className="text-white-300">{militaryToStandard(schedule?.wednesday_end)}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Thursday:</p>
                  {schedule?.thursday_start === 'Off' ? (
                    <p className="text-white-300">Off work today!</p>
                  ) : (
                    <div className="flex gap-2">
                      <p className="text-white-300">{militaryToStandard(schedule?.thursday_start)}</p>
                      <p className="text-white-300">-</p>
                      <p className="text-white-300">{militaryToStandard(schedule?.thursday_end)}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Friday:</p>
                  {schedule?.friday_start === 'Off' ? (
                    <p className="text-white-300">Off work today!</p>
                  ) : (
                    <div className="flex gap-2">
                      <p className="text-white-300">{militaryToStandard(schedule?.friday_start)}</p>
                      <p className="text-white-300">-</p>
                      <p className="text-white-300">{militaryToStandard(schedule?.friday_end)}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <p className="font-medium text-sm">Saturday:</p>
                  {schedule?.saturday_start === 'Off' ? (
                    <p className="text-white-300">Off work today!</p>
                  ) : (
                    <div className="flex gap-2">
                      <p className="text-white-300">{militaryToStandard(schedule?.saturday_start)}</p>
                      <p className="text-white-300">-</p>
                      <p className="text-white-300">{militaryToStandard(schedule?.saturday_end)}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p className="font-medium text-sm">Sunday:</p>
                  {schedule?.sunday_start === 'Off' ? (
                    <p className="text-white-300">Off work today!</p>
                  ) : (
                    <div className="flex gap-2">
                      <p className="text-white-300">{militaryToStandard(schedule?.sunday_start)}</p>
                      <p className="text-white-300">-</p>
                      <p className="text-white-300">{militaryToStandard(schedule?.sunday_end)}</p>
                    </div>
                  )}
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
