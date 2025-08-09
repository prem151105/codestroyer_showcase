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
    <div className="min-h-screen font-mono-advanced terminal-text terminal-content">
      <div 
        ref={terminalRef}
        className="p-6 overflow-hidden"
        style={{ height: '100vh' }}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex-1 flex flex-col">
          {/* Show welcome when no history */}
          {history.length === 0 && (
            <div className="flex-1 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-center"
              >
                <h1 className="text-5xl font-bold mb-6 text-warning tracking-wider" style={{fontWeight: 700, letterSpacing: '0.1em'}}>ANURAG</h1>
                <p className="mb-4">Welcome to my portfolio!</p>
                <p className="mb-2">Type <span className="text-warning">help</span> to get a list of available commands.</p>
                <p className="text-sm text-secondary">Use <span className="text-warning">↑</span> and <span className="text-warning">↓</span> to navigate command history.</p>
              </motion.div>
            </div>
          )}

        {/* Command History - Limited to fit screen */}
        {history.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-hidden flex-1">
            <AnimatePresence>
              {history.slice(-3).map((entry, index) => (
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
                    <span className="text-success">{prompt}</span>
                    <span>{entry.content}</span>
                  </div>
                )}
                {entry.type === 'output' && (
                  <div 
                    className="ml-4 whitespace-pre-wrap text-sm leading-relaxed"
                    style={{ maxHeight: '200px', overflow: 'hidden' }}
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
        )}
        </div>

        {/* Current Input - Fixed at bottom */}
        <form onSubmit={handleSubmit} className="mt-auto">
          <div className="flex items-center">
            <span className="text-success">{prompt}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="command-input ml-1"
              disabled={isTyping}
              autoComplete="off"
              spellCheck={false}
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="cursor"
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