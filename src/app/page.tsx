'use client'

import React from 'react'
import TwoSidedLayout from '@/components/TwoSidedLayout'

export default function Home() {
  return (
    <main className="min-h-screen">
      <TwoSidedLayout />
      {/* Floating scroll-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 z-50 rounded-full p-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-600/30 hover:shadow-purple-600/30 transition-all"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </main>
  )
}