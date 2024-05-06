import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'

export default function RelationshipCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Events</CardTitle>
        <CardDescription>You have 12 upcoming events</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-cherry_medium-700 hover:bg-cherry_light-800 mx-3">Create a new event</Button>
      </CardFooter>
    </Card>
  )
}
