'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Terminal from '@/components/Terminal'
import MatrixRain from '@/components/MatrixRain'
import BootSequence from '@/components/BootSequence'

export default function Home() {
  const [isBooted, setIsBooted] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooted(true)
    }, 3000)

    return () => clearTimeout(bootTimer)
  }, [])

  const toggleMatrix = useCallback(() => {
    setShowMatrix(!showMatrix)
  }, [showMatrix])

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {showMatrix && <MatrixRain />}
      
      {!isBooted ? (
        <BootSequence onComplete={() => setIsBooted(true)} />
      ) : (
        <Terminal onMatrixToggle={toggleMatrix} />
      )}
    </main>
  )
}