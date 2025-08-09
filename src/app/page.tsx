'use client'

import { useState, useEffect } from 'react'
import Terminal from '@/components/Terminal'
import BootSequence from '@/components/BootSequence'

export default function Home() {
  const [isBooted, setIsBooted] = useState(false)

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooted(true)
    }, 2000) // Shorter boot time for better UX

    return () => clearTimeout(bootTimer)
  }, [])

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {!isBooted ? (
        <BootSequence onComplete={() => setIsBooted(true)} />
      ) : (
        <Terminal />
      )}
    </main>
  )
}