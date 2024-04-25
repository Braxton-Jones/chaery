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

  return <section>{children}</section>
}
