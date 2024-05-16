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
import { set } from 'date-fns'
export default function FinancialResponsibilities() {
  const bills: Bill[] = [
    // {
    //   category: 'Rent',
    //   dueDate: '2022-01-01',
    //   amount: 750,
    //   company: 'Landlord',
    // },
    // {
    //   category: 'Utilities',
    //   dueDate: '2022-01-15',
    //   amount: 150,
    //   company: 'Electric Company',
    // },
    // {
    //   category: 'Food',
    //   dueDate: '2022-01-20',
    //   amount: 300,
    //   company: 'Grocery Store',
    // },
  ]

  const [billData, setBillData] = useState(bills)
  const BillSchema = Yup.object().shape({
    category: Yup.string().required('Please select a category'),
    dueDate: Yup.date().required('Please select a due date'),
    amount: Yup.number()
      .required('Please enter an amount')
      .positive('Please enter a positive number')
      .integer('Please enter a whole number')
      .min(1, 'Please enter a number greater than 0'),
    company: Yup.string().required('Please enter a company name').min(2, 'Please enter a company name'),
  })
  const handleSubmit = (values: Bill) => {
    setBillData([...billData, values])
    toast.success('Bill added successfully')
  }
  return (
    <div className="mt-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold w-fit rounded-md text-sm">Bills Overview</h2>
        <ModalDrawer
          title="Edit Bills"
          trigger={
            <div className="flex items-center bg-cherry_light-700 hover:bg-cherry_light-800 p-2 text-sm rounded-md border w-full space-x-2">
              <Image src={editIcon} alt="edit icon" width={15} />
              <p>Edit Bills</p>
            </div>
          }
          content={
            <section>
              <Formik
                initialValues={{
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
                        <Field id="dueDate" name="dueDate" type="date" className="p-2 border rounded-md" />
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
      <div className="space-y-1 flex flex-col items-center w-full ">
        <DataTable columns={columns} data={billData} />
      </div>
    </div>
  )
}
