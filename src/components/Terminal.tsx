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

  const prompt = `anurag@portfolio:~$ `

  return (
    <div className="min-h-screen font-mono text-sm terminal-content">
      <div 
        ref={terminalRef}
        className="p-6 pb-20 overflow-y-auto"
        style={{ height: '100vh' }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Professional Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <div className="welcome-banner">
            <pre className="ascii-art text-xs md:text-sm mb-4 select-none">
{`┌──────────────────────────────────────────────────────────┐
│  ▄▀█ █▄░█ █░█ █▀█ ▄▀█ █▀▀   ░░█ ▄▀█ █▄█ ▄▀█ █▀ █░█░█ ▄▀█ █░░  │
│  █▀█ █░▀█ █▄█ █▀▄ █▀█ █▄█   █▄█ █▀█ ░█░ █▀█ ▄█ ▀▄▀▄▀ █▀█ █▄▄  │
└──────────────────────────────────────────────────────────┘`}
            </pre>
            <div className="text-lg font-bold mb-2">🚀 AI/ML Developer | 💻 Competitive Programmer | 🎓 IIIT Bhagalpur</div>
            <div className="text-sm text-secondary mb-3">Welcome to my interactive terminal portfolio!</div>
            
            {/* Quick Stats */}
            <div className="flex justify-center items-center space-x-6 text-xs text-secondary mb-4">
              <span>📊 250+ LeetCode</span>
              <span>⭐ 1500+ Rating</span>
              <span>🏆 Specialist CF</span>
              <span>📈 7.71 CGPA</span>
            </div>

            <div className="text-xs text-secondary mb-2">
              <span className="text-cyan font-semibold">Quick start:</span> help | about | projects | experience | skills | contact
            </div>
            <div className="text-xs text-secondary">
              Press <span className="text-cyan">Tab</span> for autocomplete
            </div>
          </div>

          {/* Mobile Command Buttons */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 gap-2 mb-3">
              {['help', 'about', 'projects', 'experience', 'skills', 'contact'].map((cmd) => (
                <button
                  key={cmd}
                  className="skill-tag hover:text-success cursor-pointer text-center py-2"
                  onClick={() => {
                    setInput(cmd)
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              {['education', 'resume', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  className="skill-tag hover:text-success cursor-pointer text-center py-2"
                  onClick={() => {
                    setInput(cmd)
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>
            
            <div className="text-center text-xs text-secondary">
              💡 Tap commands above or type manually below
            </div>
          </div>
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-6 text-xs text-secondary border-l-2 border-accent pl-4"
        >
          <div className="text-success mb-1">✓ System initialized successfully</div>
          <div>📅 Session: {new Date().toLocaleString()} | 🖥️ Terminal: v{systemInfo.version}</div>
          <div>📍 Location: Gwalior, MP | 🟢 Status: <span className="text-success font-semibold">Available for opportunities</span></div>
          <div className="text-warning">💼 Seeking: Full-time SDE roles & AI/ML positions</div>
        </motion.div>

        {/* Command History */}
        <div className="space-y-2">
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
                    <span className="text-success">{prompt}</span>
                    <span>{entry.content}</span>
                  </div>
                )}
                {entry.type === 'output' && (
                  <div 
                    className="ml-4 whitespace-pre-wrap"
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
        <form onSubmit={handleSubmit} className="mt-4">
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

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 border-t border-secondary p-2 text-xs backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
          <div className="flex flex-wrap space-x-4 text-secondary">
            <span className="flex items-center">
              📝 Commands: <span className="text-cyan ml-1">{commandHistory.length}</span>
            </span>
            <span className="flex items-center hidden sm:flex">
              🚀 <span className="text-success ml-1">Ready</span>
            </span>
          </div>
          <div className="flex flex-wrap space-x-4 text-secondary">
            <span className="hidden md:flex">💡 Type 'help' for available commands</span>
            <span className="flex items-center">
              ⏰ {new Date().toLocaleTimeString()}
            </span>
            <span className="text-success text-xs">●</span>
          </div>
        </div>
      </div>
    </div>
  )
}