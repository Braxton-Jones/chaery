'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DataTable } from './bill-table'
import { columns } from './bill-columns'
import { Bill } from './bill-columns'
import editIcon from '@/public/edit.svg'
import plus from '@/public/plus.svg'
import Image from 'next/image'
import ModalDrawer from '@/components/modalDrawer'
import { useState } from 'react'
import { toast } from 'sonner'
import { createBrowserClient } from '@supabase/ssr'
import { nanoid } from 'nanoid'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function FinancialResponsibilities({ chaery_link, bills }: { chaery_link: string; bills: Bill[] }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const [billData, setBillData] = useState(bills)
  console.log(billData, 'billData')
  const BillSchema = Yup.object().shape({
    category: Yup.string().required('Please select a category'),
    dueDate: Yup.string()
      .required('Please select a due date')
      .test('is-not-null', 'Please select a due date', (value) => value !== ''),
    amount: Yup.number()
      .required('Please enter an amount')
      .positive('Please enter a positive number')
      .integer('Please enter a whole number')
      .min(1, 'Please enter a number greater than 0'),
    company: Yup.string().required('Please enter a company name').min(2, 'Please enter a company name'),
  })

  const handleSubmit = async (values: Bill) => {
    const formattedValues = {
      ...values,
      id: `bill_${nanoid(7)}`,
    }
    const { data, error } = await supabase
      .from('Relationships')
      .update({
        couples_bills: [...billData, formattedValues],
      })
      .eq('chaery_link_id', chaery_link)
    if (error) {
      console.error(error)
      toast.error('An error occurred while adding bill')
      return
    }
    setBillData([...billData, formattedValues])
    toast.success('Bill added successfully')
  }

  const handleDelete = async (id: string) => {
    const { data, error } = await supabase
      .from('Relationships')
      .update({
        couples_bills: billData.filter((bill) => bill.id !== id),
      })
      .eq('chaery_link_id', chaery_link)
    if (error) {
      console.error(error)
      toast.error('An error occurred while deleting bill')
      return
    }
    setBillData(billData.filter((bill) => bill.id !== id))
    toast.success('Bill deleted successfully')
  }
  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold w-fit rounded-md text-sm">Bills Overview</h2>
        <div className="flex items-center space-x-2">
          <ModalDrawer
            title="Add Bills"
            trigger={
              <div className="flex items-center bg-cherry_light-700 hover:bg-cherry_light-800 py-2 px-7 text-sm rounded-md border w-full space-x-2 text-white font-semibold">
                <p>Add Bills</p>
              </div>
            }
            content={
              <section>
                <Formik
                  initialValues={{
                    id: '',
                    category: null,
                    dueDate: '',
                    amount: 0,
                    company: '',
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={BillSchema}
                >
                  {({ isSubmitting }) => (
                    <Form className="mx-4 text-sm">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="category" className="text-sm">
                            Category
                          </label>
                          <Field
                            id="category"
                            name="category"
                            as="select"
                            className="p-2 border rounded-md bg-white-900 py-3"
                          >
                            <option value="" className="p-2 font-inter">
                              Select Category
                            </option>
                            <option value="Rent" className="p-2 font-inter">
                              Rent
                            </option>
                            <option value="Utilities" className="p-2 font-inter">
                              Utilities
                            </option>
                            <option value="Food" className="p-2 font-inter">
                              Food
                            </option>
                            <option value="Entertainment" className="p-2 font-inter">
                              Entertainment
                            </option>
                            <option value="Internet" className="p-2 font-inter">
                              Internet
                            </option>
                            <option value="Phone" className="p-2 font-inter">
                              Phone
                            </option>
                            <option value="Insurance" className="p-2 font-inter">
                              Insurance
                            </option>
                            <option value="Other" className="p-2 font-inter">
                              Other
                            </option>
                          </Field>
                          <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label htmlFor="dueDate">Due Date</label>
                          <Field
                            id="dueDate"
                            name="dueDate"
                            as="select"
                            className="p-2 border rounded-md bg-white-900 py-3"
                          >
                            <option value="" className="p-2 font-inter">
                              Select Due Day
                            </option>
                            <option value="1st" className="p-2 font-inter">
                              1st of each month
                            </option>
                            <option value="2nd" className="p-2 font-inter">
                              2nd of each month
                            </option>
                            <option value="3rd" className="p-2 font-inter">
                              3rd of each month
                            </option>
                            <option value="4th" className="p-2 font-inter">
                              4th of each month
                            </option>
                            <option value="5th" className="p-2 font-inter">
                              5th of each month
                            </option>
                            <option value="6th" className="p-2 font-inter">
                              6th of each month
                            </option>
                            <option value="7th" className="p-2 font-inter">
                              7th of each month
                            </option>
                            <option value="8th" className="p-2 font-inter">
                              8th of each month
                            </option>
                            <option value="9th" className="p-2 font-inter">
                              9th of each month
                            </option>
                            <option value="10th" className="p-2 font-inter">
                              10th of each month
                            </option>
                            <option value="11th" className="p-2 font-inter">
                              11th of each month
                            </option>
                            <option value="12th" className="p-2 font-inter">
                              12th of each month
                            </option>
                            <option value="13th" className="p-2 font-inter">
                              13th of each month
                            </option>
                            <option value="14th" className="p-2 font-inter">
                              14th of each month
                            </option>
                            <option value="15th" className="p-2 font-inter">
                              15th of each month
                            </option>
                            <option value="16th" className="p-2 font-inter">
                              16th of each month
                            </option>
                            <option value="17th" className="p-2 font-inter">
                              17th of each month
                            </option>
                            <option value="18th" className="p-2 font-inter">
                              18th of each month
                            </option>
                            <option value="19th" className="p-2 font-inter">
                              19th of each month
                            </option>
                            <option value="20th" className="p-2 font-inter">
                              20th of each month
                            </option>
                            <option value="21st" className="p-2 font-inter">
                              21st of each month
                            </option>
                            <option value="22nd" className="p-2 font-inter">
                              22nd of each month
                            </option>
                            <option value="23rd" className="p-2 font-inter">
                              23rd of each month
                            </option>
                            <option value="24th" className="p-2 font-inter">
                              24th of each month
                            </option>
                            <option value="25th" className="p-2 font-inter">
                              25th of each month
                            </option>
                            <option value="26th" className="p-2 font-inter">
                              26th of each month
                            </option>
                            <option value="27th" className="p-2 font-inter">
                              27th of each month
                            </option>
                            <option value="28th" className="p-2 font-inter">
                              28th of each month
                            </option>
                            <option value="29th" className="p-2 font-inter">
                              29th of each month
                            </option>
                            <option value="30th" className="p-2 font-inter">
                              30th of each month
                            </option>
                          </Field>
                          <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="amount">Amount</label>
                          <Field
                            id="amount"
                            name="amount"
                            type="number"
                            className="p-2 border rounded-md"
                            placeholder="200"
                          />
                          <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="company">Company</label>
                          <Field id="company" name="company" placeholder="Landlord" className="p-2 border rounded-md" />
                          <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-cherry_light-700 hover:bg-cherry_light-800 text-white p-2 rounded-md"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </section>
            }
          />
        </div>
      </div>
      <div className="space-y-4 flex flex-col items-center w-full ">
        <DataTable columns={columns} data={billData} />
        <div className="w-full space-y-4">
          <h3 className="font-semibold">Bill Details</h3>
          {billData.map((bill, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{bill.category} Bill</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-md flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <p>Company: {bill.company}</p>
                    <p>Amount: ${bill.amount}</p>
                    <p>Due Date: {bill.dueDate} of each month</p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <Popover>
                    <Button variant="secondary" size="sm" className="bg-cherry_light-700 hover:bg-cherry_light-900" asChild>
                    <PopoverTrigger>Edit</PopoverTrigger>
                    </Button>
                      <PopoverContent>
                      {/* 
                        Edit Bill
                       */}
                      <Formik
                        initialValues={{
                          id: bill.id,
                          category: bill.category,
                          dueDate: bill.dueDate,
                          amount: bill.amount,
                          company: bill.company,
                        }}
                        onSubmit={async (values) => {
                          const { data, error } = await supabase
                            .from('Relationships')
                            .update({
                              couples_bills: billData.map((bill) => (bill.id === values.id ? values : bill)),
                            })
                            .eq('chaery_link_id', chaery_link)
                          if (error) {
                            console.error(error)
                            toast.error('An error occurred while updating bill')
                            return
                          }
                          setBillData(billData.map((bill) => (bill.id === values.id ? values : bill)))
                          toast.success('Bill updated successfully')
                        }}
                        validationSchema={BillSchema}
                      >
                        {({ isSubmitting }) => (
                          <Form className="mx-4 text-sm">
                            <div className="flex flex-col space-y-4">
                              <div className="flex flex-col space-y-2">
                                <label htmlFor="category" className="text-sm">
                                  Category
                                </label>
                                <Field
                                  id="category"
                                  name="category"
                                  as="select"
                                  className="p-2 border rounded-md bg-white-900 py-3"
                                >
                                  <option value="" className="p-2 font-inter">
                                    Select Category
                                  </option>
                                  <option value="Rent" className="p-2 font-inter">
                                    Rent
                                  </option>
                                  <option value="Utilities" className="p-2 font-inter">
                                    Utilities
                                  </option>
                                  <option value="Food" className="p-2 font-inter">
                                    Food
                                  </option>
                                  <option value="Entertainment" className="p-2 font-inter">
                                    Entertainment
                                  </option>
                                  <option value="Internet" className="p-2 font-inter">
                                    Internet
                                  </option>
                                  <option value="Phone" className="p-2 font-inter">
                                    Phone
                                  </option>
                                  <option value="Insurance" className="p-2 font-inter">
                                    Insurance
                                  </option>
                                  <option value="Other" className="p-2 font-inter">
                                    Other
                                  </option>
                                </Field>
                                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                              </div>

                              <div className="flex flex-col space-y-2">
                          <label htmlFor="dueDate">Due Date</label>
                          <Field
                            id="dueDate"
                            name="dueDate"
                            as="select"
                            className="p-2 border rounded-md bg-white-900 py-3"
                          >
                            <option value="" className="p-2 font-inter">
                              Select Due Day
                            </option>
                            <option value="1st" className="p-2 font-inter">
                              1st of each month
                            </option>
                            <option value="2nd" className="p-2 font-inter">
                              2nd of each month
                            </option>
                            <option value="3rd" className="p-2 font-inter">
                              3rd of each month
                            </option>
                            <option value="4th" className="p-2 font-inter">
                              4th of each month
                            </option>
                            <option value="5th" className="p-2 font-inter">
                              5th of each month
                            </option>
                            <option value="6th" className="p-2 font-inter">
                              6th of each month
                            </option>
                            <option value="7th" className="p-2 font-inter">
                              7th of each month
                            </option>
                            <option value="8th" className="p-2 font-inter">
                              8th of each month
                            </option>
                            <option value="9th" className="p-2 font-inter">
                              9th of each month
                            </option>
                            <option value="10th" className="p-2 font-inter">
                              10th of each month
                            </option>
                            <option value="11th" className="p-2 font-inter">
                              11th of each month
                            </option>
                            <option value="12th" className="p-2 font-inter">
                              12th of each month
                            </option>
                            <option value="13th" className="p-2 font-inter">
                              13th of each month
                            </option>
                            <option value="14th" className="p-2 font-inter">
                              14th of each month
                            </option>
                            <option value="15th" className="p-2 font-inter">
                              15th of each month
                            </option>
                            <option value="16th" className="p-2 font-inter">
                              16th of each month
                            </option>
                            <option value="17th" className="p-2 font-inter">
                              17th of each month
                            </option>
                            <option value="18th" className="p-2 font-inter">
                              18th of each month
                            </option>
                            <option value="19th" className="p-2 font-inter">
                              19th of each month
                            </option>
                            <option value="20th" className="p-2 font-inter">
                              20th of each month
                            </option>
                            <option value="21st" className="p-2 font-inter">
                              21st of each month
                            </option>
                            <option value="22nd" className="p-2 font-inter">
                              22nd of each month
                            </option>
                            <option value="23rd" className="p-2 font-inter">
                              23rd of each month
                            </option>
                            <option value="24th" className="p-2 font-inter">
                              24th of each month
                            </option>
                            <option value="25th" className="p-2 font-inter">
                              25th of each month
                            </option>
                            <option value="26th" className="p-2 font-inter">
                              26th of each month
                            </option>
                            <option value="27th" className="p-2 font-inter">
                              27th of each month
                            </option>
                            <option value="28th" className="p-2 font-inter">
                              28th of each month
                            </option>
                            <option value="29th" className="p-2 font-inter">
                              29th of each month
                            </option>
                            <option value="30th" className="p-2 font-inter">
                              30th of each month
                            </option>
                          </Field>
                          <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="amount">Amount</label>
                          <Field
                            id="amount"
                            name="amount"
                            type="number"
                            className="p-2 border rounded-md"
                            placeholder="200"
                          />
                          <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="company">Company</label>
                          <Field id="company" name="company" placeholder="Landlord" className="p-2 border rounded-md" />
                          <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-cherry_light-700 hover:bg-cherry_light-800 text-white p-2 rounded-md"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                                  

                      </PopoverContent>
                    </Popover>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-cherry_light-500 hover:bg-cherry_light-600 hover:text-white"
                      onClick={() => handleDelete(bill.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
