'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FloatingLogo from './FloatingLogo'
import LeftContent from './LeftContent'

export default function TwoSidedLayout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const rightSideY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-900" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.45, 0.25],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/30"
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                left: `${10 + i * 15}%`,
                top: `${10 + i * 12}%`,
                borderRadius: i % 2 === 0 ? "50%" : "0%"
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl lg:py-10 py-6 px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
          {/* Left Side - Content with enhanced styling */}
          <motion.div
            className="flex-[1.1] relative group"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Content container with better backdrop */}
            <div className="relative p-6 lg:p-8 h-full overflow-y-auto fancy-scroll rounded-2xl border border-white/10 bg-slate-900/20 backdrop-blur-xl shadow-2xl">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 pointer-events-none"
                animate={{
                  borderColor: [
                    "rgba(6, 182, 212, 0.3)",
                    "rgba(139, 92, 246, 0.3)", 
                    "rgba(236, 72, 153, 0.3)",
                    "rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10">
                <LeftContent />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Enhanced AI/ML Visualization */}
          <motion.div
            className="flex-[0.9] relative group"
            style={{ y: rightSideY }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Enhanced container with better visual effects */}
            <div className="relative h-full min-h-[600px] lg:min-h-[800px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/10 backdrop-blur-xl shadow-2xl">
              {/* Dynamic background patterns */}
              <div className="absolute inset-0 opacity-10">
                {/* Circuit board pattern */}
                <svg className="w-full h-full" viewBox="0 0 400 600">
                  <defs>
                    <pattern id="circuit-bg" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M0,25 L50,25 M25,0 L25,50" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" opacity="0.3" />
                      <circle cx="25" cy="25" r="2" fill="currentColor" className="text-purple-400" opacity="0.5" />
                      <circle cx="10" cy="10" r="1" fill="currentColor" className="text-emerald-400" opacity="0.4" />
                      <circle cx="40" cy="40" r="1" fill="currentColor" className="text-pink-400" opacity="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#circuit-bg)" />
                </svg>
              </div>

              {/* Animated glow effects */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main logo content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <FloatingLogo />
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-12 h-12 border border-cyan-400/30 rounded-full flex items-center justify-center">
                <motion.div
                  className="w-4 h-4 bg-cyan-400/50 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-purple-400/30 rounded-xl flex items-center justify-center rotate-45">
                <motion.div
                  className="w-6 h-6 bg-purple-400/50 rounded"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="absolute top-1/2 left-4 w-8 h-8 border border-emerald-400/30 rounded-full">
                <motion.div
                  className="w-full h-full border-2 border-emerald-400/50 rounded-full"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button with Enhanced Styling */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-2xl shadow-cyan-600/30 hover:shadow-purple-600/30 flex items-center justify-center group transition-all duration-300"
        aria-label="Scroll to top"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <motion.div
          animate={{ rotate: [0, 0, -180] }}
          transition={{ duration: 0.3 }}
          className="group-hover:animate-bounce"
        >
          ↑
        </motion.div>
        
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.7, 0.2, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Background particle system */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  )
}