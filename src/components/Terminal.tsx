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
      {/* Enhanced Dynamic Background Effects */}
      <div className="absolute inset-0 terminal-grid opacity-20"></div>
      
      {/* Subtle Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="matrix-rain"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="floating-particles absolute inset-0"></div>
      
      <div 
        ref={terminalRef}
        className="p-4 md:p-8 min-h-screen relative z-20 terminal-content"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Enhanced Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="welcome-banner mb-6 md:mb-8"
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-center tracking-wide"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ANURAG JAYASWAL
          </motion.h1>
          
          <motion.div 
            className="text-center space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-lg md:text-xl text-gray-300 font-medium">
              AI/ML Developer & Software Engineer
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm md:text-base text-gray-400">
              <span>Type</span>
              <kbd className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg font-mono font-semibold shadow-lg">
                help
              </kbd>
              <span>to explore my portfolio</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 mt-4">
              <span className="flex items-center gap-1">
                <kbd className="bg-gray-700 px-1.5 py-0.5 rounded">↑</kbd>
                <kbd className="bg-gray-700 px-1.5 py-0.5 rounded">↓</kbd>
                History
              </span>
              <span className="flex items-center gap-1">
                <kbd className="bg-gray-700 px-1.5 py-0.5 rounded">Tab</kbd>
                Autocomplete
              </span>
              <span className="flex items-center gap-1">
                <kbd className="bg-gray-700 px-1.5 py-0.5 rounded">Ctrl+L</kbd>
                Clear
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Command History - Full scrollable history */}
        <div className="space-y-1 md:space-y-2 mb-6 md:mb-8">
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="terminal-line"
              >
                {entry.type === 'command' && (
                  <div className="flex">
                    <span className="text-cyan-400">{prompt}</span>
                    <span className="text-white">{entry.content}</span>
                  </div>
                )}
                {(entry.type === 'output' || entry.type === 'error' || entry.type === 'component') && (
                  <CommandOutput 
                    type={entry.type}
                    content={entry.content}
                    component={entry.component}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Enhanced Input Area */}
        <form onSubmit={handleSubmit} className="sticky bottom-0 bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700 p-3 shadow-2xl">
          <div className="flex items-center relative">
            <span className="command-prompt text-sm md:text-base">{prompt}</span>
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
              className="command-input ml-1 flex-1 text-sm md:text-base"
              disabled={isTyping}
              autoComplete="off"
              spellCheck={false}
              placeholder="Type a command... (try 'help')"
            />
            <AnimatedCursor isTyping={isTyping} variant="cyberpunk" />
          </div>
        </form>

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