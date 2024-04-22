'use client'
import { createBrowserClient } from '@supabase/ssr'
import React, { use } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { useEffect } from 'react'
const { nanoid } = require('nanoid')

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
  chaery_id?: string
}

type User = {
  id: number
  created_at: string // Assuming this is a UTC timestamp
  chaery_id: string
  first_name: string
  last_name: string
  email: string
  isOnboarded: boolean
  partner_id: number | null // Assuming partner_id can be null or a number
  avatar_url: string
  isDTF: boolean
}

export default function Onboarding() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const router = useRouter()
  const searchParams = useSearchParams()
  const { firstName, lastName, email, avatar } = Object.fromEntries(searchParams.entries()) as ParamTypes
  const [updates, setUpdates] = useState('')
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [userChaeryID, setUserChaeryID] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [partner, setPartner] = useState<PartnerType>({
    firstName: '',
    lastName: '',
    avatar: '',
  })

  useEffect(() => {
    setUpdates('Checking user data...')
    const checkUser = async () => {
      const { data: users, error } = await supabase.from('Users').select('*').eq('email', email)
      if (error) {
        console.log('Error fetching user:', error.message)
      }
      if (users && users.length > 0) {
        console.log('User fetched successfully:', users)
        await setUpdates('User found!')
        await setUserChaeryID(users[0].chaery_id)
        await setUpdates('')
      } else {
        // If user not found, add a new user
        addUser()
      }
    }

    const addUser = async () => {
      const { data, error } = await supabase.from('Users').insert([
        {
          chaery_id: `chaery-${nanoid(8)}`,
          first_name: firstName,
          last_name: lastName,
          email: email,
          partner_id: null,
          avatar_url: avatar,
        },
      ])
      if (error) {
        console.log('Error inserting user:', error)
      }
      if (data) {
        console.log('User inserted successfully:', data)
      }
    }

    checkUser() // Call the initial check when the component mounts
  }, [email, firstName, lastName, avatar, supabase])

  const handlePartnerSearch = async (partnerID: string) => {
    if (inputValue.length < 8) {
      setIsError(true)
      setError('Please enter a valid partner ID')
      return
    }

    if (inputValue === userChaeryID.replace('chaery-', '')) {
      setIsError(true)
      setError('You cannot connect with yourself !')
      return
    }
    if (inputValue === '' || inputValue === null) {
      setIsError(true)
      setError('Please enter a valid partner ID')
      return
    }
    const formattedPartnerID = 'chaery-' + partnerID
    console.log('partner ID:', formattedPartnerID)
    const { data, error } = await supabase.from('Users').select('*').eq('chaery_id', formattedPartnerID).single()
    if (error) {
      console.log('Error fetching partner:', error.message)
      setIsError(true)
      setError(`Could not find partner with ID: ${formattedPartnerID}`)
    }
    if (data) {
      console.log('Partner fetched successfully:', data)
      setIsError(false)
      setError('')
      setPartner({
        firstName: data.first_name,
        lastName: data.last_name,
        avatar: data.avatar_url,
        chaery_id: data.chaery_id,
      })
    }
  }

  const updateUserPartnerID = async (partnerID: string | undefined) => {
    console.log('Updating user with partner ID:', partnerID);
    console.log('Current user ID:', userChaeryID);
  
    try {
      const { data, error } = await supabase
        .from("Users")
        .update({ partner_id: partnerID })
        .eq('chaery_id', userChaeryID);
  
      if (error) {
        console.log('Error updating user:', error.message);
      }
      
      if (data) {
        console.log('User updated successfully:', data);
      }
    } catch (err) {
      console.log('Error updating user:', err.message);
    }
  }

  const updateOnboardingStatus = async (userChaeryID: string) => {
     try{
      const { data, error } = await supabase.from('Users').update({ isOnboarded: true }).eq('chaery_id', userChaeryID)
      if (error) {
        console.log('Error updating user:', error.message)
      }
      if (data) {
        console.log('User updated successfully:', data)
      }
     }
     catch (err) {
       console.log('Error updating user:', err.message)
     }

  }

  const initRelationshipConnection = async (userChaeryID: string) => {
    // check if a relationship already exists containing the user's chaery_id
    const {data: relationshipData, error: relationshipError} = await supabase.from('Relationships').select().eq('partner_ids', [userChaeryID]).single()
    if (relationshipError) {
      console.log('Error fetching relationship:', relationshipError.message)
    }
    if (relationshipData) {
      return { chaery_link_id: relationshipData.chaery_link_id};
    }
    // Create a new relationship between the two users
    const {data, error} = await supabase.from('Relationships').insert([
      {
        chaery_link_id: `bond-${nanoid(15)}`,
        partner_ids: [userChaeryID],
      }
    ]).select()
    if (error) {
      console.log('Error creating relationship:', error.message)
    }
    if (data) {
      return { chaery_link_id: data[0].chaery_link_id};
    }

  }
  

  const handleFinishOnboarding = async () => {
    let isRelationshipInit = false;

  
    try {
      await updateUserPartnerID(partner.chaery_id)
      const { data: connectionData, error: connectionError } = await supabase
        .from('Users')
        .select('partner_id')
        .eq('chaery_id', userChaeryID)
        .single();
  
      if (connectionError) {
        throw new Error(`Error fetching partner data: ${connectionError.message}`);
      }
  
      if (connectionData) {
        // Check if partner_id is the same as user's chaery_id
        if (connectionData.partner_id === partner.chaery_id) {
          console.log('User connected with partner successfully!');
          setUpdates(`Connected with ${partner.firstName}!`);
          updateOnboardingStatus(userChaeryID);
        } else {
          setUpdates(`Waiting for ${partner.firstName} to connect with you... the id you are connected with is ${connectionData.partner_id}`);
        }
      }
  
      await updateOnboardingStatus(userChaeryID); 
      const relationshipData = await initRelationshipConnection(userChaeryID);
      if (relationshipData) {
        const { chaery_link_id } = relationshipData;
        router.push(`/onboarding/bonded?bond_id=${chaery_link_id}`);
      }
    } catch (error) {
      console.error('Error handling onboarding:', error);
    }
  };
  

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
        {updates && (
          <div className="flex items-center gap-2">
            <p className="text-cherry_light-700 text-sm font-nunito_sans italic">{updates}</p>{' '}
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-3 h-3 text-black-700 animate-spin dark:black-700 fill-cherry_light-700"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <h3>Your Chaery ID</h3>
          <Button
            className="w-fit bg-cherry_light-700  h-fit py-0.5"
            onClick={() => navigator.clipboard.writeText(userChaeryID.replace('chaery-', ''))}
          >
            {userChaeryID ? userChaeryID : 'Loading...'}
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Enter your 8-digit partner&apos;s ID here. YSOGuG2d</Label>
          <Input
            id="username"
            placeholder="example : chaery-(xxxxxxx)"
            className="w-full ring-offset-cherry_light-900"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {isError && <p className="text-red-500 space-y-2 text-sm text-wrap">{error}</p>}
          <Button className="w-full bg-cherry_light-700" onClick={() => handlePartnerSearch(inputValue)}>
            Connect
          </Button>
        </div>
        {partner.firstName && (
          <div className="space-y-2 bg-cherry_light-900 p-2.5 rounded-xl">
            <div className="flex items-center flex-col space-y-4">
              <div className="flex flex-col gap-2 ">
                <h3 className="text-xl font-semibold">User Found!</h3>
                <p className="text-sm">
                  {partner.firstName} {partner.lastName}
                </p>
              </div>
              <Avatar className="w-24 h-24">
                <AvatarImage src="/public/test.jpg" />
                <AvatarFallback>Partner</AvatarFallback>
              </Avatar>
              <p className="text-sm">Chaery ID: {partner.chaery_id}</p>
            </div>
            <Button className="w-full bg-cherry_light-700" onClick={handleFinishOnboarding}>
              Connect with {partner.firstName}?
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
