'use client'
import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Formik, Form, useField, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { createBrowserClient } from '@supabase/ssr'
import { nanoid } from 'nanoid'
import { set } from 'date-fns'
import { useState } from 'react'

export default function SavingsGoal({ chaery_bond }: { chaery_bond: string }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState('')
  const GoalSchema = Yup.object().shape({
    goalName: Yup.string()
      .required('Goal Name is required')
      .min(2, 'Goal Name must be at least 2 characters')
      .max(50, 'Goal Name must be less than 50 characters'),
    goalDescription: Yup.string()
      .required('Goal Description is required')
      .min(2, 'Goal Description must be at least 2 characters')
      .max(100, 'Goal Description must be less than 100 characters'),
    targetAmount: Yup.number()
      .test('is-a-number', 'Target Amount must be a number', (value) => {
        if (value === undefined) return false
        return !isNaN(value)
      })
      .required('Target Amount is required')
      .min(1, 'Target Amount must be at least $1'),
    targetDate: Yup.date().required('Target date is required'),
  })

  const handleSubmit = async (values: {
    goalName: string
    goalDescription: string
    targetAmount: string
    targetDate: string
  }) => {
    setIsSubmitting(true)
    const { goalName, goalDescription, targetAmount, targetDate } = values
    const { data: goals, error } = await supabase.from('Goals').upsert([
      {
        chaery_link: chaery_bond,
        goal_name: goalName,
        goal_description: goalDescription,
        goal_amount: targetAmount,
        amount_saved: 0,
        goal_target: targetDate,
        chaery_goal_id: `cheary-goal-${nanoid(8)}`,
      },
    ])
    if (error) {
      setStatus('Error adding goal')
      console.error('Error adding goal:', error)
    } else {
      setStatus('Goal added successfully')
      setTimeout(() => {
        setStatus('')
        setIsSubmitting(false)
        window.location.reload()
      }, 3000)
    }
  }
  return (
    <section className="mx-4">
      <div>
        {status && (
          <div
            className={`${
              status === 'Goal added successfully' ? 'bg-green-200' : 'bg-red-200'
            } p-2 rounded-md text-center`}
          >
            {status}
          </div>
        )}
      </div>
      <Formik
        initialValues={{
          goalName: '',
          goalDescription: '',
          targetAmount: '',
          targetDate: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={GoalSchema}
      >
        {({ handleSubmit }) => (
          <Form className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="goal-name" className="text-left text-sm ">
                Goal Name
              </label>
              <Field
                id="goal-name"
                name="goalName"
                placeholder="e.g. New Car"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <ErrorMessage name="goalName" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="goal-name" className="text-left text-sm ">
                Goal Description
              </label>
              <Field
                id="goal-description"
                name="goalDescription"
                placeholder="e.g. Ferrari 458 Italia"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <ErrorMessage name="goalDescription" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="target-amount" className="text-left text-sm ">
                Target Amount
              </label>
              <Field
                id="target-amount"
                name="targetAmount"
                placeholder="e.g. $128,999"
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <ErrorMessage name="targetAmount" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="target-date" className="text-left text-sm ">
                Target Date
              </label>
              <Field
                id="target-date"
                name="targetDate"
                type="date"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <ErrorMessage name="targetDate" component="div" className="text-red-500 text-sm" />
            </div>
            <Button type="submit" className="w-full bg-cherry_light-700 hover:bg-cherry_light-800">
              {isSubmitting ? 'Adding Goal...' : 'Add Goal'}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
