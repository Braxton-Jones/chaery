import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function OnboardingSucess() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Looks like you&apos;re first here...</CardTitle>
          <CardDescription>We&apos;re waiting for `partner` to connect with you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>Tell `partner` to sign up for Chaery and connect with you.</p>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </section>
  )
}
