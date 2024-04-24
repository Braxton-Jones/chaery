"use client";

import { createBrowserClient } from '@supabase/ssr'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
        <CardContent className='p-6'>
        <div className="flex flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
          Waiting for Account Linking
        </h1>
        <p className="max-w-md text-gray-500 dark:text-gray-400">
          Please wait while the other user completes their account registration. This page will automatically update once the other user has completed their registration.
        </p>
        <div className="flex items-center justify-center" />
      </div>
    </div>
        </CardContent>
      </Card>
    </section>
  )
}
