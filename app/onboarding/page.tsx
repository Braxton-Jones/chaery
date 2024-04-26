'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { createBrowserClient } from '@supabase/ssr'
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
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import PopupModal from '@/components/generic-modal'
import { set } from 'date-fns'

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
    chaery_id: '',
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

  const handlePartnerSearch = async () => {
    setUpdates('Searching for partner...')
    // Searches for the partner in the Users table
    console.log('Searching for partner:', inputValue)
    const { data: partnerData, error: partnerError } = await supabase
      .from('Users')
      .select('*')
      .eq('chaery_id', inputValue)
    if (partnerError) {
      console.log('Error fetching partner:', partnerError)
      setIsError(true)
      setError('Error fetching partner data. Please try again.')
    }
    if (partnerData && partnerData.length > 0) {
      console.log('Partner fetched successfully:', partnerData)
      setPartner({
        firstName: partnerData[0].first_name,
        lastName: partnerData[0].last_name,
        avatar: partnerData[0].avatar_url,
        chaery_id: partnerData[0].chaery_id,
      })
      await setUpdates('')
    } else {
      setIsError(true)
      setError('Partner not found.')
      setUpdates('Please check the Chaery ID and try again.')
      setPartner({
        firstName: '',
        lastName: '',
        avatar: '',
      })
      console.log('Partner not found:', partnerData)
    }
  }

  const checkIfPartnerIDExists = async (chaeryID: string) => {
    const { data: partnerIDData, error: partnerIDError } = await supabase
      .from('Users')
      .select('*')
      .eq('chaery_id', chaeryID)
    if (partnerIDError) {
      console.log(`Error checking if ${chaeryID} has a partnerID:`, partnerIDError)
    }
    if (partnerIDData && partnerIDData[0]?.partner_id === null) {
      // User has no partnerID
      return { hasPartnerID: false }
    } else if (partnerIDData && partnerIDData[0]?.partner_id) {
      // User has a partnerID
      console.log('User has a partnerID:', partnerIDData[0].partner_id)
      return { hasPartnerID: true, returnedPartnerID: partnerIDData[0].partner_id }
    }
  }

  const updateOnboardedStatus = async (chaeryID: string) => {
    const { data: onboardedData, error: onboardedError } = await supabase
      .from('Users')
      .update({ isOnboarded: true })
      .eq('chaery_id', chaeryID)
    if (onboardedError) {
      console.log('Error updating onboarded status:', onboardedError)
    }
    if (onboardedData) {
      console.log('Onboarded status updated:', onboardedData)
    }
  }

  const updateUsersBondID = async (chaeryID: string, bondID: string) => {
    const { data: bondData, error: bondError } = await supabase
      .from('Users')
      .update({ bondID: bondID })
      .eq('chaery_id', chaeryID)
    if (bondError) {
      console.log('Error updating bondID:', bondError)
    }
  }

  const initRelationship = async (chaeryID: string) => {
    // create a new relationship in the Relationships table
    const chaerybond = `chaerybond-${nanoid(12)}`
    const { data: relationshipData, error: relationshipError } = await supabase.from('Relationships').insert([
      {
        chaery_link_id: chaerybond,
      },
    ])
    if (relationshipError) {
      console.log('Error creating relationship:', relationshipError)
    } else {
      console.log('Relationship created:', relationshipData)
      setUpdates('Creating ChaeryBond...')
      await updateUsersBondID(chaeryID, chaerybond)
      router.push(`/home/dashboard/${chaerybond}`)
    }
  }

  const getBondID = async (chaeryID: string) => {
    const { data: bondData, error: bondError } = await supabase.from('Users').select('bondID').eq('chaery_id', chaeryID)
    if (bondError) {
      console.log('Error fetching bondID:', bondError)
    }
    if (bondData) {
      console.log('BondID fetched:', bondData)
      return bondData[0].bondID
    }
  }

  const handleRelationshipInit = async () => {
    setUpdates('Checking Chaery database...')
    try {
      const { hasPartnerID: userPartnerID, returnedPartnerID: userReturnedPartnerID } = (await checkIfPartnerIDExists(
        userChaeryID!,
      )) as { hasPartnerID: boolean; returnedPartnerID?: string }
      const { hasPartnerID: targetPartnerID, returnedPartnerID: targetReturnedPartnerID } =
        (await checkIfPartnerIDExists(partner.chaery_id!)) as { hasPartnerID: boolean; returnedPartnerID?: string }
      console.log('User', userPartnerID, userReturnedPartnerID)
      console.log('Partner', targetPartnerID, targetReturnedPartnerID)
      if (userPartnerID === false && targetPartnerID === false) {
        const { data: userUpdateData, error: userUpdateError } = await supabase
          .from('Users')
          .update({ partner_id: partner.chaery_id })
          .eq('chaery_id', userChaeryID)

        if (userUpdateError) {
          console.log('Error updating user:', userUpdateError)
        } else {
          setUpdates(`${partner.firstName} is now your partner!`)
          await updateOnboardedStatus(userChaeryID!)
          await initRelationship(userChaeryID!)
        }
      }
      if (userPartnerID === false && targetPartnerID === true) {
        console.log('User has no partner but partner has a partner')
        // Check if the partners id matched the user's partner id
        const doIDsMatch = targetReturnedPartnerID === userChaeryID
        if (doIDsMatch) {
          // If the IDs match, update the user's partner id
          const { data: userUpdateData, error: userUpdateError } = await supabase
            .from('Users')
            .update({ partner_id: partner.chaery_id })
            .eq('chaery_id', userChaeryID)
          if (userUpdateError) {
            console.log('Error updating user:', userUpdateError)
          } else {
            setUpdates(`${partner.firstName} is now your partner!`)
            await updateOnboardedStatus(userChaeryID!)
            const bondID = await getBondID(partner.chaery_id!)
            updateUsersBondID(userChaeryID!, bondID)
            router.push(`/home/dashboard/${bondID}`)
          }
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center font-bold">Welcome to Chaery!</CardTitle>
        <CardDescription className="text-center">Select an option below to get started!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
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
              <Button className="w-full bg-cherry_light-700" onClick={handleRelationshipInit}>
                Connect with {partner.firstName}?
              </Button>
            </div>
          )}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row-reverse items-center text-md w-full justify-end gap-4">
                <h1>
                  Hello, {firstName} {lastName}!
                </h1>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardTitle>
            <CardDescription>Let&apos;s get you connected with your special someone.</CardDescription>
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
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4">
              <h3>Your Chaery ID</h3>
              <Button
                className="w-fit bg-cherry_light-700  h-fit py-0.5"
                // dont forget to change this to the actual chaery id
                onClick={() => navigator.clipboard.writeText('chaery-YSOGuG2d')}
              >
                {userChaeryID ? userChaeryID : 'Loading...'}
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Enter your 8-digit partner&apos;s ID here.</Label>
              <Input
                id="username"
                placeholder="example : chaery-(xxxxxxx)"
                className="w-full ring-offset-cherry_light-900"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {isError && <p className="text-red-500 space-y-2 text-sm text-wrap">{error}</p>}
              <Button className="w-full bg-cherry_light-700" onClick={handlePartnerSearch}>
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

// Users will only see this page once, after they sign up and their account is made in the Users table.
// This page will ask them some questions to get to know them better.

// export default function OnboardingPage() {
//   const searchParams = useSearchParams()
//   const firstName = searchParams.get('firstName')
//   const lastName = searchParams.get('lastName')
//   const email = searchParams.get('email')
//   const avatarUrl = searchParams.get('avatar')
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-center font-bold">Welcome to Chaery!</CardTitle>
//         <CardDescription className="text-center">Select an option below to get started!</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* <div className="space-y-2">
//           <Label>Select if you are starting a new Chaery account</Label>
//           <Dialog >
//             <DialogTrigger className="w-full py-4 rounded-md bg-cherry_light-700 hover:bg-cherry_light-400" >Connect using a ChearyID</DialogTrigger>
//             <DialogContent className='rounded-md bg-cherry_light-800'>
//               <DialogHeader>
//                 <DialogTitle>Connect using a ChaeryID</DialogTitle>
//                 <DialogDescription>
//                   Enter your
//                 </DialogDescription>
//               </DialogHeader>
//             </DialogContent>
//           </Dialog>
//         </div>
//         <div className="space-y-2">
//           <Label>Select if your partner has already setup a Chaery account</Label>
//           <Dialog>
//             <DialogTrigger className="w-full py-4 rounded-md bg-cherry_light-700 hover:bg-cherry_light-400">Connect using a ChearyBondID</DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Are you absolutely sure?</DialogTitle>
//                 <DialogDescription>
//                   This action cannot be undone. This will permanently delete your account and remove your data from our
//                   servers.
//                 </DialogDescription>
//               </DialogHeader>
//             </DialogContent>
//           </Dialog>
//         </div> */}
//       </CardContent>
//     </Card>
//   )
// }
