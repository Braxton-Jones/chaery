import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDate } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dateFormat = (date: string) => {
  // "2021-09-05" => "September 5th 2021"
  const dateObj = new Date(date)
  // Add one day to the date to fix the timezone issue
  dateObj.setDate(dateObj.getDate() + 1)
  return formatDate(dateObj, 'MMMM do yyyy')
}
