"use client";

import { createBrowserClient } from '@supabase/ssr'
import React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ModalDrawer from '@/components/modalDrawer'
import { nanoid } from 'nanoid'
import { Formik, Form, useField, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { toast } from 'sonner';

export type Reminder = {
  reminderId: string
  title: string
  description: string
  sender: string
  date: string
  read: boolean
}



export default function Reminders({ chaery_link, reminders, currentUser }: { chaery_link: string; reminders: Reminder[]; currentUser: any}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [reminderData, setReminders] = useState(reminders)
  const toggleRead = (reminderId: string) => {
    const updatedReminders = reminderData.map((reminder) => {
      if (reminder.reminderId === reminderId) {
        return { ...reminder, read: !reminder.read }
      }
      return reminder
    })
    setReminders(updatedReminders)
  }
  const markAllAsRead = () => {
    const updatedReminders = reminders.map((reminder) => {
      return { ...reminder, read: true }
    })
    setReminders(updatedReminders)
  }

  const ReminderSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    date: Yup.string().required('Date is required'),
  })
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Reminders</CardTitle>
          <ModalDrawer
            title="Create a new reminder"
            trigger={
              <p className="flex items-center bg-cherry_light-700 hover:bg-cherry_light-800 p-2 text-sm rounded-md border justify-center font-semibold text-white">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Reminder
              </p>
            }
            content={
              <section>
                <Formik
                  initialValues={{
                    title: '',
                    description: '',
                    date: '',
                  }}
                  validationSchema={ReminderSchema}
                  onSubmit={async (values, { resetForm }) => {
                    const { data, error } = await supabase.from('Relationships').update({
                      couples_reminders: [...reminders, {
                        reminderId: `reminder-${nanoid(10)}`,
                        title: values.title,
                        description: values.description,
                        sender: 'You',
                        date: values.date,
                        read: false,
                      }]
                    }).eq('chaery_link_id', chaery_link)

                    if (error) {
                      console.error(error)
                      toast.error('An error occurred while adding reminder')
                      return
                    }
                    setReminders([
                      ...reminders,
                      {
                        reminderId: `reminder-${nanoid(10)}`,
                        title: values.title,
                        description: values.description,
                        sender: 'You',
                        date: values.date,
                        read: false,
                      },
                    ])
                    toast.success('Reminder added')
                    resetForm()
                    // setReminders([
                    //   ...reminders,
                    //   {
                    //     reminderId: `reminder-${nanoid(10)}`,
                    //     title: values.title,
                    //     description: values.description,
                    //     sender: 'You',
                    //     date: values.date,
                    //     read: false,
                    //   },
                    // ])
                    // resetForm()
                  }}
                >
                  <Form className="space-y-4 mx-4 text-sm">
                    <div className="space-y-2">
                      <label htmlFor="title">Title</label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <ErrorMessage name="title" component="p" className="text-red-500" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description">Description</label>
                      <Field
                        type="text"
                        id="description"
                        name="description"
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <ErrorMessage name="description" component="p" className="text-red-500" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="date">Date</label>
                      <Field
                        type="date"
                        id="date"
                        name="date"
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                      <ErrorMessage name="date" component="p" className="text-red-500" />
                    </div>
                    <Button type="submit" className="w-full bg-cherry_light-700 hover:bg-cherry_light-800">
                      Add Reminder
                    </Button>
                  </Form>
                </Formik>
              </section>
            }
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {reminderData.length === 0 && (
          <CardDescription className="text-center text-gray-500">No reminders yet</CardDescription>
        )}
        {reminderData
          .filter((reminder) => !reminder.read)
          .map((reminder, index) => (
            <Card key={index} className="py-2 border-b border-gray-200">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-sm">
                    {reminder.title} - <span className="text-xs text-white-300">{reminder.date}</span>
                  </CardTitle>
                  <Button
                    className="bg-cherry_light-700 hover:bg-cherry_light-800 w-fit p-1.5 h-6 text-xs"
                    onClick={() => toggleRead(reminder.reminderId)}
                  >
                    {reminder.read ? 'Unread' : 'Read'}
                  </Button>
                </div>
                <CardDescription>{reminder.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        {reminderData
          .filter((reminder) => reminder.read)
          .map((reminder, index) => (
            <Card key={index} className="py-2 border-b border-gray-200">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-sm">
                    {reminder.title} - <span className="text-xs text-white-300">{reminder.date}</span>
                  </CardTitle>
                  <Button
                    className="bg-cherry_light-600 hover:bg-cherry_light-800 w-fit p-1 h-6 text-xs"
                    onClick={() => toggleRead(reminder.reminderId)}
                  >
                    {reminder.read ? 'Unread' : 'Read'}
                  </Button>
                </div>
                <CardDescription>{reminder.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
      </CardContent>
      {reminders.length > 0 && (
        <CardFooter>
          <Button className="w-full bg-cherry_light-700 hover:bg-cherry_light-800" onClick={markAllAsRead}>
            Mark All As Read
          </Button>
        </CardFooter>
      )}
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
