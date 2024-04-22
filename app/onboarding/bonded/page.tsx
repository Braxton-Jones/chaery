"use client";

import { createBrowserClient } from '@supabase/ssr'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'

export default function OnboardingSuccess() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const params = useSearchParams()
  const relationshipID = params.get('bond_id')
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
