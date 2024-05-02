'use client'
import React from 'react'
type EditProps = {
  schedule: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  } | null
  chaerybond: string | null | undefined
}
export default function EditSchedule({ schedule, chaerybond }: EditProps) {
  console.log(schedule)
  console.log(chaerybond)
  return (
    <section>
      <h1>Edit Schedule</h1>
      <p>Monday: {schedule?.monday}</p>
      <p>Tuesday: {schedule?.tuesday}</p>
      <p>Wednesday: {schedule?.wednesday}</p>
      <p>Thursday: {schedule?.thursday}</p>
      <p>Friday: {schedule?.friday}</p>
      <p>Saturday: {schedule?.saturday}</p>
      <p>Sunday: {schedule?.sunday}</p>
    </section>
  )
}
