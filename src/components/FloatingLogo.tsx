'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function FloatingLogo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Wire from top */}
      <motion.div
        className="absolute top-0 left-1/2 w-1 bg-gradient-to-b from-cyan-400 to-purple-400 shadow-lg shadow-cyan-400/50"
        style={{ height: '40%', transform: 'translateX(-50%)' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      {/* Connection point */}
      <motion.div
        className="absolute w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
        style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      />

      {/* Small wire connecting to logo */}
      <motion.div
        className="absolute w-px h-20 bg-gradient-to-b from-cyan-400 to-purple-400"
        style={{ top: '42%', left: '50%', transform: 'translateX(-50%)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
      />

      {/* Main floating logo container */}
      <motion.div
        className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-400/50 rounded-2xl shadow-2xl shadow-purple-400/20"
        style={{ width: '280px', height: '180px', marginTop: '120px' }}
        initial={{ y: 50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2 }}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          rotateX: 5
        }}
      >
        {/* Floating animation */}
        <motion.div
          className="w-full h-full"
          animate={{
            y: [0, -10, 0],
            rotateZ: [-1, 1, -1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 30px rgba(139, 92, 246, 0.3)",
                "0 0 50px rgba(59, 130, 246, 0.5)",
                "0 0 30px rgba(139, 92, 246, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Inner content */}
          <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center">
            {/* Logo symbol */}
            <motion.div
              className="text-6xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(34, 211, 238, 0.5)",
                  "0 0 30px rgba(147, 51, 234, 0.5)",
                  "0 0 20px rgba(34, 211, 238, 0.5)"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              AJ
            </motion.div>

            {/* Name */}
            <motion.div
              className="text-lg font-semibold text-white/90 mb-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ANURAG JAYASWAL
            </motion.div>

            {/* Title */}
            <div className="text-sm text-purple-300">
              AI/ML Developer
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60" />
            <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60" />
            <div className="absolute top-6 left-6 w-1 h-1 bg-blue-400 rounded-full opacity-40" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating particles around logo */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
          style={{
            left: `${45 + Math.cos(i * 45 * Math.PI / 180) * 150}px`,
            top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 100}px`
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.8, 0.2],
            x: [0, Math.cos(i * 45 * Math.PI / 180) * 20, 0],
            y: [0, Math.sin(i * 45 * Math.PI / 180) * 15, 0]
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}

      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          className="absolute w-64 h-64 border border-purple-400 rounded-full"
          style={{ top: '20%', right: '10%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-48 h-48 border border-cyan-400"
          style={{ bottom: '15%', left: '15%', borderRadius: '30% 70% 70% 30%' }}
          animate={{ 
            rotate: -360,
            borderRadius: [
              "30% 70% 70% 30%",
              "70% 30% 30% 70%", 
              "30% 70% 70% 30%"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  )
}