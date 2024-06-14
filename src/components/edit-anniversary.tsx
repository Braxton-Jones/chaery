'use client'
import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { dateFormat } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from './ui/button'
import { createBrowserClient } from '@supabase/ssr'

export default function Anniversary({
  anniversary,
  chaeryLinkID,
}: {
  anniversary: null | string
  chaeryLinkID: string
}) {
  function convertToDate(dateString: string) {
    const [year, month, day] = dateString.split('-')
    return new Date(Number(year), Number(month) - 1, Number(day))
  }
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const [date, setDate] = React.useState<Date | undefined>()
  const [shownDate, setShownDate] = React.useState(anniversary)

  React.useEffect(() => {
    const getAnniversaryDate = async () => {
      const { data, error } = await supabase
        .from('Relationships')
        .select('anniversary')
        .eq('chaery_link_id', chaeryLinkID)
      if (error) {
        console.error('Error fetching anniversary:', error)
      } else {
        setShownDate(data[0]?.anniversary)
      }
    }
    try {
      getAnniversaryDate()
    } catch (e) {
      console.error(e)
    }
  }, [chaeryLinkID, shownDate, supabase])

  const updateAnniversary = async () => {
    const { data, error } = await supabase
      .from('Relationships')
      .update({
        anniversary: date?.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      })
      .eq('chaery_link_id', chaeryLinkID)
    if (error) {
      console.error('Error updating anniversary:', error)
    } else {
      setShownDate(
        date?.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ??
          null,
      )
    }
  }
  return (
    <Popover>
      <PopoverTrigger className="text-xs text-gray-500 hover:underline text-left w-full">
        {anniversary || shownDate ? `${shownDate}` : 'No Anniversary Yet...'}
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Calendar mode="single" selected={date} onSelect={setDate} className="w-full h-full" />
        {date && (
          <>
            <p className="w-full bg-black-700p-2 rounded-sm text-center text-sm">
              {date?.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <Button onClick={updateAnniversary} className="w-full bg-black-700 hover:bg-cherry_light-100 mt-4">
              Save
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
