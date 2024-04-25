'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function RelationshipPage() {
  const searchParams = useSearchParams()
  const chaeryBond = searchParams.get('ChaeryBondID')
  return <div>RelationshipPage for {chaeryBond}</div>
}
