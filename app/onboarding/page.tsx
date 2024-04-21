'use client'
import React from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'

type ParamTypes = {
  firstName: string
  lastName: string
  email: string
  avatar: string
}
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type PartnerType = {
  firstName: string
  lastName: string
  avatar: string

}

export default function Onboarding() {
  const searchParams = useSearchParams()
  const { firstName, lastName, email, avatar } = Object.fromEntries(searchParams.entries()) as ParamTypes
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [partner, setPartner] = useState<PartnerType>({
    firstName: '',
    lastName: '',
    avatar: '',
  })

  const handlePartnerSearch = () => {
    // fake finding or not finding a partner, make it random to simulate real life
    const partnerFound = Math.random() > 0.5
    if (partnerFound) {
      setError('')
      setIsError(false) 
      setPartner({
        firstName: 'Partner',
        lastName: 'Name',
        avatar: '',
      })
    } else {
      setPartner({})
      setIsError(true)
      setError('Partner not found. Please try again.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row-reverse items-center gap-4">
            <h1>
              Welcome In, {firstName} {lastName}!
            </h1>
            <Avatar className="w-12 h-12">
              <AvatarImage src={avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </CardTitle>
        <CardDescription>Let&apos;s get you connected with your special someone.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4">
          <h3>Your Chaery ID</h3>
          <Button className="w-fit bg-cherry_light-700  h-fit py-0.5">chaery-dsds82</Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Enter your partner&apos;s ID here.</Label>
          <Input id="username" placeholder="Partner's ID" className="w-full ring-offset-cherry_light-900" />
          {isError && <p className="text-red-500 space-y-2 text-sm">{error}</p>}
          <Button className="w-full bg-cherry_light-200" onClick={handlePartnerSearch}>
            Connect
          </Button>
        </div>
        {partner.firstName && (
          <div className="space-y-2 bg-cherry_light-900 p-2.5 rounded-xl">
          <div className="flex items-center flex-col space-y-4">
            <div className="flex flex-col gap-2 ">
              <h3 className="text-xl font-semibold">Connect with: partnersname</h3>
            </div>
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <Button asChild className="w-full bg-cherry_light-700">
            <Link href="/onboarding/bonded">Continue</Link>
          </Button>
          </div>
        )}
        
      </CardContent>
    </Card>
  )
}

