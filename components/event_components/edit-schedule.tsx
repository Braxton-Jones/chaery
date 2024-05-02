import React from 'react'
type Schedule = {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
} | null
export default function EditSchedule({ schedule }: { schedule: Schedule }) {
  // We need to make a form that creates or edits the schedule for a User
  return <div>EditSchedule</div>
}
