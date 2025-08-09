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
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    setSelectedIndex(0)
    setShowDetails(false)
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential': return 'text-cyan-400'
      case 'professional': return 'text-orange-400'
      case 'utility': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'essential': return '⭐'
      case 'professional': return '💼'
      case 'utility': return '🛠️'
      default: return '📝'
    }
  }

  if (suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="absolute top-full left-0 right-0 mt-2 bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-lg border border-gray-600 shadow-2xl z-50"
        style={{ minWidth: '280px', maxWidth: '90vw' }}
      >
        {/* Header */}
        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center gap-2 text-cyan-400 text-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              💡
            </motion.div>
            <span>Command Suggestions</span>
            <span className="text-xs text-gray-500">({suggestions.length} found)</span>
          </div>
        </div>

        {/* Suggestions */}
        <div className="max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => {
            const commandInfo = commandDetails[suggestion]
            const isSelected = index === selectedIndex
            
            return (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  p-3 cursor-pointer transition-all duration-200 border-l-4
                  ${isSelected 
                    ? 'bg-gray-800 border-cyan-400 shadow-lg' 
                    : 'hover:bg-gray-800 hover:bg-opacity-50 border-transparent'
                  }
                `}
                onClick={() => onSelect(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">
                        {getCategoryIcon(commandInfo?.category || 'essential')}
                      </span>
                      <span className={`font-mono text-lg ${getCategoryColor(commandInfo?.category || 'essential')}`}>
                        {suggestion}
                      </span>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-cyan-400"
                        >
                          ←
                        </motion.span>
                      )}
                    </div>
                    
                    {commandInfo && (
                      <p className="text-sm text-gray-400 ml-6">
                        {commandInfo.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500 ml-4">
                    {commandInfo?.category}
                  </div>
                </div>

                {/* Highlight matching part */}
                {currentInput && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs mt-2 ml-6 text-yellow-400"
                  >
                    Matches: <span className="bg-yellow-400 bg-opacity-20 px-1 rounded">
                      {currentInput}
                    </span>{suggestion.slice(currentInput.length)}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 bg-gray-800 bg-opacity-50 rounded-b-lg">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <div className="flex gap-4">
              <span>↑↓ Navigate</span>
              <span>Tab/Enter Select</span>
              <span>Esc Cancel</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span>Live suggestions</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}