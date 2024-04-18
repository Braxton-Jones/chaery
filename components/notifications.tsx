'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Notifications() {
  const notifications = [
    {
      title: 'New Message',
      description: 'You have a new message from Jane Doe',
    },
    {
      title: 'New Message',
      description: 'You have',
    },
    {
      title: 'New Message',
      description: 'You have a new message from John Doe',
    },
    {
      title: 'New Message',
      description: 'You have a new message from Jane Doe',
    },
    // Add more notifications here
  ]

  const [showAll, setShowAll] = useState(false)

  const visibleNotifications = showAll ? notifications : notifications.slice(0, 3)

  return (
    <>
      {/* {notifications.length > 3 && (
      <p onClick={() => setShowAll(!showAll)} className="hover:cursor-pointer hover:text-cherry_light-300 text-left text-sm">
        {showAll ? 'Show Less' : 'Show All'}
      </p>
    )} */}
      <section className="mt-2">
        {visibleNotifications.map((notification, index) => (
          <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-1 last:mb-0 last:pb-0">
            <span className="flex h-3 w-3 translate-y-1 rounded-full bg-cherry_light-600" />
            <div className="space-y-1 flex flex-col">
              <p className="text-sm font-medium leading-none w-fit text-white">{notification.title}</p>
              <p className="text-sm w-fit text-cherry_dark-800">{notification.description}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
