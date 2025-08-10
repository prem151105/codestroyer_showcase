'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCursorProps {
  isTyping?: boolean
  variant?: 'default' | 'matrix' | 'cyberpunk' | 'magnetic' | 'trail'
  magneticRadius?: number
  trailLength?: number
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ 
  isTyping = false, 
  variant = 'default',
  magneticRadius = 50,
  trailLength = 5
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([])
  const cursorRef = useRef<HTMLSpanElement>(null)
  
  // Smooth mouse tracking with springs
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (isTyping) {
      setIsVisible(true)
      return
    }
    
    const interval = setInterval(() => {
      setIsVisible(prev => !prev)
    }, 530) // Slightly faster than typical terminal blink
    
    return () => clearInterval(interval)
  }, [isTyping])

  // Enhanced mouse tracking for magnetic and trail effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY }
    setMousePosition(newPosition)
    
    if (variant === 'trail') {
      setTrail(prev => {
        const newTrail = [newPosition, ...prev.slice(0, trailLength - 1)]
        return newTrail
      })
    }

    if (variant === 'magnetic' && cursorRef.current) {
      const rect = cursorRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )
      
      if (distance < magneticRadius) {
        const force = (magneticRadius - distance) / magneticRadius
        const deltaX = (e.clientX - centerX) * force * 0.3
        const deltaY = (e.clientY - centerY) * force * 0.3
        
        cursorX.set(deltaX)
        cursorY.set(deltaY)
      } else {
        cursorX.set(0)
        cursorY.set(0)
      }
    }
  }, [variant, magneticRadius, trailLength, cursorX, cursorY])

  useEffect(() => {
    if (variant === 'magnetic' || variant === 'trail') {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [variant, handleMouseMove])

  const getCursorVariant = () => {
    switch (variant) {
      case 'matrix':
        return {
          color: 'text-green-400',
          glow: 'drop-shadow-[0_0_10px_#4ade80]',
          char: '█',
          bgGlow: 'bg-green-400/20'
        }
      case 'cyberpunk':
        return {
          color: 'text-cyan-400',
          glow: 'drop-shadow-[0_0_15px_#06b6d4]',
          char: '▊',
          bgGlow: 'bg-cyan-400/20'
        }
      case 'magnetic':
        return {
          color: 'text-purple-400',
          glow: 'drop-shadow-[0_0_20px_#a855f7]',
          char: '●',
          bgGlow: 'bg-purple-400/30'
        }
      case 'trail':
        return {
          color: 'text-pink-400',
          glow: 'drop-shadow-[0_0_12px_#ec4899]',
          char: '◆',
          bgGlow: 'bg-pink-400/25'
        }
      default:
        return {
          color: 'text-white',
          glow: '',
          char: '_',
          bgGlow: 'bg-white/10'
        }
    }
  }

  const cursorStyle = getCursorVariant()

  if (isTyping) {
    return (
      <motion.span
        ref={cursorRef}
        className={`relative inline-block ${cursorStyle.color} ${cursorStyle.glow}`}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.1, 1],
          rotate: variant === 'cyberpunk' ? [0, 5, -5, 0] : 0
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          x: variant === 'magnetic' ? cursorXSpring : 0,
          y: variant === 'magnetic' ? cursorYSpring : 0
        }}
      >
        {/* Enhanced background glow */}
        <motion.span
          className={`absolute inset-0 rounded-full ${cursorStyle.bgGlow} blur-sm`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main cursor character */}
        <span className="relative z-10">
          {cursorStyle.char}
        </span>
        
        {/* Particle effects for special variants */}
        {(variant === 'cyberpunk' || variant === 'magnetic') && (
          <motion.div
            className="absolute top-0 left-0 w-1 h-1 bg-current rounded-full opacity-60"
            animate={{
              scale: [0, 1, 0],
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
          />
        )}
      </motion.span>
    )
  }

  return (
    <div className="relative">
      {/* Trail effect for trail variant */}
      {variant === 'trail' && (
        <AnimatePresence>
          {trail.map((position, index) => (
            <motion.div
              key={index}
              className={`fixed pointer-events-none z-50 ${cursorStyle.color} ${cursorStyle.glow}`}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ 
                opacity: 0.8 - (index * 0.15), 
                scale: 1 - (index * 0.1)
              }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                left: position.x - 4,
                top: position.y - 4,
              }}
            >
              {cursorStyle.char}
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {/* Main cursor */}
      <AnimatePresence>
        {isVisible && (
          <motion.span
            ref={cursorRef}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`relative inline-block ${cursorStyle.color} ${cursorStyle.glow}`}
            style={{
              x: variant === 'magnetic' ? cursorXSpring : 0,
              y: variant === 'magnetic' ? cursorYSpring : 0
            }}
            whileHover={variant === 'magnetic' ? {
              scale: 1.2,
              rotate: 180,
              transition: { duration: 0.3 }
            } : undefined}
          >
            {/* Enhanced idle animation */}
            <motion.span
              className={`absolute inset-0 rounded-full ${cursorStyle.bgGlow} blur-sm`}
              animate={variant !== 'default' ? {
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 360]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <span className="relative z-10">
              {cursorStyle.char}
            </span>
            
            {/* Enhanced pulse rings for advanced variants */}
            {(variant === 'magnetic' || variant === 'cyberpunk') && (
              <>
                <motion.span
                  className={`absolute inset-0 rounded-full border-2 ${cursorStyle.color.replace('text-', 'border-')}`}
                  animate={{
                    scale: [1, 2],
                    opacity: [0.5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0
                  }}
                />
                <motion.span
                  className={`absolute inset-0 rounded-full border-2 ${cursorStyle.color.replace('text-', 'border-')}`}
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.3, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
              </>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AnimatedCursor