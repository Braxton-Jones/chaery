import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { nanoid } from 'nanoid'
import { on } from 'events'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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

  // Check if user is authenticated
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.error('User authentication error:', error)
    redirect('/login')
  } else {
    console.log('User authenticated successfully')
  }

  const userMetadata = data.user.user_metadata
  const userAvatar = userMetadata?.avatar_url
  const fullName = userMetadata?.full_name
  const [firstName, lastName] = fullName?.split(' ') || []
  const email = userMetadata?.email

  // Check if user is in the database and onboarded
  const { data: userData, error: userError } = await supabase.from('Users').select('*').eq('email', data.user.email)
  if (userError) {
    console.error('User data retrieval error:', userError)
  }
  if (userData?.length === 0) {
    console.log('User not found in database, adding user...')
    const { data: newUserData, error: newUserError } = await supabase.from('Users').insert([
      {
        chaery_id: `chaery-${nanoid(8)}`,
        first_name: data.user.user_metadata.full_name.split(' ')[0],
        last_name: data.user.user_metadata.full_name.split(' ')[1],
        email: data.user.email,
        avatar_url: data.user.user_metadata.avatar_url,
      },
    ])
    if (newUserError) {
      console.error('Error adding new user:', newUserError)
    }
  } else {
    // Handle if user is in database after login.

    // if user is in database, check if user is onboarded
    const { data: onboardedData, error: onboardedError } = await supabase
      .from('Users')
      .select('isOnboarded')
      .eq('email', data.user.email)
    if (onboardedError) {
      console.error('User onboarded check error:', onboardedError)
    }

    if (onboardedData && onboardedData[0]?.isOnboarded === false) {
      const { data: pendingData, error: pendingError } = await supabase
        .from('Users')
        .select('*')
        .eq('email', data.user.email)

      if (pendingError) {
        console.error('Pending request check error:', pendingError)
      }

      if (pendingData && pendingData[0]?.request === null) {
        console.log('User is not onboarded and has no pending request, sending to onboarding...')
        redirect(`onboarding?firstName=${firstName}&lastName=${lastName}&email=${email}&avatar=${userAvatar}`)
      } else if (pendingData && pendingData[0]?.request !== null) {
        console.log('User is not onboarded and has a pending request')
        const request = JSON.parse(pendingData[0].request)
        redirect(`onboarding/confirmRelationship?sender=${request.sender}&chaerybond=${request.chaery_bond_id}&user=${}`)
      }
    }

    if (onboardedData && onboardedData[0]?.isOnboarded === true) {
      console.log('User is onboarded')
      // handle if user is already onboarded after login.
      // check if they have a pending request
      const { data: pendingData, error: pendingError } = await supabase
        .from('Users')
        .select('*')
        .eq('email', data.user.email)

      if (pendingError) {
        console.error('Pending request check error:', pendingError)
      }
      if (pendingData && pendingData[0].request !== null) {
        console.log('User is onboarded and has a pending request')
      } else {
        console.log('User is onboarded and has no pending request')
      }
    }
  }

  return <section>{children}</section>
}
