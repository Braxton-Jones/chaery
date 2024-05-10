'use client'
import React from 'react'
import { Formik, Form, useField, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '../ui/button'
import { createBrowserClient } from '@supabase/ssr'

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
type SubmitProps = {
  monday_start: string
  monday_end: string
  tuesday_start: string
  tuesday_end: string
  wednesday_start: string
  wednesday_end: string
  thursday_start: string
  thursday_end: string
  friday_start: string
  friday_end: string
  saturday_start: string
  saturday_end: string
  sunday_start: string
  sunday_end: string
}

export default function EditSchedule({ schedule, chaerybond }: EditProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [statusMessage, setStatusMessage] = React.useState('')

  const options = [
    { value: '', label: 'Select Time', disabled: true },
    { value: 'Off', label: 'Off' },
    { value: '00:00', label: '12:00 AM' },
    { value: '00:30', label: '12:30 AM' },
    { value: '01:00', label: '1:00 AM' },
    { value: '01:30', label: '1:30 AM' },
    { value: '02:00', label: '2:00 AM' },
    { value: '02:30', label: '2:30 AM' },
    { value: '03:00', label: '3:00 AM' },
    { value: '03:30', label: '3:30 AM' },
    { value: '04:00', label: '4:00 AM' },
    { value: '04:30', label: '4:30 AM' },
    { value: '05:00', label: '5:00 AM' },
    { value: '05:30', label: '5:30 AM' },
    { value: '06:00', label: '6:00 AM' },
    { value: '06:30', label: '6:30 AM' },
    { value: '07:00', label: '7:00 AM' },
    { value: '07:30', label: '7:30 AM' },
    { value: '08:00', label: '8:00 AM' },
    { value: '08:30', label: '8:30 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '09:30', label: '9:30 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '12:30', label: '12:30 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '13:30', label: '1:30 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '14:30', label: '2:30 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '15:30', label: '3:30 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '16:30', label: '4:30 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '17:30', label: '5:30 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '18:30', label: '6:30 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '19:30', label: '7:30 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '20:30', label: '8:30 PM' },
    { value: '21:00', label: '9:00 PM' },
    { value: '21:30', label: '9:30 PM' },
    { value: '22:00', label: '10:00 PM' },
    { value: '22:30', label: '10:30 PM' },
    { value: '23:00', label: '11:00 PM' },
    { value: '23:30', label: '11:30 PM' },
  ]

  const WeekdayScheduleSelect = ({ label, ...props }: { label: string; [key: string]: any }) => {
    const [field, meta] = useField({ ...props, name: props.name })
    return (
      <div>
        <label htmlFor={props.id || props.name} className="hidden">
          {label}
        </label>
        <select
          {...field}
          {...props}
          className="flex  h-10 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm  placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        />
      </div>
    )
  }

  const ScheduleSchema = Yup.object().shape({
    monday_start: Yup.string()
      .required('Start Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { monday_end } = this.parent
        if (value === 'Off' && monday_end !== 'Off') {
          return false
        }
        return true
      })
      .test('startTime-is-before-endTime', 'Start time must be before end time', function (value) {
        const { monday_end } = this.parent
        if (value === 'Off' && monday_end === 'Off') {
          return true
        }
        if (value && monday_end) {
          return value < monday_end
        }
        return true
      }),
    monday_end: Yup.string()
      .required('End Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { monday_start } = this.parent
        if (value === 'Off' && monday_start !== 'Off') {
          return false
        }
        return true
      })
      .test('endTime-is-after-startTime', 'End time must be after start time', function (value) {
        const { monday_start } = this.parent
        if (value === 'Off' && monday_start === 'Off') {
          return true
        }
        if (value && monday_start) {
          return value > monday_start
        }
        return true
      }),
    tuesday_start: Yup.string()
      .required('Start Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { tuesday_end } = this.parent
        if (value === 'Off' && tuesday_end !== 'Off') {
          return false
        }
        return true
      })
      .test('startTime-is-before-endTime', 'Start time must be before end time', function (value) {
        const { tuesday_end } = this.parent
        if (value === 'Off' && tuesday_end === 'Off') {
          return true
        }
        if (value && tuesday_end) {
          return value < tuesday_end
        }
        return true
      }),
    tuesday_end: Yup.string()
      .required('End Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { tuesday_start } = this.parent
        if (value === 'Off' && tuesday_start !== 'Off') {
          return false
        }
        return true
      })
      .test('endTime-is-after-startTime', 'End time must be after start time', function (value) {
        const { tuesday_start } = this.parent
        if (value === 'Off' && tuesday_start === 'Off') {
          return true
        }
        if (value && tuesday_start) {
          return value > tuesday_start
        }
        return true
      }),
    wednesday_start: Yup.string()
      .required('Start Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { wednesday_end } = this.parent
        if (value === 'Off' && wednesday_end !== 'Off') {
          return false
        }
        return true
      })
      .test('startTime-is-before-endTime', 'Start time must be before end time', function (value) {
        const { wednesday_end } = this.parent
        if (value === 'Off' && wednesday_end === 'Off') {
          return true
        }
        if (value && wednesday_end) {
          return value < wednesday_end
        }
        return true
      }),
    wednesday_end: Yup.string()
      .required('End Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { wednesday_start } = this.parent
        if (value === 'Off' && wednesday_start !== 'Off') {
          return false
        }
        return true
      })
      .test('endTime-is-after-startTime', 'End time must be after start time', function (value) {
        const { wednesday_start } = this.parent
        if (value === 'Off' && wednesday_start === 'Off') {
          return true
        }
        if (value && wednesday_start) {
          return value > wednesday_start
        }
        return true
      }),
    thursday_start: Yup.string()
      .required('Start Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { thursday_end } = this.parent
        if (value === 'Off' && thursday_end !== 'Off') {
          return false
        }
        return true
      })
      .test('startTime-is-before-endTime', 'Start time must be before end time', function (value) {
        const { thursday_end } = this.parent
        if (value === 'Off' && thursday_end === 'Off') {
          return true
        }
        if (value && thursday_end) {
          return value < thursday_end
        }
        return true
      }),
    thursday_end: Yup.string()
      .required('End Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { thursday_start } = this.parent
        if (value === 'Off' && thursday_start !== 'Off') {
          return false
        }
        return true
      })
      .test('endTime-is-after-startTime', 'End time must be after start time', function (value) {
        const { thursday_start } = this.parent
        if (value === 'Off' && thursday_start === 'Off') {
          return true
        }
        if (value && thursday_start) {
          return value > thursday_start
        }
        return true
      }),
    friday_start: Yup.string()
      .required('Start Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { friday_end } = this.parent
        if (value === 'Off' && friday_end !== 'Off') {
          return false
        }
        return true
      })
      .test('startTime-is-before-endTime', 'Start time must be before end time', function (value) {
        const { friday_end } = this.parent
        if (value === 'Off' && friday_end === 'Off') {
          return true
        }
        if (value && friday_end) {
          return value < friday_end
        }
        return true
      }),
    friday_end: Yup.string()
      .required('End Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { friday_start } = this.parent
        if (value === 'Off' && friday_start !== 'Off') {
          return false
        }
        return true
      })
      .test('endTime-is-after-startTime', 'End time must be after start time', function (value) {
        const { friday_start } = this.parent
        if (value === 'Off' && friday_start === 'Off') {
          return true
        }
        if (value && friday_start) {
          return value > friday_start
        }
        return true
      }),
    saturday_start: Yup.string()
      .required('Start Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { saturday_end } = this.parent
        if (value === 'Off' && saturday_end !== 'Off') {
          return false
        }
        return true
      })
      .test('startTime-is-before-endTime', 'Start time must be before end time', function (value) {
        const { saturday_end } = this.parent
        if (value === 'Off' && saturday_end === 'Off') {
          return true
        }
        if (value && saturday_end) {
          return value < saturday_end
        }
        return true
      }),
    saturday_end: Yup.string()
      .required('End Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { saturday_start } = this.parent
        if (value === 'Off' && saturday_start !== 'Off') {
          return false
        }
        return true
      })
      .test('endTime-is-after-startTime', 'End time must be after start time', function (value) {
        const { saturday_start } = this.parent
        if (value === 'Off' && saturday_start === 'Off') {
          return true
        }
        if (value && saturday_start) {
          return value > saturday_start
        }
        return true
      }),
    sunday_start: Yup.string()
      .required('Start Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { sunday_end } = this.parent
        if (value === 'Off' && sunday_end !== 'Off') {
          return false
        }
        return true
      })
      .test('startTime-is-before-endTime', 'Start time must be before end time', function (value) {
        const { sunday_end } = this.parent
        if (value === 'Off' && sunday_end === 'Off') {
          return true
        }
        if (value && sunday_end) {
          return value < sunday_end
        }
        return true
      }),
    sunday_end: Yup.string()
      .required('End Time Required')
      .test('Both-Off', "Both start and end time must be 'Off'", function (value) {
        const { sunday_start } = this.parent
        if (value === 'Off' && sunday_start !== 'Off') {
          return false
        }
        return true
      })
      .test('endTime-is-after-startTime', 'End time must be after start time', function (value) {
        const { sunday_start } = this.parent
        if (value === 'Off' && sunday_start === 'Off') {
          return true
        }
        if (value && sunday_start) {
          return value > sunday_start
        }
        return true
      }),
  })

  const handleSubmit = async (values: SubmitProps) => {
    setIsSubmitting(true)
    // Turn values into a JSON object
    const JSON_Schedule = JSON.stringify(values)
    // Get the current date and time
    const currentDate = new Date()

    // Format the date and time as "MM/DD/YYYY hh:mmA"
    const formattedDateTime = currentDate.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    // Send JSON object to Supabase
    const { data, error } = await supabase
      .from('Users')
      .update({
        schedule: JSON_Schedule,
        last_schedule_update: formattedDateTime,
      })
      .eq('chaery_id', chaerybond)

    if (error) {
      setStatusMessage('Error updating schedule')
      console.log(error)
    }
    if (!error) {
      setStatusMessage('Schedule updated successfully')
      setIsSubmitting(false)
      // close the modal by refreshing the page
      setTimeout(() => {
        window.location.reload()
        setStatusMessage('')
      }, 1000)
    }
  }

  return (
    <section>
      {statusMessage && <p className="text-cherry_light-700">{statusMessage}</p>}
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
        validationSchema={ScheduleSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mx-7 space-y-3">
          <section className="flex justify-between flex-col gap-2 items-center">
            <h2 className="self-start">Monday</h2>
            <div className="flex gap-6 items-center">
              <WeekdayScheduleSelect label="Monday Start" name="monday_start">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
              <p>To</p>
              <WeekdayScheduleSelect label="Monday End" name="monday_end">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
            </div>
            <div className="flex gap-14">
              <ErrorMessage name="monday_start" component="div" className="text-cherry_dark-500" />
              <ErrorMessage name="monday_end" component="div" className="text-cherry_dark-500" />
            </div>{' '}
          </section>

          <section className="flex justify-between flex-col gap-2 items-center">
            <h2 className="self-start">Tuesday</h2>
            <div className="flex gap-6 items-center">
              <WeekdayScheduleSelect label="Tuesday Start" name="tuesday_start">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
              <p>To</p>
              <WeekdayScheduleSelect label="Tuesday End" name="tuesday_end">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
            </div>
            <div className="flex gap-14">
              <ErrorMessage name="tuesday_start" component="div" className="text-cherry_dark-500" />
              <ErrorMessage name="tuesday_end" component="div" className="text-cherry_dark-500" />
            </div>
          </section>

          <section className="flex justify-between flex-col gap-2 items-center">
            <h2 className="self-start">Wednesday</h2>
            <div className="flex gap-6 items-center">
              <WeekdayScheduleSelect label="Wednesday Start" name="wednesday_start">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
              <p>To</p>
              <WeekdayScheduleSelect label="Wednesday End" name="wednesday_end">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
            </div>
            <div className="flex gap-14">
              <ErrorMessage name="wednesday_start" component="div" className="text-cherry_dark-500" />
              <ErrorMessage name="wednesday_end" component="div" className="text-cherry_dark-500" />
            </div>
          </section>

          <section className="flex justify-between flex-col gap-2 items-center">
            <h2 className="self-start">Thursday</h2>
            <div className="flex gap-6 items-center">
              <WeekdayScheduleSelect label="Thursday Start" name="thursday_start">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
              <p>To</p>
              <WeekdayScheduleSelect label="Thursday End" name="thursday_end">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
            </div>
            <div className="flex gap-14">
              <ErrorMessage name="thursday_start" component="div" className="text-cherry_dark-500" />
              <ErrorMessage name="thursday_end" component="div" className="text-cherry_dark-500" />
            </div>
          </section>

          <section className="flex justify-between flex-col gap-2 items-center">
            <h2 className="self-start">Friday</h2>
            <div className="flex gap-6 items-center">
              <WeekdayScheduleSelect label="Friday Start" name="friday_start">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
              <p>To</p>
              <WeekdayScheduleSelect label="Friday End" name="friday_end">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
            </div>
            <div className="flex gap-14">
              <ErrorMessage name="friday_start" component="div" className="text-cherry_dark-500" />
              <ErrorMessage name="friday_end" component="div" className="text-cherry_dark-500" />
            </div>{' '}
          </section>

          <section className="flex justify-between flex-col gap-2 items-center">
            <h2 className="self-start">Saturday</h2>
            <div className="flex gap-6 items-center">
              <WeekdayScheduleSelect label="Saturday Start" name="saturday_start">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
              <p>To</p>
              <WeekdayScheduleSelect label="Saturday End" name="saturday_end">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
            </div>
            <div className="flex gap-14">
              <ErrorMessage name="saturday_start" component="div" className="text-cherry_dark-500" />
              <ErrorMessage name="saturday_end" component="div" className="text-cherry_dark-500" />
            </div>
          </section>

          <section className="flex justify-between flex-col gap-2 items-center">
            <h2 className="self-start">Sunday</h2>
            <div className="flex gap-6 items-center">
              <WeekdayScheduleSelect label="Sunday Start" name="sunday_start">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
              <p>To</p>
              <WeekdayScheduleSelect label="Sunday End" name="sunday_end">
                {options.map((option, index) => (
                  <option key={index} value={option.value} disabled={option.disabled} className="bg-white-900 p-6">
                    {option.label}
                  </option>
                ))}
              </WeekdayScheduleSelect>
            </div>
            <div className="flex gap-14">
              <ErrorMessage name="sunday_start" component="div" className="text-cherry_dark-500" />
              <ErrorMessage name="sunday_end" component="div" className="text-cherry_dark-500" />
            </div>
          </section>

          <div className="flex gap-2">
            {/* <Button
              variant="outline"
              className="w-full bg-white-900 text-cherry_medium-700 hover:bg-white-600"
              type="reset"
            >
              Clear Schedule
            </Button> */}
            <Button variant="outline" className="w-full bg-cherry_medium-700 text-white hover:bg" type="submit">
              {isSubmitting ? 'Updating...' : 'Update Schedule'}
            </Button>
          </div>
        </Form>
      </Formik>
    </section>
  )
}
