import CouplesMenu from '@/components/details'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  type User = {
    first_name: string
    last_name: string
    id: number | string
    bonded_ID: number | string
    avatar: string
  }

  const user: User = {
    first_name: 'John',
    last_name: 'Doe',
    id: 1,
    bonded_ID: 2,
    avatar: 'https://randomuser.me/api/port',
  }

  const user2: User = {
    first_name: 'Zane',
    last_name: 'Doe',
    id: 2,
    bonded_ID: 1,
    avatar: 'https://randomuser.me/api/port',
  }

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Header */}
      <section className="w-full flex flex-col gap-4 bg-black-500 h-fit p-4 rounded-lg">
        {/* Settings & Notification */}
        <section className="flex justify-between">
          <div>
          {/* User Settings (Logout) */}
            <Dialog>
              <DialogTrigger className='hover:brightness-90'>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 items-center">
            {/* Notifications */}
          <Dialog>
              <DialogTrigger className='hover:brightness-90'>
              <div className="w-8 h-8 rounded-full bg-mauve-500 hover:brightness-50"></div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            
            {/* Settings */}
            <Dialog>
              <DialogTrigger className='hover:brightness-90'>
              <div className="w-8 h-8 rounded-full bg-mauve-500 hover:brightness-50"></div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Users */}
        <section className="flex gap-4 justify-center bg-black-400 w-full py-4 rounded-md self-center">
          <div className="flex flex-col items-center justify-center ">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-nunito_sans font-medium text-lg">{`${user.first_name} ${user.last_name}`}</p>
          </div>
          <div className="flex items-center">
            <p>❤️</p>
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-nunito_sans font-medium text-lg">{`${user2.first_name} ${user2.last_name}`}</p>
          </div>
        </section>

        {/* Details */}
        {/* Add a cool animation here! */}
        <section className="flex flex-col items-center">
          <Collapsible className="w-full flex flex-col items-center">
            <CollapsibleTrigger className="font-nunito_sans text-center">Open</CollapsibleTrigger>
            <CollapsibleContent className="w-full mt-3">
              <CouplesMenu />
            </CollapsibleContent>
          </Collapsible>
        </section>
      </section>
      {/* Main Content */}
      <section className="bg-black-500 h-fit p-4 rounded-lg">{children}</section>
    </section>
  )
}
