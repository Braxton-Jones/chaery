'use client'
import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'
import Calendar from './event-calendar'
import ModalDrawer from '../modalDrawer'
import { Formik, Form, useField, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { toast } from 'sonner'
import { DrawerClose } from '../ui/drawer'
import { nanoid } from 'nanoid'

export type Event = {
  event_id: string
  date: string
  title: string
  start_time: string
  end_time?: string
}

const dummyData: Event[] = []
export default function RelationshipCalendar() {
  const [events, setEvents] = useState<Event[]>(dummyData)
  const EventSchema = Yup.object().shape({
    event_name: Yup.string()
      .required('Please enter an event name')
      .min(2, 'Event Name must be at least 2 characters')
      .max(50, 'Event Name must be less than 50 characters'),
    event_date: Yup.date().required('Please enter an event date').min(new Date(), 'Event date must be in the future'),
    event_start_time: Yup.string().required('Please enter a start time'),
    event_end_time: Yup.string()
      .required('Please enter an end time')
      .when('event_start_time', (event_start_time: string, schema: any) => {
        return schema.test({
          test: (event_end_time: string) => event_end_time > event_start_time,
          message: 'End time must be after start time',
        })
      }),
  })
  const timeFormat = (time: string) => {
    // turn 24hr time to 12hr time and add AM/PM
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const min = parseInt(minutes)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${min < 10 ? '0' : ''}${min} ${ampm}`
  }
  const handleSubmit = async (values: {
    event_name: string
    event_date: string
    event_start_time: string
    event_end_time: string
  }) => {
    const { event_name, event_date, event_start_time, event_end_time } = values

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        event_id: `event-${nanoid(10)}`,
        date: event_date,
        title: event_name,
        start_time: timeFormat(event_start_time),
        end_time: timeFormat(event_end_time),
      },
    ])
    toast.success('Event added successfully')
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{`Today is ${format(new Date(), 'EEEE, MMMM do')}`}</CardTitle>
          <ModalDrawer
            title="Create a new event"
            trigger={
              <p className="flex items-center bg-cherry_dark-800 hover:bg-cherry_light-800 p-2 text-sm rounded-md border justify-center font-semibold text-white w-full">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Event
              </p>
            }
            content={
              <section>
                <Formik
                  initialValues={{
                    event_name: '',
                    event_date: '',
                    event_start_time: '',
                    event_end_time: '',
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={EventSchema}
                >
                  {({ isSubmitting }) => (
                    <Form className="mx-4 text-sm">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="event_name" className=" font-semibold">
                            Event Name
                          </label>
                          <Field type="text" name="event_name" className="p-2 border rounded-md" />
                          <ErrorMessage name="event_name" component="div" className="text-red-500" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="event_date" className=" font-semibold">
                            Event Date
                          </label>
                          <Field type="date" name="event_date" className="p-2 border rounded-md " />
                          <ErrorMessage name="event_date" component="div" className="text-red-500" />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="event_start_time" className="text-sm font-semibold">
                              Start Time
                            </label>
                            <Field type="time" name="event_start_time" className="p-2 border rounded-md text-sm" />
                          </div>
                          <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="event_end_time" className="text-sm font-semibold">
                              End Time
                            </label>
                            <Field type="time" name="event_end_time" className="p-2 border rounded-md text-sm" />
                          </div>
                        </div>
                        <div className="text-center text-sm">
                          <ErrorMessage name="event_start_time" component="div" className="text-red-500" />
                          <ErrorMessage name="event_end_time" component="div" className="text-red-500" />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-cherry_dark-800 hover:bg-cherry_light-800 p-2 text-sm rounded-md border justify-center font-semibold text-white w-full"
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </section>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <Calendar events={events} />
      </CardContent>
    </Card>
  )
}
function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}