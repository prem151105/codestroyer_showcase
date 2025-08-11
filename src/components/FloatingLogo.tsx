'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingLogo() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Neural Network Background Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="3" fill="url(#neuron-gradient)">
                <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="25" cy="25" r="2" fill="url(#neuron-gradient)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="75" cy="25" r="2" fill="url(#neuron-gradient)">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="25" cy="75" r="2" fill="url(#neuron-gradient)">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="75" cy="75" r="2" fill="url(#neuron-gradient)">
                <animate attributeName="opacity" values="0.6;0.7;0.6" dur="4.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Neural connections */}
              <path d="M25,25 L50,50 L75,25" stroke="url(#connection-gradient)" strokeWidth="0.5" opacity="0.4">
                <animate attributeName="stroke-dasharray" values="0,100;50,100;100,100" dur="5s" repeatCount="indefinite" />
              </path>
              <path d="M25,75 L50,50 L75,75" stroke="url(#connection-gradient)" strokeWidth="0.5" opacity="0.4">
                <animate attributeName="stroke-dasharray" values="0,100;50,100;100,100" dur="6s" repeatCount="indefinite" />
              </path>
              <path d="M25,25 L25,75" stroke="url(#connection-gradient)" strokeWidth="0.5" opacity="0.3" />
              <path d="M75,25 L75,75" stroke="url(#connection-gradient)" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            
            <linearGradient id="neuron-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            
            <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      {/* Floating Data Streams */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-t from-transparent via-cyan-400 to-transparent opacity-30"
            style={{
              left: `${10 + i * 8}%`,
              height: '200px',
            }}
            animate={{
              y: [-200, window.innerHeight],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Quantum Dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* AI Brain Visualization */}
      <motion.div
        className="relative z-10 group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Main Brain Container */}
        <motion.div
          className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-2 border-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl"
          style={{ width: '340px', height: '220px' }}
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ 
            scale: 1.02,
            rotateY: 5,
            rotateX: 2
          }}
        >
          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl p-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
            animate={{
              background: [
                "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)",
                "linear-gradient(45deg, #ec4899, #06b6d4, #8b5cf6)", 
                "linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4)",
                "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-full h-full bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-3xl" />
          </motion.div>

          {/* Floating Animation */}
          <motion.div
            className="relative z-10 w-full h-full"
            animate={{
              y: [0, -8, 0],
              rotateZ: [-0.5, 0.5, -0.5]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Glowing Aura */}
            <motion.div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(6, 182, 212, 0.4)",
                  "0 0 60px rgba(139, 92, 246, 0.6)",
                  "0 0 40px rgba(236, 72, 153, 0.4)",
                  "0 0 40px rgba(6, 182, 212, 0.4)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Main Content */}
            <div className="relative z-20 p-8 h-full flex flex-col items-center justify-center text-center">
              {/* AI Brain Icon */}
              <motion.div
                className="relative mb-4"
                animate={isHovered ? { 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
              >
                <motion.div
                  className="text-7xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🧠
                </motion.div>

                {/* Pulsing Ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400 rounded-full opacity-30"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Name with Typewriter Effect */}
              <motion.div
                className="text-xl font-bold text-white/90 mb-1 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {"ANURAG_JAYASWAL".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.05 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              {/* Animated Title */}
              <motion.div
                className="text-sm bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent font-semibold"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                AI/ML_DEVELOPER.EXE
              </motion.div>

              {/* Status Indicators */}
              <div className="flex items-center gap-3 mt-4">
                <motion.div className="flex items-center gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    animate={{
                      boxShadow: [
                        "0 0 5px rgba(16, 185, 129, 0.5)",
                        "0 0 10px rgba(16, 185, 129, 0.8)",
                        "0 0 5px rgba(16, 185, 129, 0.5)"
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs text-emerald-300 font-mono">ONLINE</span>
                </motion.div>
                
                <motion.div className="flex items-center gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-xs text-cyan-300 font-mono">PROCESSING</span>
                </motion.div>
              </div>
            </div>

            {/* Circuit Pattern Overlay */}
            <div className="absolute inset-4 opacity-10 pointer-events-none">
              <svg width="100%" height="100%" className="text-cyan-400">
                <pattern id="circuit" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M0,15 L30,15 M15,0 L15,30" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.3" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#circuit)" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Orbiting Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-60"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: `${120 + i * 20}px center`,
              }}
              animate={{ 
                rotate: 360,
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                rotate: { duration: 8 + i, repeat: Infinity, ease: "linear" },
                scale: { duration: 2 + i * 0.3, repeat: Infinity }
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Interactive Hover Effects */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Energy Waves */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-cyan-400/30 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${200 + i * 100}px`,
                  height: `${200 + i * 100}px`,
                  marginLeft: `${-100 - i * 50}px`,
                  marginTop: `${-100 - i * 50}px`,
                }}
                animate={{
                  scale: [0.8, 1.5, 0.8],
                  opacity: [0.5, 0.1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <motion.div
          className="text-xs text-cyan-400 font-mono leading-none whitespace-pre"
          style={{
            transform: "translateY(-100%)"
          }}
          animate={{
            y: ["100vh", "-100%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array.from({ length: 50 }, (_, i) => 
            Array.from({ length: 20 }, () => 
              Math.random() > 0.7 ? "1" : "0"
            ).join("") + "\n"
          ).join("")}
        </motion.div>
      </div>
    </div>
  )
}