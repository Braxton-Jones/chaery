import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { Inter } from 'next/font/google'
import './globals.css'
import WidthProvider from '@/components/width-provider'

const nunito_sans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-nunito-sans',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Chaery',
  description: 'Chaery is a modern way for couples to be on the same page and plan their future together.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} bg-black-300 text-white min-h-full flex justify-center`}>
        <WidthProvider>{children}</WidthProvider>
      </body>
    </html>
  )
}
