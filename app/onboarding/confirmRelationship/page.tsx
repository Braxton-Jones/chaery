'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function RelationshipConfirmation() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const searchParams = useSearchParams()
  const { sender, chaeryBond } = Object.fromEntries(searchParams.entries())
  const [senderInfo, setSenderInfo] = useState<any[] | undefined>(undefined)

  useEffect(() => {
    const getSenderInfo = async () => {
      try {
        const { data, error } = await supabase.from('Users').select('*').eq('chaery_id', sender)
        if (error) {
          console.error('Error getting sender info:', error)
          return null // Return null if there's an error
        }
        return data
      } catch (error) {
        console.error('Error getting sender info:', error)
        return null // Return null in case of any other error
      }
    }

    getSenderInfo().then((data) => {
      if (data) {
        setSenderInfo(data)
      }
    })
  }, [sender]) 

  const handleAcceptInvite = async () => {
    // get current user's chaery_id
    
  }

  console.log(senderInfo)

  if (senderInfo) {
    const sender = senderInfo[0]
    console.log(sender)
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Connect with {sender.first_name} {sender.last_name}?
          </CardTitle>
          <CardDescription>{sender.first_name} has sent you an invite to Chaery!</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-around'>
          <Avatar className='w-20 h-20'>
            <AvatarImage src={sender.avatar_url}/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Avatar className='w-20 h-20'>
            {/* Get current users Image! */}
            <AvatarImage src="https://github.com/shadcn.png"  />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardContent>
        <CardFooter>
          <Button 
          className='w-full bg-cherry_medium-800 text-white hover:bg-cherry_medium-900'
          onClick={handleAcceptInvite}
          >
            Accept {sender.first_name}&apos;s invite
            </Button>
        </CardFooter>
      </Card>
    )
  }


  return <h1>Loading....</h1>
}
