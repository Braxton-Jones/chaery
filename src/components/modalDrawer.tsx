import React, { ReactNode } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type ModalInfoProps = {
  trigger: ReactNode
  title: string
  content: ReactNode
}
export default function ModalDrawer({ trigger, title, content }: ModalInfoProps) {
  return (
    <section className="text-black ">
      <Dialog>
        <DialogTrigger className="hidden sm:block">{trigger}</DialogTrigger>
        <DialogContent className="bg-white text-black-100">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{content}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Drawer>
        <DrawerTrigger className="block sm:hidden w-full">{trigger}</DrawerTrigger>
        <DrawerContent className="text-black-100">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div>{content}</div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" className="w-full bg-black-700 text-white">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  )
}
