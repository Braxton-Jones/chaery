'use client'
import React, { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type Event = {
    date: string
    title: string
    time: string
}

const dummyData: Event[] = [
    { date: '2024-05-01', title: 'Event 1', time: '12:00 PM' },
    { date: '2024-05-05', title: 'Event 2', time: '1:00 PM' },
    { date: '2024-05-10', title: 'Event 3', time: '2:00 PM' },

]

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState(dummyData)

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600">
          &lt;
        </button>
        <span className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={nextMonth} className="text-gray-600">
          &gt;
        </button>
      </div>
    )
  }

  const renderDays = () => {
    const dateFormat = 'EEE'
    const days = []
    let startDate = startOfWeek(currentDate)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="flex justify-center items-center text-gray-600 w-1/7">
          {format(startDate, dateFormat)}
        </div>,
      )
      startDate = new Date(startDate.getTime() + 86400000) // Adding one day
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = eachDayOfInterval({ start: startDate, end: endDate })

    while (days.length > 0) {
      rows.push(
        <div className="grid grid-cols-7" key={days[0].toString()}>
          {days.slice(0, 7).map((day, index) => renderCell(day, index))}
        </div>,
      )
      days = days.slice(7)
    }

    return <div>{rows}</div>
  }

  const renderCell = (day, index) => {
    const isToday = isSameDay(day, new Date())
    const isSelected = selectedDate && isSameDay(day, selectedDate)
    const hasEvent = events.some((event) => isSameDay(new Date(event.date), day))

    return (
      <div
        key={index}
        className={`flex justify-center items-center cursor-pointer p-2 rounded-md
         ${
           isSameMonth(day, currentDate) ? '' : 'text-gray-400'
         } ${isToday ? 'bg-cherry_light-600' : ''} ${isSelected ? 'bg-cherry_light-700' : ''} ${
           hasEvent ? 'bg-cherry_light-900' : ''
         }`}
        onClick={() => handleDayClick(day)}
      >
        {format(day, 'd')}
      </div>
    )
  }

  const nextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))
  }

  const handleDayClick = (day) => {
    setSelectedDate(day)
  }

  const renderEventsForSelectedDate = () => {
    if (!selectedDate) return null;

    const filteredEvents = events.filter((event) => isSameDay(new Date(event.date), selectedDate));

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle className='text-md'>Events for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredEvents.length === 0 && <p>No events for this date</p>}
            <ul>
              {filteredEvents.map((event, index) => (
                <li key={index} className="text-sm">
                    {event.title} - {event.time}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <section>
      <div className="w-full max-w-lg mx-auto p-4 bg-white rounded shadow mb-4">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      {/* 
    show events for selected date
    */}
      {renderEventsForSelectedDate()}
    </section>
  )
}

export default Calendar
