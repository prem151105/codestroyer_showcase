'use client'

import React from 'react'
import { motion } from 'framer-motion'
import FloatingLogo from './FloatingLogo'
import LeftContent from './LeftContent'

export default function TwoSidedLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Left Side - Content */}
      <motion.div 
        className="flex-1 p-8 lg:p-12 overflow-y-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <LeftContent />
      </motion.div>

      {/* Right Side - Dynamic Logo */}
      <motion.div 
        className="flex-1 relative overflow-hidden flex items-center justify-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <FloatingLogo />
      </motion.div>
    </div>
  )
}