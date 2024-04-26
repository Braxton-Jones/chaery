import React from 'react'

export default function WidthProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="w-full min-h-full max-w-7xl mx-auto flex justify-center">{children}</div>
}
