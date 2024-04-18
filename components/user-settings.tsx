import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function UserSettings() {
  return (
    <section className="mt-2">
      <Card className="bg-white-500 border-none text-black">
        <CardHeader className="text-left w-fit">
          <CardTitle className="font-semibold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex gap-4 w-full">
            <div className="flex gap-3 bg-cherry_light-700 w-full rounded-md p-2">
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="text-left">
                <h1 className="font-semibold text-lg">John Doe</h1>
                <p className="text-sm">johndoe@gmail.com</p>
              </div>
            </div>
            <div className="bg-cherry_light-700 rounded-md p-2">
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="text-left flex flex-col gap-2">
            <Label htmlFor="username" className="text-left">
              Nickname
            </Label>
            <Input id="username" placeholder="Username" className="w-full ring-offset-cherry_light-900" />
          </div>
          <div className="text-left flex flex-col gap-2">
            <Label htmlFor="email" className="text-left">
              Partner&apos;s Nickname
            </Label>
            <Input id="email" placeholder="Partner's Nickname" className="w-full ring-offset-cherry_light-900" />
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-center gap-3">
          <Button variant="outline" className="bg-cherry_medium-700 hover:bg-cherry_medium-800 font-nunito_sans">
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="border-cherry_medium-700 hover:bg-cherry_medium-700 border-2 bg-black-400 text-whi font-nunito_sans"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
