'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminalLogic } from '@/hooks/useTerminalLogic'
import CommandSuggestions from './CommandSuggestions'

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
    suggestions
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
    <div className="min-h-screen bg-black text-green-400 font-mono-advanced terminal-text">
      <div 
        ref={terminalRef}
        className="p-8 min-h-screen"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Clean Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-6 text-orange-400 tracking-wider text-center">ANURAG</h1>
          <p className="mb-4">Welcome to my portfolio!</p>
          <p className="mb-2">Type <span className="text-orange-400">help</span> to get a list of available commands.</p>
          <p className="text-sm text-gray-400">Use <span className="text-orange-400">↑</span> and <span className="text-orange-400">↓</span> to navigate command history.</p>
        </motion.div>

        {/* Command History - Full scrollable history */}
        <div className="space-y-2 mb-8">
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
                {entry.type === 'output' && (
                  <div 
                    className="ml-4 whitespace-pre-wrap text-green-400"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                )}
                {entry.type === 'error' && (
                  <div className="ml-4 text-red-400">
                    {entry.content}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Current Input */}
        <form onSubmit={handleSubmit} className="sticky bottom-0 bg-black py-2">
          <div className="flex items-center">
            <span className="text-cyan-400">{prompt}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white font-mono ml-1 flex-1"
              disabled={isTyping}
              autoComplete="off"
              spellCheck={false}
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-white"
            >
              _
            </motion.span>
          </div>
        </form>

        {/* Command Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <CommandSuggestions 
            suggestions={suggestions} 
            onSelect={(cmd) => {
              setInput(cmd)
              inputRef.current?.focus()
            }} 
          />
        )}
      </div>


    </div>
  )
}