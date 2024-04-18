import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MealSelect } from './food/meal-select'
import Link from 'next/link'

export default function FoodWidget() {
  return (
    <section className="bg-white-500 px-4 py-3.5  rounded-lg text-black-100 space-y-3 ">
      <section className="flex flex-col gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Dinner Tonight ?</CardTitle>
            <CardDescription>Decide on where and what to eat.</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Dialog>
          <DialogTrigger className="p-2 w-full bg-cherry_light-800 rounded-md">
            <Link href="/home/food">Vote on Food</Link>
          </DialogTrigger>
          <DialogContent className="border-none h-full">
            <DialogHeader>
              <DialogTitle className="text-left text-xl font-nunito_sans font-bold">
                I&apos;m feeling hungry for...
              </DialogTitle>
              <DialogDescription>
                <MealSelect />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
    </section>
  )
}
