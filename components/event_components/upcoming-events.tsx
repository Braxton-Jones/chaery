import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { dateFormat } from '@/lib/utils'
import chevdown from '@/public/chevron-down.svg'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function UpcomingEvents() {
  const relationshipEvents = [
    {
      name: 'Anniversary',
      date: '2022-10-10',
    },
    {
      name: 'Birthday',
      date: '2022-11-10',
    },
    {
      name: "Valentine's Day",
      date: '2022-02-14',
    },
    {
      name: 'Christmas',
      date: '2022-12-25',
    },
    {
      name: "New Year's Eve",
      date: '2022-12-31',
    },
  ]
  return (
    <section className="bg-white text-black-100 rounded-md p-6">
      <Collapsible className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">You have {relationshipEvents.length} upcoming events</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-white-800 rounded-lg shadow-md">
            <h4>Next Event</h4>
            <p>
              {relationshipEvents[0].name} is on {dateFormat(relationshipEvents[0].date)}
            </p>
          </div>

          <CollapsibleContent className="space-y-4">
            {relationshipEvents.slice(1, 6).map((eventInfo, index) => (
              <div key={index} className="p-4 bg-white-800 rounded-lg shadow-md">
                <p>
                  {eventInfo.name} is on {dateFormat(eventInfo.date)}
                </p>
              </div>
            ))}
          </CollapsibleContent>
          <CollapsibleTrigger className="w-full bg-black-900 p-3 rounded-md">
            <p>View all Events</p>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </section>
  )
}
