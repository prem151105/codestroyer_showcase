'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import SkillIconsGrid from './SkillIcons'
import ProjectPreviews from './ProjectPreviews'
import MovingSkills from './MovingSkills'
import MovingSkillsBands from './MovingSkillsBands'
import FloatingSkillsAnimation from './FloatingSkillsAnimation'
import { portfolioData } from '@/data/portfolioData'

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2, delay: number = 0) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  
  useEffect(() => {
    if (!hasStarted) return
    
    const timer = setTimeout(() => {
      let startTime: number
      let animationFrame: number
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOut * end))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      
      animationFrame = requestAnimationFrame(animate)
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [end, duration, delay, hasStarted])
  
  const trigger = () => setHasStarted(true)
  
  return { count, trigger }
}

interface CommandOutputProps {
  type: 'command' | 'output' | 'error' | 'component'
  content: string
  component?: 'skills' | 'projects'
}

const CommandOutput: React.FC<CommandOutputProps> = ({ type, content, component }) => {
  if (type === 'component') {
    switch (component) {
      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ml-2 md:ml-4 my-6"
          >
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-3">
                🛠️ Technical Skills & Expertise
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-6">
                Interactive skill showcase with continuous animations and live proficiency levels
              </p>
            </div>

            {/* Horizontal Moving Bands (100.dev Style) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 md:p-8 border border-gray-700 overflow-hidden"
            >
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-cyan-400 mb-2 flex items-center">
                  <span className="mr-2">🚀</span> 
                  <span className="hidden md:inline">Technology Stack - 100.dev Style</span>
                  <span className="md:hidden">Tech Stack Bands</span>
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  <span className="hidden md:inline">Horizontal moving technology bands inspired by cienfuegos.dev (100.dev)</span>
                  <span className="md:hidden">Moving skill bands</span>
                </p>
              </div>
              <MovingSkillsBands />
            </motion.div>

            {/* Enhanced Emoji Icons Flow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12 bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-4 md:p-8 border border-orange-500/30 overflow-hidden"
            >
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-orange-400 mb-2 flex items-center">
                  <span className="mr-2">⚡</span> 
                  <span className="hidden md:inline">Enhanced Skills Flow</span>
                  <span className="md:hidden">Skills Flow</span>
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  <span className="hidden md:inline">Multi-row animated skills with enhanced hover effects and mobile optimization</span>
                  <span className="md:hidden">Interactive skill icons</span>
                </p>
              </div>
              <MovingSkills skills={portfolioData.skills} variant="default" />
            </motion.div>

            {/* Floating Skills Animation (Particle Style) - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 relative bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-xl border border-purple-500/20 overflow-hidden h-80 md:h-96"
            >
              <div className="relative z-10 p-4 md:p-6 pb-0">
                <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-2 flex items-center">
                  <span className="mr-2">🌟</span> 
                  <span className="hidden md:inline">Floating Particle Skills</span>
                  <span className="md:hidden">Floating Skills</span>
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mb-4">
                  <span className="hidden md:inline">Advanced floating animation with smooth bezier curves and particle-like movement</span>
                  <span className="md:hidden">Interactive floating skill animation</span>
                </p>
              </div>
              <FloatingSkillsAnimation className="rounded-xl" />
            </motion.div>

            {/* Interactive Detailed Skills Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 hidden md:block"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-purple-400 mb-2 flex items-center">
                  📊 Detailed Proficiency Levels
                </h3>
                <p className="text-gray-400 text-sm">
                  Hover over each skill to see detailed proficiency and experience
                </p>
              </div>
              <SkillIconsGrid skills={portfolioData.skills} />
            </motion.div>

            {/* Mobile Simplified Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:hidden mb-8"
            >
              <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                📱 Quick Overview
              </h3>
              <div className="space-y-4">
                {Object.entries(portfolioData.skills).map(([category, skills], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-4"
                  >
                    <h4 className="text-cyan-400 font-semibold mb-2 capitalize">
                      {category === 'aiml' ? 'AI/ML' : category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-4 md:p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-gray-600"
            >
              <h3 className="text-lg md:text-xl font-bold text-orange-400 mb-4 flex items-center">
                <span className="mr-2">🏆</span> Coding Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {portfolioData.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="bg-black bg-opacity-50 p-3 md:p-4 rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors duration-300"
                  >
                    <div className="text-green-400 text-xs md:text-sm">• {achievement}</div>
                  </motion.div>
                ))}
              </div>
              

            </motion.div>
          </motion.div>
        )

      case 'projects':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ml-2 md:ml-4 my-6"
          >
            <ProjectPreviews projects={portfolioData.projects} />
            
            {/* Enhanced project stats */}
            <EnhancedProjectStats />
          </motion.div>
        )

      default:
        return null
    }
  }

  // Regular text output
  return (
    <div 
      className={`ml-4 whitespace-pre-wrap ${
        type === 'error' ? 'text-red-400' : 'text-green-400'
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

// Animated Statistics Component
const AnimatedStatsRow: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const techCount = useCountUp(18, 1.5, 0)
  const problemsCount = useCountUp(250, 2, 0.2)
  const ratingCount = useCountUp(1500, 2.5, 0.4)
  const experienceCount = useCountUp(3, 1, 0.6)
  
  useEffect(() => {
    if (isInView) {
      techCount.trigger()
      problemsCount.trigger()
      ratingCount.trigger()
      experienceCount.trigger()
    }
  }, [isInView])
  
  const stats = [
    { count: techCount.count, suffix: '+', label: 'Technologies', color: 'text-cyan-400', icon: '⚡' },
    { count: problemsCount.count, suffix: '+', label: 'Problems Solved', color: 'text-green-400', icon: '🎯' },
    { count: ratingCount.count, suffix: '+', label: 'LeetCode Rating', color: 'text-purple-400', icon: '🏆' },
    { count: experienceCount.count, suffix: '+', label: 'Years Experience', color: 'text-orange-400', icon: '💼' }
  ]
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="mt-6 pt-4 border-t border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ 
            scale: 1.1, 
            y: -5,
            transition: { duration: 0.2 }
          }}
          className="group cursor-pointer"
        >
          <div className="relative mb-2">
            <motion.div
              className={`text-xl md:text-2xl font-bold ${stat.color} relative z-10`}
              animate={isInView ? { 
                textShadow: [
                  `0 0 10px ${stat.color.includes('cyan') ? '#06b6d4' : stat.color.includes('green') ? '#10b981' : stat.color.includes('purple') ? '#a855f7' : '#f97316'}`,
                  `0 0 20px ${stat.color.includes('cyan') ? '#06b6d4' : stat.color.includes('green') ? '#10b981' : stat.color.includes('purple') ? '#a855f7' : '#f97316'}`,
                  `0 0 10px ${stat.color.includes('cyan') ? '#06b6d4' : stat.color.includes('green') ? '#10b981' : stat.color.includes('purple') ? '#a855f7' : '#f97316'}`
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stat.count}{stat.suffix}
            </motion.div>
            
            {/* Animated background glow */}
            <motion.div
              className={`absolute inset-0 rounded-full opacity-20 blur-sm ${stat.color.replace('text-', 'bg-')}`}
              animate={isInView ? {
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            />
          </div>
          
          <div className="flex items-center justify-center gap-1 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
            <span className="text-sm">{stat.icon}</span>
            {stat.label}
          </div>
          
          {/* Pulse effect on hover */}
          <motion.div
            className={`absolute inset-0 rounded-lg border-2 ${stat.color.replace('text-', 'border-')} opacity-0 group-hover:opacity-30`}
            animate={{
              scale: [1, 1.1],
              opacity: [0.3, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

// Enhanced Project Stats Component  
const EnhancedProjectStats: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const efficiencyCount = useCountUp(35, 2, 0)
  const automationCount = useCountUp(90, 2.2, 0.3)
  const reductionCount = useCountUp(60, 1.8, 0.6)
  
  useEffect(() => {
    if (isInView) {
      efficiencyCount.trigger()
      automationCount.trigger()
      reductionCount.trigger()
    }
  }, [isInView])
  
  const projectStats = [
    { 
      count: efficiencyCount.count, 
      suffix: '%', 
      label: 'Efficiency Improvement', 
      color: 'text-green-400', 
      icon: '📈',
      description: 'Average productivity boost across projects'
    },
    { 
      count: automationCount.count, 
      suffix: '%', 
      label: 'Automation Success', 
      color: 'text-blue-400', 
      icon: '🤖',
      description: 'Tasks successfully automated'
    },
    { 
      count: reductionCount.count, 
      suffix: '%', 
      label: 'Review Time Reduction', 
      color: 'text-purple-400', 
      icon: '⚡',
      description: 'Time saved in manual processes'
    }
  ]
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg border border-gray-600 overflow-hidden relative"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      
      <motion.h3 
        className="text-lg md:text-xl font-semibold text-cyan-400 mb-4 flex items-center relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.span 
          className="mr-2 text-2xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          📊
        </motion.span>
        Development Impact
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative z-10">
        {projectStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.2, type: "spring", stiffness: 150 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { duration: 0.3 }
            }}
            className="text-center p-4 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-gray-500 transition-all duration-300 group cursor-pointer"
          >
            <div className="mb-2">
              <motion.span 
                className="text-3xl block mb-2"
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3
                }}
              >
                {stat.icon}
              </motion.span>
              
              <motion.div 
                className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}
                animate={isInView ? {
                  textShadow: [
                    "0 0 10px currentColor",
                    "0 0 20px currentColor", 
                    "0 0 10px currentColor"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.count}{stat.suffix}
              </motion.div>
            </div>
            
            <div className={`text-sm font-medium ${stat.color} mb-1 group-hover:text-white transition-colors`}>
              {stat.label}
            </div>
            
            <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
              {stat.description}
            </div>
            
            {/* Progress bar animation */}
            <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${stat.color.replace('text-', 'bg-')} rounded-full`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${stat.count}%` } : { width: 0 }}
                transition={{ duration: 2, delay: 1 + index * 0.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-6 pt-4 border-t border-gray-700 text-center relative z-10"
      >
        <motion.p 
          className="text-gray-400 text-xs md:text-sm flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🌟
          </motion.span>
          All projects are <span className="text-green-400 font-semibold">open source</span> and include comprehensive documentation
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default CommandOutput