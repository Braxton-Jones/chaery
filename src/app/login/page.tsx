import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import LoginBtn from '@/components/login-btn'

export default function Login() {
  return (
    <section className="flex flex-col gap-10 flex-grow justify-center font-nunito_sans items-center">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle className="font-bold">Log in to Chaery</CardTitle>
          <CardDescription className="text-mauve_dark-500">
            Log in to Chaery to start planning your future together.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <LoginBtn />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
