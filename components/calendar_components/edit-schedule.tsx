import React from 'react'
type Schedule = {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
export default function EditSchedule({ schedule }: { schedule: Schedule}) {
  return (
    <div>EditSchedule</div>
  )
}
