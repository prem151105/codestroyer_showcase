'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminalLogic } from '@/hooks/useTerminalLogic'
import CommandSuggestions from './CommandSuggestions'
import AnimatedCursor from './AnimatedCursor'
import CommandOutput from './CommandOutput'

export default function Terminal() {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  
  const {
    history,
    commandHistory,
    systemInfo,
    executeCommand,
    showSuggestions,
    suggestions,
    updateSuggestions,
    currentInput
  } = useTerminalLogic()

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Handle input submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsTyping(true)
    
    await executeCommand(input.trim())
    setInput('')
    updateSuggestions('')
    setHistoryIndex(-1)
    setIsTyping(false)
  }, [input, executeCommand])

  // Handle key events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]
        setInput(historyCommand)
        setHistoryIndex(newIndex)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]
        setInput(historyCommand)
        setHistoryIndex(newIndex)
      } else if (historyIndex === 0) {
        setInput('')
        setHistoryIndex(-1)
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple tab completion for commands
      const availableCommands = ['help', 'about', 'experience', 'projects', 'skills', 'education', 'contact', 'resume', 'clear']
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      executeCommand('clear')
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      setInput('')
      setHistoryIndex(-1)
    }
  }, [executeCommand, commandHistory, historyIndex, input])

  const prompt = `visitor@anurag:~$ `

  return (
    <div className="min-h-screen relative overflow-hidden terminal-container">
      {/* Spectacular Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
      
      {/* Advanced Particle System */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cosmic-particles"></div>
        <div className="neural-network"></div>
        <div className="floating-orbs"></div>
      </div>
      
      {/* Dynamic Light Rays */}
      <div className="absolute inset-0">
        <div className="light-rays"></div>
        <div className="pulse-rings"></div>
      </div>
      
      {/* Morphing Background Shapes */}
      <div className="absolute inset-0 morphing-shapes"></div>
      
      <div 
        ref={terminalRef}
        className="p-4 md:p-8 min-h-screen relative z-20 terminal-content"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Enhanced Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="welcome-banner mb-6 md:mb-8 relative"
        >
          {/* Dynamic Background Particles */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-30"
                animate={{
                  x: [0, Math.random() * 200 - 100],
                  y: [0, Math.random() * 100 - 50],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-center tracking-wide relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated text with typewriter effect */}
            {"ANURAG JAYASWAL".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.05,
                  delay: 0.5 + index * 0.05
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div 
            className="text-center space-y-3 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.p 
              className="text-lg md:text-xl text-gray-300 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {/* Typewriter effect for subtitle */}
              {"AI/ML Developer & Software Engineer".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.03,
                    delay: 1.5 + index * 0.03
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm md:text-base text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.5 }}
            >
              <span>Type</span>
              <motion.kbd 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg font-mono font-semibold shadow-lg cursor-pointer"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 20px rgba(249, 115, 22, 0.6)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 4px 15px rgba(249, 115, 22, 0.3)",
                    "0 4px 25px rgba(249, 115, 22, 0.5)",
                    "0 4px 15px rgba(249, 115, 22, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={() => {
                  setInput('help')
                  handleSubmit(new Event('submit') as any)
                }}
              >
                help
              </motion.kbd>
              <span>to explore my portfolio</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.5 }}
            >
              {[
                { keys: ['↑', '↓'], label: 'History' },
                { keys: ['Tab'], label: 'Autocomplete' },
                { keys: ['Ctrl+L'], label: 'Clear' }
              ].map((shortcut, index) => (
                <motion.span
                  key={shortcut.label}
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.7 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    color: 'rgb(156 163 175)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {shortcut.keys.map((key, keyIndex) => (
                    <motion.kbd
                      key={key}
                      className="bg-gray-700 px-1.5 py-0.5 rounded text-gray-300 border border-gray-600"
                      whileHover={{ 
                        backgroundColor: 'rgb(55 65 81)', 
                        borderColor: 'rgb(107 114 128)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      {key}
                    </motion.kbd>
                  ))}
                  {shortcut.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Command History - Full scrollable history */}
        <div className="space-y-1 md:space-y-2 mb-6 md:mb-8 relative z-20">
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="terminal-line relative"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  margin: '2px 0',
                  wordWrap: 'break-word',
                  overflowWrap: 'anywhere'
                }}
              >
                {entry.type === 'command' && (
                  <div className="flex flex-wrap items-start">
                    <span className="text-cyan-400 shrink-0">{prompt}</span>
                    <span className="text-white ml-1 break-words">{entry.content}</span>
                  </div>
                )}
                {(entry.type === 'output' || entry.type === 'error' || entry.type === 'component') && (
                  <div className="relative z-10">
                    <CommandOutput 
                      type={entry.type}
                      content={entry.content}
                      component={entry.component}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fluid Organic Input Area */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="sticky bottom-0 p-4 z-50"
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="relative group">
            {/* Flowing liquid background */}
            <motion.div
              className="absolute inset-0 blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-700"
              animate={{
                background: [
                  "radial-gradient(ellipse 300% 100% at 0% 50%, rgba(0,255,255,0.3), transparent 50%)",
                  "radial-gradient(ellipse 300% 100% at 100% 50%, rgba(255,0,255,0.3), transparent 50%)",
                  "radial-gradient(ellipse 300% 100% at 50% 0%, rgba(255,255,0,0.3), transparent 50%)",
                  "radial-gradient(ellipse 300% 100% at 0% 50%, rgba(0,255,255,0.3), transparent 50%)"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
              }}
            />
            
            {/* Organic morphing container */}
            <motion.div
              className="relative backdrop-blur-xl bg-gradient-to-r from-black/60 via-purple-900/30 to-black/60 group-hover:from-black/70 group-hover:via-purple-900/40 group-hover:to-black/70 transition-all duration-500"
              animate={{
                borderRadius: [
                  "25px 50px 25px 50px",
                  "50px 25px 50px 25px", 
                  "35px 65px 35px 65px",
                  "25px 50px 25px 50px"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                clipPath: 'polygon(2% 0%, 98% 0%, 100% 85%, 95% 100%, 5% 100%, 0% 85%)'
              }}
            >
              <div className="flex items-center px-8 py-5">
                {/* Flowing prompt */}
                <motion.span 
                  className="command-prompt text-base md:text-lg font-bold mr-4"
                  animate={{ 
                    background: [
                      "linear-gradient(45deg, #00ffff, #ff00ff)",
                      "linear-gradient(45deg, #ff00ff, #ffff00)", 
                      "linear-gradient(45deg, #ffff00, #00ffff)"
                    ],
                    textShadow: [
                      "0 0 20px rgba(0,255,255,0.6)",
                      "0 0 20px rgba(255,0,255,0.6)",
                      "0 0 20px rgba(255,255,0,0.6)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 }
                }}
                  style={{
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {prompt}
                </motion.span>
                
                {/* Fluid input field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    const newValue = e.target.value
                    setInput(newValue)
                    updateSuggestions(newValue)
                  }}
                  onKeyDown={handleKeyDown}
                  className="command-input-organic flex-1 text-base md:text-lg font-medium bg-transparent border-none outline-none text-white/95 caret-cyan-400"
                  disabled={isTyping}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="flow your thoughts here..."
                  style={{
                    textShadow: '0 0 10px rgba(0,255,255,0.3)'
                  }}
                />
                
                {/* Organic cursor */}
                <motion.div
                  className="ml-4"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 360],
                    filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.span
                    className="text-2xl"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(0,255,255,0.8)",
                        "0 0 20px rgba(255,0,255,0.8)",
                        "0 0 10px rgba(0,255,255,0.8)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </motion.div>
              </div>
              
              {/* Flowing energy lines */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden"
                style={{
                  borderRadius: '0 0 25px 50px'
                }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
            
            {/* Floating particles around input */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-40"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 60 - 30],
                    scale: [0.5, 1, 0.5],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`
                  }}
                />
              ))}
            </div>
          </div>
        </motion.form>

        {/* Command Suggestions */}
        <div className="relative">
          {showSuggestions && suggestions.length > 0 && (
            <CommandSuggestions 
              suggestions={suggestions} 
              currentInput={currentInput}
              onSelect={(cmd) => {
                setInput(cmd)
                updateSuggestions('')
                inputRef.current?.focus()
              }} 
            />
          )}
        </div>
      </div>


    </div>
  )
}