'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import EnhancedTwoSidedLayout from '@/components/EnhancedTwoSidedLayout'
import EnhancedTerminal from '@/components/EnhancedTerminal'
import LayoutSwitcher from '@/components/LayoutSwitcher'
import { ErrorBoundary } from '@/components/PerformanceOptimized'
import { performanceMonitor } from '@/utils/performanceMonitor'
import { browserCompatibility } from '@/utils/crossBrowserCompatibility'

export default function Home() {
  const [currentLayout, setCurrentLayout] = useState<'terminal' | 'modern'>('modern')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize performance monitoring and browser compatibility
    performanceMonitor.measureFunction('app-initialization', () => {
      console.log('App initialized successfully')
    })
    
    const compatibilityReport = browserCompatibility.reportCompatibilityIssues()
    console.log('Compatibility Report:', compatibilityReport)

    // Check user preference from localStorage
    const savedLayout = localStorage.getItem('preferred-layout') as 'terminal' | 'modern'
    if (savedLayout) {
      setCurrentLayout(savedLayout)
    }

    setIsLoading(false)
  }, [])

  const handleLayoutChange = (layout: 'terminal' | 'modern') => {
    setCurrentLayout(layout)
    localStorage.setItem('preferred-layout', layout)
    
    // Track layout change for analytics
    performanceMonitor.measureFunction('layout-change', () => {
      console.log(`Layout changed to: ${layout}`)
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 text-lg">Initializing Portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentLayout === 'terminal' ? (
            <EnhancedTerminal key="terminal" />
          ) : (
            <EnhancedTwoSidedLayout key="modern" />
          )}
        </AnimatePresence>
        
        <LayoutSwitcher 
          currentLayout={currentLayout}
          onLayoutChange={handleLayoutChange}
        />
      </main>
    </ErrorBoundary>
  )
}