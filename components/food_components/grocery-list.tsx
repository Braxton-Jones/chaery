import React from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import GroceryListItem from './grocery_list-item'

export default function GroceryList() {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-950">
      <h2 className="text-2xl font-bold mb-4 text-black">Grocery List</h2>
      <ul className="grid gap-4">
        <GroceryListItem id="item-1" title="Tomatoes" quantity="3 lbs" />
        <GroceryListItem id="item-2" title="Chicken Breasts" quantity="2 lbs" />
        <GroceryListItem id="item-3" title="Broccoli" quantity="1 lb" />
        <GroceryListItem id="item-4" title="Eggs" quantity="1 dozen" />
      </ul>
    </section>
  )
}
