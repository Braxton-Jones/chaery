import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ModalDrawer from './modalDrawer'
import EditRelationship from './edit-relationship'
import Anniversary from './edit-anniversary'

type User = {
  id: number
  created_at: string
  chaery_id: string
  first_name: string
  last_name: string
  email: string
  isOnboarded: boolean
  partner_id: string
  avatar_url: string
  isDTF: boolean
  bondID: string
}
type Relationship = {
  id: number
  created_at: string
  anniversary: null | string // Null or string type for anniversary
  spotify_playlist_id: null | string // Null or string type for Spotify playlist ID
  chaery_link_id: string
}

export function RelationshipInfo({
  currentUser,
  partner,
  relationship,
}: {
  currentUser: User
  partner: User
  relationship: Relationship
}) {
  return (
    <div className="bg-white rounded-b-3xl shadow-lg p-6 dark:bg-gray-800 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              alt="Partner 1"
              className="rounded-full"
              height={60}
              src={currentUser?.avatar_url}
              style={{
                aspectRatio: '60/60',
                objectFit: 'cover',
              }}
              width={60}
            />
            {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:border-gray-800" /> */}
          </div>
          <div className="relative">
            <Image
              alt="Partner 2"
              className="rounded-full"
              height={60}
              src={partner?.avatar_url}
              style={{
                aspectRatio: '60/60',
                objectFit: 'cover',
              }}
              width={60}
            />
            {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:border-gray-800" /> */}
          </div>
          <div className="px-4">
            <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">
              {currentUser.first_name} & {partner.first_name}
            </h3>
            <Anniversary 
            anniversary={relationship.anniversary}
            chaeryLinkID={relationship.chaery_link_id}
             />
          </div>
        </div>
        <div className="flex min-w-[75px] justify-end">
          <ModalDrawer
            title="Settings"
            trigger={<SettingsIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
            content={
              <EditRelationship
                anniversary={relationship.anniversary}
                currentUserAvatar={currentUser.avatar_url}
                currentUserChaeryID={currentUser.chaery_id}
                relationshipID={relationship.chaery_link_id}
              />
            }
          />
          {/* <ModalDrawer
            title="Notifications"
            trigger={<BellIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
            content={
              <div className="m-5">
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </div>
            }
          /> */}
        </div>
      </div>
    </div>
  )
}

function BellIcon(props: any) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function SettingsIcon(props: any) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
