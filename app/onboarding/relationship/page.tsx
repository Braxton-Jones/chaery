'use client'
 
import { useRouter } from 'next/navigation'
import React, { use } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect } from 'react'
import { useState } from 'react'

export default function RelationshipPage() {
    const router = useRouter()
  const searchParams = useSearchParams()
  const chaeryBond = searchParams.get('ChaeryBondID')
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [partnerIDS, setPartnerIDS] = useState<string[] | undefined>(undefined)

useEffect(() => {
{/*
*/}

const getUser = async () => {
   try{
    const {data, error} = await supabase.auth.getUser()
    if(data){
        const email = data?.user?.email
        // get current user's chaery_id
        const {data: userData, error: userError} = await supabase.from('Users').select('*').eq('email', email)
        if(userError){
            console.error('Error getting user info:', userError)
            return null
        }else{
            // update bondID
            const {data: bondData, error: bondError} = await supabase.from('Users').update({bondID: chaeryBond}).eq('email', email)
            if(bondError){
                console.error('Error updating bondID:', bondError)
                return null
            }else{
                router.push(`/home/dashboard/${chaeryBond}`)   
            }
        }
    }
   }catch(error){
     console.error('Error getting user info:', error)
     return null
   }
}
getUser().then((data)=>{
    if(data){
        console.log(data)
    }
})
})



  
  return <div>RelationshipPage for {chaeryBond}</div>
}
