import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export default function CalendarWidget() {
  return (
    <div className="border-bg-white-100 px-4 py-3.5 rounded-md flex flex-col gap-1 bg-white-100">
      {/* Today's date & Upcoming Events */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-white font-bold text-sm">June 1, 2001</p>
      </div>
      {/* Events at a glance */}
      <section>
        <div className="font-semibold flex gap-4 flex-col">
          <div className="flex items-center">
            <p className="w-full">Upcoming Events</p>
            <Link href={'/home/calendar'} className="bg-mauve-500 p-2 rounded-md font-nunito_sans">
              <p className="text-sm w-full text-black-400 font-black">New</p>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1  bg-white-200 min-h-[50px] rounded-sm justify-center flex-col">
              <p className="text-white text-sm font-semibold">👔 Loid is at work!</p>
              <div>
                <p className="text-white text-xs italic">9:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-1  bg-white-200 min-h-[50px] rounded-sm justify-center flex-col">
              <p className="text-white text-sm font-semibold">💄 Date Night: </p>
              <div>
                <p className="text-white text-xs italic">TBD...</p>
              </div>
            </div>
            <div className="flex items-center gap-1  bg-white-200 min-h-[50px] rounded-sm justify-center flex-col">
              <p className="text-white text-sm font-semibold">⭐ Event #1</p>
              <div>
                <p className="text-white text-xs italic">says something idk!</p>
              </div>
            </div>
            <div className="flex items-center gap-1  bg-white-200 min-h-[50px] rounded-sm justify-center flex-col">
              <p className="text-white text-sm font-semibold">👽 Event #2</p>
              <div>
                <p className="text-white text-xs italic">says something idk!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Make a new event */}
      <section></section>
    </div>
  )
}
