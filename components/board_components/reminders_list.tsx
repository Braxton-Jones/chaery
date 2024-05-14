'use client'
import React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ModalDrawer from '@/components/modalDrawer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export type Reminder = {
  title: string
  description: string
  sender: string
  date: string
  read: boolean
}

const dummyData: Reminder[] = [
  {
    title: 'Anniversary',
    description: "Don't forget to buy flowers for our anniversary",
    sender: 'Irene',
    date: '2022-09-01',
    read: true,
  },
  {
    title: 'Grocery List',
    description: 'We need to buy tomatoes, chicken breasts, broccoli, and eggs',
    sender: 'You',
    date: '2022-09-01',
    read: false,
  },
  {
    title: 'Date Night',
    description: "Don't forget about our date night on Friday",
    sender: 'Irene',
    date: '2022-09-01',
    read: false,
  },
]

export default function Reminders() {
  const [reminders, setReminders] = useState(dummyData)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <ModalDrawer
          title="Create a new savings goal"
          trigger={
            <p className="flex items-center bg-cherry_dark-800 hover:bg-cherry_light-800 p-2 text-sm rounded-md border justify-center font-semibold text-white">
              Add Reminder
            </p>
          }
          content={<section>Content</section>}
        />
        {reminders
          .filter((reminder) => !reminder.read)
          .map((reminder, index) => (
            <Card key={index} className="py-2 border-b border-gray-200">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-sm">
                    {reminder.title} - <span className="text-xs text-white-300">{reminder.date}</span>
                  </CardTitle>
                  <Button className="bg-cherry_light-700 hover:bg-cherry_light-800 w-fit p-1 h-6 text-xs">Read</Button>
                </div>
                <CardDescription>{reminder.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Read Reminders</AccordionTrigger>
            <AccordionContent>
              {reminders
                .filter((reminder) => reminder.read)
                .map((reminder, index) => (
                  <Card key={index} className="py-2 border-b border-gray-200">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="text-sm">
                          {reminder.title} - <span className="text-xs text-white-300">{reminder.date}</span>
                        </CardTitle>
                        <Button className="bg-cherry_light-700 hover:bg-cherry_light-800 w-fit p-1 h-6 text-xs">
                          Unread
                        </Button>
                      </div>

                      <CardDescription>{reminder.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-cherry_light-700 hover:bg-cherry_light-800">Mark All As Read</Button>
      </CardFooter>
    </Card>
  )
}
