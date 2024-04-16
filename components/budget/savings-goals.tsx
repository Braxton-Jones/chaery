import React from 'react'
import { Button } from '@/components/ui/button'
import Goal from './goal'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function SavingsGoals() {
  return (
    <section className="bg-white-100 p-3 rounded-md w-full">
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Savings Goals</h2>
            <Dialog>
              <DialogTrigger className="bg-mauve_dark px-4 py-1 rounded-sm font-bold">Edit</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="my-3" />
        </div>
        <div className="flex flex-col gap-2">
          <Goal title="New Car" amount="5000" progress={50} addedBy="Loid Forger" />
        </div>
      </div>
    </section>
  )
}
