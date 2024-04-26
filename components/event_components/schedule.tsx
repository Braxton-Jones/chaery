import React from 'react'
type ScheduleProps = {
    name: string
    schedule:{
        monday: string,
        tuesday: string,
        wednesday: string,
        thursday: string,
        friday: string,
        saturday: string,
        sunday: string
    }
    isUser: boolean
}

export default function Schedule(
    {name, schedule, isUser}: ScheduleProps
) {
  return (
    <div>Schedule</div>
  )
}
