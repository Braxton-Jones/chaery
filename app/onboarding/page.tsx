'use client'
import React from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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

export default function Onboarding() {
  const searchParams = useSearchParams()
  const { firstName, lastName, email, avatar } = Object.fromEntries(searchParams.entries()) as ParamTypes

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
          <Label htmlFor="username">Enter your partner&apos;s ID (example: chaery-2hb2h2)</Label>
          <Input id="username" placeholder="Partner's ID" className="w-full ring-offset-cherry_light-900" />
          <Button className="w-full bg-cherry_light-200">Connect</Button>
        </div>
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
      </CardContent>
    </Card>
  )
}
