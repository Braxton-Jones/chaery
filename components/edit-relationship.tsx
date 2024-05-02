'use client'
import { createBrowserClient } from '@supabase/ssr'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type EditProps = {
  currentUserChaeryID: string
  relationshipID: string
  currentUserAvatar: null | string
  anniversary: null | string
}
export default function EditRelationship({
  currentUserChaeryID,
  relationshipID,
  currentUserAvatar,
  anniversary,
}: EditProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const router = useRouter()

  const logoutUser = async () => {
    supabase.auth.signOut()
    router.push('/')
  }

  const disconnectUser = async () => {
    // TODO: Implement disconnect user
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-4 text-black-100">
      <div className="grid gap-8">
        <section className="grid gap-4">
          <Separator />
        </section>
        <section className="grid gap-6">

          <div className="space-y-6">
            <AlertDialog>
              <AlertDialogTrigger className='w-full'>
                <Button className="w-full bg-black-700 hover:bg-cherry_light-100">Disconnect from Partner</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="text-black">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently disconnect you from your partner and ALL data
                    will be lost between you two.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={disconnectUser}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button className="w-full bg-cherry_light-200 hover:bg-cherry_light-300" onClick={logoutUser}>
              Log Out
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
