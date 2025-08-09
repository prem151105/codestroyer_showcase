'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  icon: string
  color: string
  logoUrl?: string
}

interface FloatingSkillsAnimationProps {
  skills?: Skill[]
  className?: string
}

const FloatingSkillsAnimation: React.FC<FloatingSkillsAnimationProps> = ({ 
  skills: customSkills = [],
  className = ''
}) => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const defaultSkills: Skill[] = [
    { name: 'Python', icon: '🐍', color: '#3776ab', logoUrl: '/icons/python.png' },
    { name: 'JavaScript', icon: '🟨', color: '#f7df1e', logoUrl: '/icons/javascript.png' },
    { name: 'TypeScript', icon: '🔷', color: '#3178c6', logoUrl: '/icons/typescript.png' },
    { name: 'React', icon: '⚛️', color: '#61dafb', logoUrl: '/icons/react.png' },
    { name: 'Node.js', icon: '🟢', color: '#339933', logoUrl: '/icons/nodejs.png' },
    { name: 'Docker', icon: '🐳', color: '#2496ed', logoUrl: '/icons/docker.png' },
    { name: 'AWS', icon: '☁️', color: '#ff9900', logoUrl: '/icons/aws.png' },
    { name: 'Git', icon: '🌿', color: '#f05032', logoUrl: '/icons/git.png' },
    { name: 'MongoDB', icon: '🍃', color: '#47a248', logoUrl: '/icons/mongodb.png' },
    { name: 'Redis', icon: '🔴', color: '#dc382d', logoUrl: '/icons/redis.png' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791', logoUrl: '/icons/postgresql.png' },
    { name: 'GraphQL', icon: '🔮', color: '#e10098', logoUrl: '/icons/graphql.png' },
    { name: 'Kubernetes', icon: '⚙️', color: '#326ce5', logoUrl: '/icons/kubernetes.png' },
    { name: 'TensorFlow', icon: '🧠', color: '#ff6f00', logoUrl: '/icons/tensorflow.png' },
    { name: 'PyTorch', icon: '🔥', color: '#ee4c2c', logoUrl: '/icons/pytorch.png' },
    { name: 'Next.js', icon: '▲', color: '#000000', logoUrl: '/icons/nextjs.png' },
    { name: 'Tailwind', icon: '💨', color: '#06b6d4', logoUrl: '/icons/tailwind.png' },
    { name: 'VS Code', icon: '💙', color: '#007acc', logoUrl: '/icons/vscode.png' },
    { name: 'Linux', icon: '🐧', color: '#fcc624', logoUrl: '/icons/linux.png' },
    { name: 'Nginx', icon: '🔧', color: '#009639', logoUrl: '/icons/nginx.png' }
  ]

  const skillsToUse = customSkills.length > 0 ? customSkills : defaultSkills

  const generateRandomPath = (index: number) => {
    const startX = Math.random() * windowSize.width
    const startY = Math.random() * windowSize.height
    
    // Create smooth bezier curve paths
    const controlPoint1X = Math.random() * windowSize.width
    const controlPoint1Y = Math.random() * windowSize.height
    const controlPoint2X = Math.random() * windowSize.width  
    const controlPoint2Y = Math.random() * windowSize.height
    const endX = Math.random() * windowSize.width
    const endY = Math.random() * windowSize.height

    return {
      startX,
      startY,
      controlPoint1X,
      controlPoint1Y,
      controlPoint2X,
      controlPoint2Y,
      endX,
      endY,
      duration: 20 + Math.random() * 15, // 20-35 seconds
      delay: Math.random() * 5 // 0-5 seconds delay
    }
  }

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {skillsToUse.map((skill, index) => {
        const path = generateRandomPath(index)
        const size = 40 + Math.random() * 40 // 40-80px
        
        return (
          <motion.div
            key={`floating-${skill.name}-${index}`}
            className="absolute pointer-events-auto cursor-pointer"
            initial={{
              x: path.startX,
              y: path.startY,
              opacity: 0,
              scale: 0.5,
              rotate: 0
            }}
            animate={{
              x: [
                path.startX,
                path.controlPoint1X,
                path.controlPoint2X,
                path.endX,
                path.startX
              ],
              y: [
                path.startY,
                path.controlPoint1Y,
                path.controlPoint2Y,
                path.endY,
                path.startY
              ],
              opacity: [0, 0.7, 0.9, 0.7, 0],
              scale: [0.5, 1, 1.1, 1, 0.5],
              rotate: [0, 180, 360, 540, 720]
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
            whileHover={{
              scale: 1.3,
              rotate: 0,
              opacity: 1,
              transition: { duration: 0.3 }
            }}
            style={{
              width: size,
              height: size,
            }}
          >
            {/* Background circle with glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-sm opacity-30"
              style={{
                backgroundColor: skill.color,
                boxShadow: `0 0 30px ${skill.color}60`
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main skill container */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center border-2 backdrop-blur-sm"
              style={{
                backgroundColor: `${skill.color}20`,
                borderColor: `${skill.color}60`,
                boxShadow: `0 4px 20px ${skill.color}40`
              }}
            >
              {/* Skill icon/logo */}
              <div className="relative z-10 w-3/5 h-3/5 flex items-center justify-center">
                {skill.logoUrl ? (
                  <img
                    src={skill.logoUrl}
                    alt={skill.name}
                    className="w-full h-full object-contain drop-shadow-lg"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling!.style.display = 'block'
                    }}
                  />
                ) : null}
                <span 
                  className="text-xl font-bold drop-shadow-lg"
                  style={{ display: skill.logoUrl ? 'none' : 'block' }}
                >
                  {skill.icon}
                </span>
              </div>

              {/* Tooltip on hover */}
              <motion.div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                           bg-gray-900/95 border border-gray-600 text-white px-3 py-1 rounded-lg text-sm
                           opacity-0 hover:opacity-100 transition-all duration-300
                           whitespace-nowrap pointer-events-none z-20 backdrop-blur-sm font-medium"
                whileHover={{
                  scale: 1.05,
                  y: -2
                }}
              >
                {skill.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                               border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700" />
              </motion.div>

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 opacity-0"
                style={{ borderColor: skill.color }}
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            </div>
          </motion.div>
        )
      })}
      
      {/* Gradient overlays to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-20 pointer-events-none" />
    </div>
  )
}

export default FloatingSkillsAnimation