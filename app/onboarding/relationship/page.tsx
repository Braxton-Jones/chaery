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




  
  return <div>RelationshipPage for {chaeryBond}</div>
}
