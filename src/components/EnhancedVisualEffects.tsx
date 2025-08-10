'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Particle Effects Component
export const ParticleEffects: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Gradient Animation Component
export const GradientAnimation: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 opacity-30"
      animate={{
        background: [
          "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)",
          "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%)",
          "radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3), transparent 50%)",
          "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

// Loading Animation Component
export const LoadingAnimation: React.FC<{ message?: string }> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-cyan-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  )
}

// Scroll-triggered Animation Wrapper
export const ScrollReveal: React.FC<{
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}> = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Interactive Button with Micro-interactions
export const InteractiveButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}> = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = "relative px-6 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden group"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500",
    secondary: "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-400 hover:to-pink-500",
    ghost: "border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
        initial={false}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Skill Tag with Hover Effects
export const SkillTag: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <motion.span
      className={`inline-block px-3 py-1 m-1 text-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full text-cyan-400 cursor-default ${className}`}
      whileHover={{
        scale: 1.05,
        borderColor: "rgba(34, 211, 238, 0.6)",
        boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  )
}

// Project Card with Enhanced Interactions
export const ProjectCard: React.FC<{
  title: string
  description: string
  tech: string
  github?: string
  demo?: string
  className?: string
}> = ({ title, description, tech, github, demo, className = '' }) => {
  return (
    <motion.div
      className={`relative p-6 border border-gray-700 rounded-lg bg-gray-900/50 backdrop-blur-sm group overflow-hidden ${className}`}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{title}</h3>
        <p className="text-gray-300 mb-3 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.split(', ').map((t, i) => (
            <SkillTag key={i}>{t}</SkillTag>
          ))}
        </div>
        <div className="flex gap-3">
          {github && (
            <InteractiveButton 
              variant="ghost" 
              onClick={() => window.open(github, '_blank')}
            >
              GitHub
            </InteractiveButton>
          )}
          {demo && (
            <InteractiveButton 
              variant="primary" 
              onClick={() => window.open(demo, '_blank')}
            >
              Live Demo
            </InteractiveButton>
          )}
        </div>
      </div>

      {/* Hover effect border */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-lg pointer-events-none"
        initial={false}
      />
    </motion.div>
  )
}