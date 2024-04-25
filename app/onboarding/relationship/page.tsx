'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function RelationshipPage() {
  const searchParams = useSearchParams()
  const chaeryBond = searchParams.get('ChaeryBondID')
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const relationshipChannel = supabase
  .channel(`relationships:${chaeryBond}`)
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: "Relationships",
    },
    (payload) => console.log(payload)
  )
  .subscribe()

  
  return <div>RelationshipPage for {chaeryBond}</div>
}
