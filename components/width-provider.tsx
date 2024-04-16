import React from 'react'

export default function WidthProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center my-4">{children}</div>
}
