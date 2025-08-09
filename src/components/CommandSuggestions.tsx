'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CommandSuggestionsProps {
  suggestions: string[]
  onSelect: (command: string) => void
  currentInput: string
}

interface CommandInfo {
  name: string
  description: string
  example: string
  category: 'essential' | 'professional' | 'utility' | 'interactive' | 'system'
  icon: string
  shortcut?: string
}

const commandDetails: Record<string, CommandInfo> = {
  help: { name: 'help', description: 'Show all available commands', example: 'help', category: 'essential', icon: '💡', shortcut: '?' },
  about: { name: 'about', description: 'Learn about me and my background', example: 'about', category: 'essential', icon: '👨‍💻' },
  experience: { name: 'experience', description: 'View my work experience', example: 'experience', category: 'professional', icon: '💼' },
  projects: { name: 'projects', description: 'Explore my technical projects', example: 'projects', category: 'professional', icon: '🚀' },
  skills: { name: 'skills', description: 'View my technical skills', example: 'skills', category: 'professional', icon: '⚡' },
  education: { name: 'education', description: 'Check my educational background', example: 'education', category: 'professional', icon: '🎓' },
  contact: { name: 'contact', description: 'Get my contact information', example: 'contact', category: 'essential', icon: '📧' },
  resume: { name: 'resume', description: 'View or download my resume', example: 'resume', category: 'professional', icon: '📄' },
  clear: { name: 'clear', description: 'Clear the terminal screen', example: 'clear', category: 'utility', icon: '🧹', shortcut: 'Ctrl+L' },
  achievements: { name: 'achievements', description: 'View my coding achievements', example: 'achievements', category: 'professional', icon: '🏆' },
  coding: { name: 'coding', description: 'Coding platform statistics', example: 'coding', category: 'professional', icon: '💻' },
  snake: { name: 'snake', description: 'Play the Snake game', example: 'snake', category: 'interactive', icon: '🐍' },
  typing: { name: 'typing', description: 'Take a typing speed test', example: 'typing', category: 'interactive', icon: '⌨️' },
  matrix: { name: 'matrix', description: 'Matrix rain animation', example: 'matrix', category: 'interactive', icon: '🔢' },
  theme: { name: 'theme', description: 'Change terminal theme', example: 'theme classic', category: 'utility', icon: '🎨' },
  ls: { name: 'ls', description: 'List directory contents', example: 'ls', category: 'system', icon: '📁' },
  pwd: { name: 'pwd', description: 'Show current directory', example: 'pwd', category: 'system', icon: '📍' },
  cd: { name: 'cd', description: 'Change directory', example: 'cd /projects', category: 'system', icon: '➡️' }
}

export default function CommandSuggestions({ suggestions, onSelect, currentInput }: CommandSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setSelectedIndex(0)
  }, [suggestions])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (suggestions.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % suggestions.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev === 0 ? suggestions.length - 1 : prev - 1)
          break
        case 'Enter':
          e.preventDefault()
          onSelect(suggestions[selectedIndex])
          break
        case 'Tab':
          e.preventDefault()
          onSelect(suggestions[selectedIndex])
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [suggestions, selectedIndex, onSelect])

  if (suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute top-full left-0 right-0 mt-6 z-50"
      >
        {/* Flowing liquid suggestions */}
        <div className="flex flex-wrap gap-3 justify-start">
          {suggestions.slice(0, 8).map((suggestion, index) => {
            const commandInfo = commandDetails[suggestion]
            const isSelected = index === selectedIndex
            
            return (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, scale: 0, rotate: -180, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  scale: isSelected ? 1.15 : 1, 
                  rotate: 0, 
                  y: 0,
                  z: isSelected ? 20 : 0
                }}
                exit={{ opacity: 0, scale: 0, rotate: 180, y: -50 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, 5, -5, 0],
                  transition: { rotate: { duration: 0.5 } }
                }}
                className="cursor-pointer group relative"
                onClick={() => onSelect(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {/* Liquid blob background */}
                <motion.div
                  className={`
                    absolute inset-0 blur-xl transition-all duration-500
                    ${isSelected 
                      ? 'bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-pink-400/30' 
                      : 'bg-gradient-to-br from-gray-600/20 via-gray-700/20 to-gray-600/20 group-hover:from-cyan-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20'
                    }
                  `}
                  animate={isSelected ? {
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360]
                  } : {}}
                  transition={{ duration: 3, repeat: isSelected ? Infinity : 0 }}
                  style={{
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    transform: 'rotate(45deg)'
                  }}
                />
                
                {/* Main suggestion pill */}
                <motion.div
                  className={`
                    relative px-6 py-3 backdrop-blur-lg transition-all duration-300
                    ${isSelected 
                      ? 'bg-gradient-to-r from-black/70 via-purple-900/50 to-black/70 shadow-2xl shadow-cyan-500/30' 
                      : 'bg-gradient-to-r from-black/50 via-gray-900/40 to-black/50 group-hover:from-black/60 group-hover:via-purple-900/30 group-hover:to-black/60'
                    }
                  `}
                  animate={isSelected ? {
                    boxShadow: [
                      "0 0 20px rgba(0,255,255,0.3)", 
                      "0 0 40px rgba(255,0,255,0.4)", 
                      "0 0 20px rgba(0,255,255,0.3)"
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                  style={{
                    borderRadius: '25px 15px 30px 10px',
                    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Floating icon */}
                    <motion.span
                      className="text-xl"
                      animate={isSelected ? {
                        scale: [1, 1.4, 1],
                        rotate: [0, 15, -15, 0],
                        filter: ["hue-rotate(0deg)", "hue-rotate(120deg)", "hue-rotate(240deg)", "hue-rotate(360deg)"]
                      } : {}}
                      transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                    >
                      {commandInfo?.icon || '✨'}
                    </motion.span>
                    
                    {/* Command text with highlight */}
                    <motion.span
                      className={`font-mono font-semibold transition-all duration-300 ${
                        isSelected 
                          ? 'text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-lg' 
                          : 'text-gray-300 group-hover:text-white text-base'
                      }`}
                      animate={isSelected ? {
                        textShadow: [
                          "0 0 10px rgba(0,255,255,0.5)",
                          "0 0 20px rgba(255,255,255,0.8)",
                          "0 0 10px rgba(255,0,255,0.5)"
                        ]
                      } : {}}
                      transition={{ duration: 1.5, repeat: isSelected ? Infinity : 0 }}
                    >
                      {currentInput && suggestion.toLowerCase().includes(currentInput.toLowerCase()) ? (
                        <>
                          {suggestion.split(new RegExp(`(${currentInput})`, 'gi')).map((part, i) => (
                            part.toLowerCase() === currentInput.toLowerCase() ? (
                              <motion.span
                                key={i}
                                className="bg-gradient-to-r from-yellow-300 to-orange-400 text-black px-1 rounded-md font-black"
                                animate={{
                                  boxShadow: [
                                    "0 0 5px rgba(255,255,0,0.6)",
                                    "0 0 15px rgba(255,165,0,0.8)",
                                    "0 0 5px rgba(255,255,0,0.6)"
                                  ]
                                }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                {part}
                              </motion.span>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          ))}
                        </>
                      ) : (
                        suggestion
                      )}
                    </motion.span>
                  </div>
                  
                  {/* Description tooltip */}
                  {isSelected && commandInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 backdrop-blur-md text-xs text-cyan-200 whitespace-nowrap"
                      style={{
                        borderRadius: '20px 5px 20px 5px',
                        clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                      }}
                    >
                      <motion.span
                        animate={{
                          textShadow: [
                            "0 0 5px rgba(0,255,255,0.3)",
                            "0 0 10px rgba(0,255,255,0.6)",
                            "0 0 5px rgba(0,255,255,0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {commandInfo.description}
                      </motion.span>
                      
                      {/* Floating triangle pointer */}
                      <div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/80"
                      />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-white text-xs flex items-center justify-center font-bold"
                    style={{ borderRadius: '50% 20% 50% 20%' }}
                  >
                    ⚡
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
        
        {/* Floating help text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-6 gap-6"
        >
          <motion.div
            className="flex items-center gap-2 text-xs text-gray-500"
            whileHover={{ scale: 1.05, color: "#64ffda" }}
          >
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-cyan-400"
            >
              ↑↓
            </motion.span>
            <span>navigate</span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 text-xs text-gray-500"
            whileHover={{ scale: 1.05, color: "#a78bfa" }}
          >
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-purple-400"
            >
              ⏎
            </motion.span>
            <span>select</span>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 text-xs text-gray-500"
            whileHover={{ scale: 1.05, color: "#f472b6" }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full"
            />
            <span>ai powered</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}