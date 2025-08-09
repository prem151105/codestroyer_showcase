'use client'

import React from 'react'
import Terminal from '@/components/Terminal'

export default function Home() {
  return (
    <main className="min-h-screen flex terminal-container">
      {/* Left side - Image/Profile */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 flex-col justify-center items-center p-8">
        <div className="text-center">
          <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
            AJ
          </div>
          <h1 className="text-3xl font-bold mb-2 text-primary">Anurag Jayaswal</h1>
          <p className="text-lg mb-4 text-accent">AI/ML Developer & Competitive Programmer</p>
          <div className="space-y-2 text-secondary">
            <p>🎓 B.Tech CSE, IIIT Bhagalpur</p>
            <p>⭐ LeetCode: <span className="text-success">1500+ Rating</span></p>
            <p>🏆 Codeforces: <span className="text-warning">Specialist</span></p>
            <p>📍 Gwalior, Madhya Pradesh</p>
          </div>
        </div>
      </div>

      {/* Right side - Terminal */}
      <div className="w-full md:w-1/2 lg:w-3/5">
        <Terminal />
      </div>
    </main>
  )
}