import React from 'react'
import BudgetSplit from './budget/budget-split'
import EditBtn from './budget/edit-budget'
import BudgetDetails from './budget/budget-details'

export default function BudgetWidget() {
  return (
    <section className="flex flex-col gap-4 flex-grow justify-center font-nunito_sans items-center border-2 border-mauve_dark-500 rounded-md p-2">
      <div className="flex w-full gap-2">
        <BudgetSplit />
        <EditBtn />
      </div>
      <BudgetDetails />
    </section>
  )
}
