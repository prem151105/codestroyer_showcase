'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminalLogic } from '@/hooks/useTerminalLogic'
import { useTheme } from '@/hooks/useTheme'
import CommandSuggestions from './CommandSuggestions'

export default function Terminal() {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme, themeName, changeTheme, getThemeClasses } = useTheme()
  
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
    
    // Handle theme changes
    if (input.trim().startsWith('theme ')) {
      const newTheme = input.trim().split(' ')[1]
      changeTheme(newTheme)
    }
    
    await executeCommand(input.trim())
    setInput('')
    setHistoryIndex(-1)
    setIsTyping(false)
  }, [input, executeCommand, changeTheme])

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
    <div className={`min-h-screen font-mono text-sm ${getThemeClasses()} transition-all duration-300`}>
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
          <div className="text-center border border-current rounded-lg p-6 mb-6 bg-opacity-5 bg-white backdrop-blur-sm">
            <pre className="ascii-art glow-text text-xs md:text-sm mb-4 select-none">
{`┌──────────────────────────────────────────────────────────┐
│  ▄▀█ █▄░█ █░█ █▀█ ▄▀█ █▀▀   ░░█ ▄▀█ █▄█ ▄▀█ █▀ █░█░█ ▄▀█ █░░  │
│  █▀█ █░▀█ █▄█ █▀▄ █▀█ █▄█   █▄█ █▀█ ░█░ █▀█ ▄█ ▀▄▀▄▀ █▀█ █▄▄  │
└──────────────────────────────────────────────────────────┘`}
            </pre>
            <div className="text-lg font-bold mb-2">🚀 AI/ML Developer | 💻 Competitive Programmer | 🎓 IIIT Bhagalpur</div>
            <div className="text-sm opacity-80 mb-3">Welcome to my interactive terminal portfolio!</div>
            
            {/* Quick Stats */}
            <div className="flex justify-center items-center space-x-6 text-xs opacity-70 mb-4">
              <span>📊 250+ LeetCode</span>
              <span>⭐ 1500+ Rating</span>
              <span>🏆 Specialist CF</span>
              <span>📈 7.71 CGPA</span>
            </div>

            <div className="text-xs opacity-60 mb-2">
              <span className="text-terminal-cyan font-semibold">Quick start:</span> help | about | projects | experience | skills | contact
            </div>
            <div className="text-xs opacity-50">
              Theme: <span className="text-terminal-cyan">{themeName}</span> | 
              Press <span className="text-terminal-cyan">Tab</span> for autocomplete
            </div>
          </div>

          {/* Enhanced Mobile Command Buttons */}
          <div className="md:hidden mobile-commands">
            <div className="grid grid-cols-3 gap-2 mb-3">
              {['help', 'about', 'projects', 'experience', 'skills', 'contact'].map((cmd) => (
                <button
                  key={cmd}
                  className="command-button text-center"
                  onClick={() => {
                    setInput(cmd)
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>
            
            {/* Additional Commands Row */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {['education', 'resume', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  className="command-button text-center"
                  onClick={() => {
                    setInput(cmd)
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
                  }}
                >
                  {cmd}
                </button>
              ))}
              
              {/* Theme Selector Dropdown */}
              <select
                className="command-button text-center bg-transparent"
                value={currentTheme}
                onChange={(e) => changeTheme(e.target.value)}
              >
                <option value="classic" className="bg-black">Classic</option>
                <option value="modern" className="bg-black">Modern</option>
                <option value="matrix" className="bg-black">Matrix</option>
              </select>
            </div>
            
            <div className="text-center text-xs opacity-60">
              💡 Tap commands above, use dropdown for themes, or type manually below
            </div>
          </div>
        </motion.div>

        {/* Professional System Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-6 text-xs opacity-75 border-l-2 border-current pl-4"
        >
          <div className="text-green-400 mb-1">✓ System initialized successfully</div>
          <div>📅 Session: {new Date().toLocaleString()} | 🖥️ Terminal: v{systemInfo.version}</div>
          <div>📍 Location: Gwalior, MP | 🟢 Status: <span className="text-green-400 font-semibold">Available for opportunities</span></div>
          <div className="text-yellow-400">💼 Seeking: Full-time SDE roles & AI/ML positions</div>
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
                    <span className="text-terminal-green">{prompt}</span>
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
            <span className="text-terminal-green">{prompt}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-current ml-1"
              disabled={isTyping}
              autoComplete="off"
              spellCheck={false}
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="cursor-blink text-current"
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

      {/* Enhanced Professional Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 border-t border-current p-2 text-xs backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
          <div className="flex flex-wrap space-x-4">
            <span className="flex items-center">
              🎨 Theme: <span className="text-terminal-cyan ml-1">{themeName}</span>
            </span>
            <span className="flex items-center">
              📝 Commands: <span className="text-terminal-cyan ml-1">{commandHistory.length}</span>
            </span>
            <span className="flex items-center hidden sm:flex">
              🚀 <span className="text-green-400 ml-1">Ready</span>
            </span>
          </div>
          <div className="flex flex-wrap space-x-4">
            <span className="hidden md:flex">💡 Type 'help' for available commands</span>
            <span className="flex items-center">
              ⏰ {new Date().toLocaleTimeString()}
            </span>
            <span className="text-green-400 text-xs">●</span>
          </div>
        </div>
      </div>
    </div>
  )
}