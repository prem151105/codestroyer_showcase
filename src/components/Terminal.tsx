'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminalLogic } from '@/hooks/useTerminalLogic'
import { useTheme } from '@/hooks/useTheme'
import CommandSuggestions from './CommandSuggestions'
import GameModal from './GameModal'

interface TerminalProps {
  onMatrixToggle: () => void
}

export default function Terminal({ onMatrixToggle }: TerminalProps) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { theme, themeName, changeTheme, getThemeClasses } = useTheme()
  
  const {
    history,
    commandHistory,
    currentPath,
    currentUser,
    systemInfo,
    executeCommand,
    showSuggestions,
    suggestions,
    gameState,
    closeGame
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
    
    // Special commands
    if (input.trim() === 'matrix') {
      onMatrixToggle()
    } else if (input.trim().startsWith('theme ')) {
      const newTheme = input.trim().split(' ')[1]
      changeTheme(newTheme)
    }
    
    await executeCommand(input.trim())
    setInput('')
    setIsTyping(false)
  }, [input, executeCommand, onMatrixToggle, changeTheme])

  // Handle key events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      // Implement command history navigation
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      // Implement command history navigation
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Implement tab completion
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      executeCommand('clear')
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      setInput('')
    }
  }, [executeCommand])

  const prompt = `${currentUser}@anurag-portfolio:${currentPath}$ `

  return (
    <div className={`min-h-screen font-mono text-sm ${getThemeClasses()} transition-all duration-300`}>
      <div 
        ref={terminalRef}
        className="p-6 pb-20 overflow-y-auto"
        style={{ height: '100vh' }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* ASCII Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <pre className="ascii-art text-center glow-text text-xs md:text-sm">
{` █████╗ ███╗   ██╗██╗   ██╗██████╗  █████╗  ██████╗ 
██╔══██╗████╗  ██║██║   ██║██╔══██╗██╔══██╗██╔════╝ 
███████║██╔██╗ ██║██║   ██║██████╔╝███████║██║  ███╗
██╔══██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║██║   ██║
██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║  ██║╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝`}
          </pre>
          <div className="text-center mt-4">
            <div className="text-lg">Welcome to Anurag Jayaswal's Interactive Portfolio</div>
            <div className="text-sm opacity-80">AI/ML Developer | Software Engineer | Competitive Programmer</div>
            <div className="text-xs opacity-60 mt-2">Type 'help' to see available commands</div>
            <div className="text-xs opacity-60">Current theme: <span className="text-terminal-cyan">{themeName}</span></div>
          </div>
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 text-xs opacity-75"
        >
          <div>Last login: {new Date().toLocaleString()}</div>
          <div>System: {systemInfo.os} | Terminal: v{systemInfo.version}</div>
          <div>Location: Gwalior, Madhya Pradesh | Status: Available for opportunities</div>
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

      {/* Game Modal */}
      <AnimatePresence>
        {gameState.active && (
          <GameModal
            gameType={gameState.type!}
            onClose={closeGame}
            theme={theme}
          />
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 border-t border-current p-2 text-xs">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <span>Theme: {themeName}</span>
            <span>Path: {currentPath}</span>
            <span>User: {currentUser}</span>
          </div>
          <div className="flex space-x-4">
            <span>Commands: {commandHistory.length}</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}