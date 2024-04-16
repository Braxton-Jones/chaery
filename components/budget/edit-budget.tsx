import Link from 'next/link'
import React from 'react'

export default function EditBtn() {
  return (
    <Link href="home/budget" className="bg-black-300 w-full rounded-sm flex justify-center items-center min-h-[50px]">
      Edit
    </Link>
  )
}
