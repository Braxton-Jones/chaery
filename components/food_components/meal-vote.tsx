import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function MealVote() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Food Vote</CardTitle>
        <CardDescription>Vote and decide on what to eat using our decision matrix</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
