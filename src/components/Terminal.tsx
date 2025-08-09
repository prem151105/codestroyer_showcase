'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminalLogic } from '@/hooks/useTerminalLogic'
import CommandSuggestions from './CommandSuggestions'
import AnimatedCursor from './AnimatedCursor'
import Dynamic3DUI, { Floating3DCards } from './Dynamic3DUI'
import CommandOutput from './CommandOutput'
import LeftSideSkills from './LeftSideSkills'

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
    <div className="min-h-screen bg-black text-green-400 font-mono-advanced terminal-text relative overflow-hidden">
      {/* Left Side Moving Skills */}
      <LeftSideSkills />
      
      {/* 3D Background */}
      <Dynamic3DUI />
      <Floating3DCards />
      
      <div 
        ref={terminalRef}
        className="p-4 md:p-8 lg:pl-24 min-h-screen relative z-20 terminal-scroll"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Clean Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-orange-400 tracking-wider text-center">ANURAG</h1>
          <div className="text-center md:text-left space-y-2 md:space-y-0">
            <p className="mb-2 md:mb-4 text-sm md:text-base">Welcome to my portfolio!</p>
            <p className="mb-1 md:mb-2 text-sm md:text-base">
              Type <span className="text-orange-400 font-semibold">help</span> to get a list of available commands.
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              <span className="hidden md:inline">Use </span>
              <span className="text-orange-400">↑</span> and <span className="text-orange-400">↓</span> to navigate 
              <span className="hidden md:inline"> command</span> history
              <span className="md:hidden">.</span>
            </p>
          </div>
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

        {/* Current Input */}
        <form onSubmit={handleSubmit} className="sticky bottom-0 bg-black py-2">
          <div className="flex items-center relative">
            <span className="text-cyan-400">{prompt}</span>
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
              className="bg-transparent border-none outline-none text-white font-mono ml-1 flex-1"
              disabled={isTyping}
              autoComplete="off"
              spellCheck={false}
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