import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'
import WidthProvider from '@/components/width-provider'

const nunito_sans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-nunito-sans',
})

export const metadata: Metadata = {
  title: 'Chaery',
  description:
    'Chaery is a modern way for couples to be on the same page and plan their future together.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito_sans.variable} bg-black-300 text-white h-full`}>
        <WidthProvider>{children}</WidthProvider>
      </body>
    </html>
  )
}
