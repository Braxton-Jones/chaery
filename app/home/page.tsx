import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { nanoid } from 'nanoid'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Homepage() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

  // Check if the current user is authenticated, if not redirect to login, if so check if the user is in the database
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    // User not authenticated, redirect to login
    console.log('User not authenticated, redirecting to login page')
    redirect('/login')
  } else {
    // Extract user metadata
    const userMetadata = data?.user?.user_metadata
    const userAvatar = userMetadata?.avatar_url
    const fullName = userMetadata?.full_name
    const [firstName, lastName] = fullName?.split(' ') || []
    const email = userMetadata?.email

    // Checking if the user is in the database
    const { data: userData, error: userError } = await supabase.from('Users').select('*').eq('email', data.user.email)

    if (userError) {
      console.log('Error fetching user data from database:', userError)
    }

    if (userData?.length === 0) {
      console.log('User is not in the database')
      console.log('Adding user to the database')

      // If the user is not in the database, add them to the database then redirect to the onboarding page
      const { data: newUser, error: newUserError } = await supabase.from('Users').insert([
        {
          chaery_id: `chaery-${nanoid(8)}`,
          first_name: firstName,
          last_name: lastName,
          email: email,
          avatar_url: userAvatar,
        },
      ])

      if (newUserError) {
        console.log('Error adding user to database:', newUserError)
      } else {
        console.log('User added to the database, redirecting to onboarding page')
        redirect(`onboarding?firstName=${firstName}&lastName=${lastName}&email=${email}&avatar=${userAvatar}`)
      }
    } else {
      console.log('User is in the database, checking if they have completed the onboarding process')

      if (userData && userData[0]?.isOnboarded === false) {
        console.log('User has not completed the onboarding process, redirecting to onboarding page')
        redirect(`onboarding?firstName=${firstName}&lastName=${lastName}&email=${email}&avatar=${userAvatar}`)
      } else {
        console.log('User has completed the onboarding process and is in the database')
        console.log('Redirecting to the relationship page if they have a BondID')
        const bondID = userData && userData[0]?.bondID
        redirect(`/home/dashboard/${bondID}`)
      }
    }
  }

  return (
    <div className="bg-cherry_light-700 self-center p-3 rounded-lg">
      <h3>Loading...</h3>
      <p>Please bare with us while we check our systems...</p>
    </div>
  )
}
