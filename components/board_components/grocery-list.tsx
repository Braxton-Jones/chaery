'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import GroceryListItem from './grocery_list-item'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { nanoid } from 'nanoid'
import ModalDrawer from '../modalDrawer'
import { Formik, Form, useField, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { createBrowserClient } from '@supabase/ssr'
import { toast } from 'sonner'

export type GroceryItem = {
  id: string
  name: string
  category: 'produce' | 'meat' | 'dairy' | 'pantry' | 'frozen' | 'other'
  quantity: string
  quantityType: 'lbs' | 'oz' | 'g' | 'each' | 'dozen' | 'lb'
  checked: boolean
}

export default function GroceryList({
  chaery_link,
  groceries,
  currentUser,
}: {
  chaery_link: string
  groceries: any
  currentUser: any
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(groceries)

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const newItem = {
      id: `item-${nanoid(10)}`,
      name: values.name,
      category: values.category as 'produce' | 'meat' | 'dairy' | 'pantry' | 'frozen' | 'other',
      quantity: values.quantity,
      quantityType: values.quantityType as 'lbs' | 'oz' | 'g' | 'each' | 'dozen' | 'lb',
      checked: false,
    }

    const { data, error } = await supabase
      .from('Relationships')
      .update({
        couples_groceries: [...groceryItems, newItem],
      })
      .eq('chaery_link_id', chaery_link)
    if (error) {
      console.error(error)
      toast.error('An error occurred while adding item')
      return
    }
    if (['produce', 'meat', 'dairy', 'pantry', 'frozen', 'other'].includes(values.category)) {
      setGroceryItems([...groceryItems, newItem])
      toast.success(`${values.name} added to grocery list`)
      resetForm()
    }
  }

  function GroceryListItem({ id, name, category, quantity, checked }: GroceryItem) {
    const [checkedState, setChecked] = useState(checked)

    const toggleChecked = async () => {
      console.log(checkedState)
      setChecked(!checkedState)

      const { data, error } = await supabase
        .from('Relationships')
        .update({ couples_groceries: groceryItems })
        .eq('chaery_link_id', chaery_link)
      if (error) {
        console.error(error)
        toast.error('An error occurred while updating grocery item')
        return
      }
    }

    const handleDelete = async () => {
      const updatedItems = groceryItems.filter((item) => item.id !== id)
      setGroceryItems(updatedItems)

      const { data, error } = await supabase
        .from('Relationships')
        .update({ couples_groceries: updatedItems })
        .eq('chaery_link_id', chaery_link)
      if (error) {
        console.error(error)
        toast.error('An error occurred while deleting grocery item')
        return
      }
    }

    return (
      <Card className={`flex flex-row justify-between items-center ${checkedState ? 'bg-white-600' : ''}`}>
        <div className="flex items-center">
          <TrashIcon className="h-5 w-6 text-gray-500 cursor-pointer ml-3" onClick={handleDelete} />
          <CardHeader>
            <CardTitle className="text-sm">
              {name} / <span className="text-white-300 text-xs">{category}</span>
            </CardTitle>
            <CardDescription className="text-xs">{quantity}</CardDescription>
          </CardHeader>
        </div>

        <div className="mr-5 flex items-center justify-center">
          <Checkbox
            checked={checkedState}
            onClick={toggleChecked}
            className=" data-[state=checked]:bg-cherry_light-700"
          />
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card className="h-fit">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-black">Grocery List</CardTitle>
            <ModalDrawer
              title="Add a new item to your grocery list"
              trigger={
                <p className="flex items-center bg-cherry_light-700 font-semibold hover:bg-cherry_light-800 p-2 text-sm  text-white rounded-md border w-full">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Item
                </p>
              }
              content={
                <Formik
                  initialValues={{
                    name: '',
                    category: 'produce',
                    quantity: '',
                    quantityType: 'lbs',
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string()
                      .required('Required')
                      .min(2, 'Must be at least 2 characters')
                      .max(50, 'Must be 50 characters or less'),
                    category: Yup.string()
                      .required('Required')
                      .oneOf(['produce', 'meat', 'dairy', 'pantry', 'frozen', 'other'], 'Invalid category'),
                    quantity: Yup.number()
                      .required('Required')
                      .positive('Must be a positive number')
                      .integer('Must be a whole number')
                      .min(1, 'Must be at least 1')
                      .max(1000, 'Must be 1000 or less'),
                    quantityType: Yup.string()
                      .required('Required')
                      .oneOf(['lbs', 'oz', 'g', 'each', 'dozen', 'lb'], 'Invalid quantity type'),
                  })}
                  onSubmit={handleSubmit}
                >
                  <Form className="space-y-4 mx-4 text-sm">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="name" className="">
                        Name
                      </label>
                      <Field // Use Field component for input binding
                        type="text"
                        id="name"
                        name="name"
                        className="p-2 border rounded-md"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="category" className="">
                        Category
                      </label>
                      <Field // Use Field component for input binding
                        as="select"
                        id="category"
                        name="category"
                        className="p-2 border rounded-md "
                      >
                        <option value="produce">Produce</option>
                        <option value="meat">Meat</option>
                        <option value="dairy">Dairy</option>
                        <option value="pantry">Pantry</option>
                        <option value="frozen">Frozen</option>
                        <option value="other">Other</option>
                      </Field>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="quantity" className="">
                        Quantity
                      </label>
                      <Field // Use Field component for input binding
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="p-2 border rounded-md"
                      />
                      <ErrorMessage name="quantity" component="div" className="text-red-500" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="quantityType" className="">
                        Quantity Type
                      </label>
                      <Field // Use Field component for input binding
                        as="select"
                        id="quantityType"
                        name="quantityType"
                        className="p-2 border rounded-md"
                      >
                        <option value="lbs">lbs</option>
                        <option value="oz">oz</option>
                        <option value="g">g</option>
                        <option value="each">each</option>
                        <option value="dozen">dozen</option>
                        <option value="lb">lb</option>
                      </Field>
                    </div>
                    <button type="submit" className="p-2 border rounded-md w-full hover:bg-cherry_light-800">
                      Add Item
                    </button>
                  </Form>
                </Formik>
              }
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {groceryItems.length === 0 && (
            <CardDescription className="text-center text-gray-500">Your grocery list is empty.</CardDescription>
          )}
          {groceryItems.map((item, index) => (
            <GroceryListItem
              key={index}
              id={item.id}
              name={item.name}
              category={item.category}
              quantityType={item.quantityType}
              quantity={`${item.quantity} ${item.quantityType}`}
              checked={item.checked}
            />
          ))}
        </CardContent>
      </Card>
    </>
  )
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
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
