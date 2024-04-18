import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

type FoodCategory =
  | 'American'
  | 'Chinese'
  | 'Italian'
  | 'Japanese'
  | 'Mexican'
  | 'Thai'
  | 'Vietnamese'
  | 'Greek'
  | 'Other'

type RecentMealTypes = {
  name: string
  category: FoodCategory
  date: string
}

const recentMeals: RecentMealTypes[] = [
  {
    name: 'Chicken Alfredo',
    category: 'Italian',
    date: '2021-10-01',
  },
  {
    name: 'Pad Thai',
    category: 'Thai',
    date: '2021-10-02',
  },
  {
    name: 'Sushi',
    category: 'Japanese',
    date: '2021-10-03',
  },
]

export function MealSelect() {
  return (
    <section>
      {/* Recent meals */}
      <section>
        <h2>Food you&apos;ve had recently</h2>
        {recentMeals.map((meal) => (
          <section key={meal.name}>
            <h3>{meal.name}</h3>
            <p>{meal.category}</p>
            <p>{meal.date}</p>
          </section>
        ))}
      </section>

      {/* Meal Suggest */}
      <section></section>
    </section>
  )
}
