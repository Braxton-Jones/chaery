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

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    const context = this

    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}
