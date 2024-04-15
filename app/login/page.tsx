import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Login() {
  return (
    <section className="flex flex-col gap-10 flex-grow justify-center font-nunito_sans">
      <Card>
        <CardHeader>
          <CardTitle className='font-bold'>Log in to Chaery</CardTitle>
          <CardDescription>
            <p className='text-mauve_dark-500'>Log in to Chaery to start planning your future together.</p>
          </CardDescription>
        </CardHeader>

        <CardContent>
           <div className='flex flex-col gap-2'>
          <Button>
            <Link href="/login/google">Sign in with Google</Link>
          </Button>
            <Button>
                <Link href="/login/apple">Sign in with Apple</Link>
            </Button>
            </div>
        </CardContent>
      </Card>
    </section>
  )
}
