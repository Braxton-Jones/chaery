'use client'
import React from 'react'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
type EditProps = {
  schedule: {
    monday_start: string | null
    monday_end: string | null
    tuesday_start: string | null
    tuesday_end: string | null
    wednesday_start: string | null
    wednesday_end: string | null
    thursday_start: string | null
    thursday_end: string | null
    friday_start: string | null
    friday_end: string | null
    saturday_start: string | null
    saturday_end: string | null
    sunday_start: string | null
    sunday_end: string | null
  } | null
  chaerybond: string | null | undefined
}

export default function EditSchedule({ schedule, chaerybond }: EditProps) {
  console.log(schedule)
  console.log(chaerybond)

  const options = [
    { value: "00:00", label: "" },
    { value: "00:00", label: "12:00 AM" },
    { value: "00:30", label: "12:30 AM" },
    { value: "01:00", label: "1:00 AM" },
    { value: "01:30", label: "1:30 AM" },
    { value: "02:00", label: "2:00 AM" },
    { value: "02:30", label: "2:30 AM" },
    { value: "03:00", label: "3:00 AM" },
    { value: "03:30", label: "3:30 AM" },
    { value: "04:00", label: "4:00 AM" },
    { value: "04:30", label: "4:30 AM" },
    { value: "05:00", label: "5:00 AM" },
    { value: "05:30", label: "5:30 AM" },
    { value: "06:00", label: "6:00 AM" },
    { value: "06:30", label: "6:30 AM" },
    { value: "07:00", label: "7:00 AM" },
    { value: "07:30", label: "7:30 AM" },
    { value: "08:00", label: "8:00 AM" },
    { value: "08:30", label: "8:30 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "09:30", label: "9:30 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "10:30", label: "10:30 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "11:30", label: "11:30 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "12:30", label: "12:30 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "13:30", label: "1:30 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "14:30", label: "2:30 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "15:30", label: "3:30 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "16:30", label: "4:30 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "17:30", label: "5:30 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "18:30", label: "6:30 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "19:30", label: "7:30 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "20:30", label: "8:30 PM" },
    { value: "21:00", label: "9:00 PM" },
    { value: "21:30", label: "9:30 PM" },
    { value: "22:00", label: "10:00 PM" },
    { value: "22:30", label: "10:30 PM" },
    { value: "23:00", label: "11:00 PM" },
    { value: "23:30", label: "11:30 PM" }
  ];

  const WeekdayScheduleSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <div className='space-x-3'>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
      </div>
    )
  }

  return (
    <section>
      {/* <h1>Edit Schedule</h1>
      <p>Monday: {schedule?.monday}</p>
      <p>Tuesday: {schedule?.tuesday}</p>
      <p>Wednesday: {schedule?.wednesday}</p>
      <p>Thursday: {schedule?.thursday}</p>
      <p>Friday: {schedule?.friday}</p>
      <p>Saturday: {schedule?.saturday}</p>
      <p>Sunday: {schedule?.sunday}</p> */}
      <h1>Edit Your Schedule</h1>
      <Formik
        initialValues={{
          monday_start: schedule?.monday_start || '',
          monday_end: schedule?.monday_end || '',
          tuesday_start: schedule?.tuesday_start || '',
          tuesday_end: schedule?.tuesday_end || '',
          wednesday_start: schedule?.wednesday_start || '',
          wednesday_end: schedule?.wednesday_end || '',
          thursday_start: schedule?.thursday_start || '',
          thursday_end: schedule?.thursday_end || '',
          friday_start: schedule?.friday_start || '',
          friday_end: schedule?.friday_end || '',
          saturday_start: schedule?.saturday_start || '',
          saturday_end: schedule?.saturday_end || '',
          sunday_start: schedule?.sunday_start || '',
          sunday_end: schedule?.sunday_end || '',
        }}
        // we need to validate the form so that times can't be empty or overlap
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <Form className="mx-7 grid grid-cols-2">
        <div className="flex justify-between flex-col">
        <WeekdayScheduleSelect label="Monday Start" name="monday_start">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
        <WeekdayScheduleSelect label="Monday End" name="monday_end">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
      </div>
      <div className="flex justify-between">
        <WeekdayScheduleSelect label="Tuesday Start" name="tuesday_start">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
        <WeekdayScheduleSelect label="Tuesday End" name="tuesday_end">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
      </div>
      <div className="flex justify-between">
        <WeekdayScheduleSelect label="Wednesday Start" name="wednesday_start">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
        <WeekdayScheduleSelect label="Wednesday End" name="wednesday_end">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
      </div>
      <div className="flex justify-between">
        <WeekdayScheduleSelect label="Thursday Start" name="thursday_start">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
        <WeekdayScheduleSelect label="Thursday End" name="thursday_end">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
      </div>
      <div className="flex justify-between">
        <WeekdayScheduleSelect label="Friday Start" name="friday_start">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
        <WeekdayScheduleSelect label="Friday End" name="friday_end">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
      </div>
      <div className="flex justify-between">
        <WeekdayScheduleSelect label="Saturday Start" name="saturday_start">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
        <WeekdayScheduleSelect label="Saturday End" name="saturday_end">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
      </div>
      <div className="flex justify-between">
        <WeekdayScheduleSelect label="Sunday Start" name="sunday_start">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
        <WeekdayScheduleSelect label="Sunday End" name="sunday_end">
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </WeekdayScheduleSelect>
      </div>

          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </section>
  )
}
