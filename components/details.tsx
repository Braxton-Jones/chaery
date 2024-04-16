import React from 'react'
import { Button } from '@/components/ui/button'

export default function CouplesMenu() {
  type CouplesData = {
    id: number
    anniversary: string
    next_date: string
  }

  const data: CouplesData = {
    id: 1,
    anniversary: '2021-06-01',
    next_date: '2022-06-01',
  }

  return (
    <section className="grid grid-cols-2 w-full gap-2 p-6 bg-black-400 rounded-lg">
      <div>
        <Button
          variant="outline"
          className={`bg-white-100 border-none hover:bg-mauve-600 w-full h-16 font-nunito_sans font-medium text-md`}
        >
          <div>
            <p className="text-xs">Days until next Date</p>
            <p className="font-bold">10 days</p>
          </div>
        </Button>
      </div>
      <div>
        <div>
          <div
            className={`bg-white-100 border-none hover:bg-mauve-600 w-full h-16 font-nunito_sans font-medium text-md rounded-md flex justify-center items-center`}
          >
            <div>
              <p className="text-xs text-center">Anniversary</p>
              <p className="font-bold">{data.anniversary}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <Button
          variant="outline"
          className={`bg-white-100 border-none hover:bg-mauve-600 w-full h-16 font-nunito_sans font-medium text-md`}
        >
          Link!
        </Button>
      </div>
    </section>
  )
}
