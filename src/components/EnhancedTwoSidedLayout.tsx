'use client'

import React from 'react'
import { motion } from 'framer-motion'
import FloatingLogo from './FloatingLogo'
import LeftContent from './LeftContent'
import { ParticleEffects, GradientAnimation } from './EnhancedVisualEffects'
import { SkipLink, HighContrastToggle, ReducedMotionToggle, FontSizeToggle } from './AccessibilityEnhanced'
import { FloatingActionButton } from './OptimizedLayout'

export default function EnhancedTwoSidedLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Skip Links for Accessibility */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      {/* Enhanced Background Effects */}
      <ParticleEffects />
      <GradientAnimation />
      
      {/* Accessibility Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <HighContrastToggle />
        <ReducedMotionToggle />
        <FontSizeToggle />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Enhanced Content */}
        <motion.div 
          id="main-content"
          className="flex-1 p-8 lg:p-12 overflow-y-auto gpu-accelerated"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          role="main"
        >
          <LeftContent />
        </motion.div>

        {/* Right Side - Enhanced Dynamic Logo */}
        <motion.div 
          className="flex-1 relative overflow-hidden flex items-center justify-center gpu-accelerated"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          role="complementary"
          aria-label="Visual presentation"
        >
          <FloatingLogo />
        </motion.div>
      </div>

      {/* Contact Modal Trigger */}
      <FloatingActionButton
        onClick={() => window.open('mailto:anurag1.230101034@iiitbh.ac.in', '_blank')}
        position="bottom-right"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />
    </div>
  )
}