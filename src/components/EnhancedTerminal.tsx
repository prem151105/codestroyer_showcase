'use client'

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminalLogic } from '@/hooks/useTerminalLogic'

// Import enhanced components
import { 
  ParticleEffects, 
  GradientAnimation, 
  ScrollReveal, 
  InteractiveButton, 
  SkillTag, 
  ProjectCard 
} from './EnhancedVisualEffects'

import { 
  OptimizedContainer, 
  StickyHeader, 
  FloatingActionButton, 
  Modal 
} from './OptimizedLayout'

import { 
  SkipLink, 
  FocusTrap, 
  LiveAnnouncement, 
  HighContrastToggle, 
  ReducedMotionToggle, 
  FontSizeToggle 
} from './AccessibilityEnhanced'

import { 
  ErrorBoundary, 
  ResourcePreloader,
  usePerformanceMonitor 
} from './PerformanceOptimized'

import CommandSuggestions from './CommandSuggestions'
import AnimatedCursor from './AnimatedCursor'
import CommandOutput from './CommandOutput'

// Lazy load heavy components
const GameModal = React.lazy(() => import('./GameModal'))

interface EnhancedTerminalProps {
  className?: string
}

export default function EnhancedTerminal({ className = '' }: EnhancedTerminalProps) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { metrics, measureFunction } = usePerformanceMonitor()

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

  // Performance monitoring
  useEffect(() => {
    measureFunction('terminal-render', () => {
      console.log('Terminal rendered successfully')
    })
  }, [measureFunction])

  // Auto-focus input with accessibility consideration
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      setAnnouncement('Terminal loaded. Type help to get started.')
    }
  }, [])

  // Scroll management with smooth behavior
  useEffect(() => {
    if (terminalRef.current) {
      const scrollElement = terminalRef.current
      const scrollToBottom = () => {
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: 'smooth'
        })
      }
      
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(scrollToBottom)
    }
  }, [history])

  // Enhanced command execution with performance tracking
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsTyping(true)
    setAnnouncement(`Executing command: ${input}`)
    
    measureFunction('command-execution', async () => {
      await executeCommand(input.trim())
    })
    
    setInput('')
    updateSuggestions('')
    setHistoryIndex(-1)
    setIsTyping(false)
    setAnnouncement('Command executed successfully')
  }, [input, executeCommand, updateSuggestions, measureFunction])

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1
          const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]
          setInput(historyCommand)
          setHistoryIndex(newIndex)
          setAnnouncement(`History command: ${historyCommand}`)
        }
        break
        
      case 'ArrowDown':
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          const historyCommand = commandHistory[commandHistory.length - 1 - newIndex]
          setInput(historyCommand)
          setHistoryIndex(newIndex)
          setAnnouncement(`History command: ${historyCommand}`)
        } else if (historyIndex === 0) {
          setInput('')
          setHistoryIndex(-1)
          setAnnouncement('Cleared input')
        }
        break
        
      case 'Tab':
        e.preventDefault()
        const availableCommands = [
          'help', 'about', 'experience', 'projects', 'skills', 
          'education', 'contact', 'resume', 'clear', 'theme'
        ]
        const matches = availableCommands.filter(cmd => 
          cmd.startsWith(input.toLowerCase())
        )
        if (matches.length === 1) {
          setInput(matches[0])
          setAnnouncement(`Autocompleted: ${matches[0]}`)
        } else if (matches.length > 1) {
          setAnnouncement(`${matches.length} matching commands found`)
        }
        break
        
      case 'Escape':
        e.preventDefault()
        if (showSuggestions) {
          updateSuggestions('')
        }
        setAnnouncement('Suggestions cleared')
        break
        
      default:
        // Keyboard shortcuts
        if (e.ctrlKey) {
          switch (e.key) {
            case 'l':
              e.preventDefault()
              executeCommand('clear')
              setAnnouncement('Screen cleared')
              break
            case 'c':
              e.preventDefault()
              setInput('')
              setHistoryIndex(-1)
              setAnnouncement('Input cleared')
              break
            case 'k':
              e.preventDefault()
              setShowContactModal(true)
              setAnnouncement('Contact modal opened')
              break
          }
        }
    }
  }, [executeCommand, commandHistory, historyIndex, input, showSuggestions, updateSuggestions])

  const prompt = `visitor@anurag:~$ `

  return (
    <ErrorBoundary>
      <OptimizedContainer className={`min-h-screen relative ${className}`}>
        {/* Resource Preloader */}
        <ResourcePreloader 
          fonts={[
            'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap'
          ]}
        />

        {/* Skip Links for Accessibility */}
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <SkipLink href="#command-input">Skip to command input</SkipLink>

        {/* Accessibility Panel Toggle */}
        <FloatingActionButton
          onClick={() => setShowAccessibilityPanel(true)}
          position="top-right"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />

        {/* Contact Modal Trigger */}
        <FloatingActionButton
          onClick={() => setShowContactModal(true)}
          position="bottom-right"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />

        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black dynamic-bg" />
        <ParticleEffects />
        <GradientAnimation />

        {/* Sticky Header with system info */}
        <StickyHeader className="px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-cyan-400">System Status: Online</span>
              {metrics.loadTime > 0 && (
                <span className="text-gray-400">Load: {metrics.loadTime}ms</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <HighContrastToggle />
              <ReducedMotionToggle />
              <FontSizeToggle />
            </div>
          </div>
        </StickyHeader>

        {/* Main Terminal Content */}
        <div 
          ref={terminalRef}
          id="main-content"
          className="p-4 md:p-8 min-h-screen relative z-20 terminal-content gpu-accelerated"
          onClick={() => inputRef.current?.focus()}
          role="main"
          aria-label="Terminal interface"
        >
          {/* Enhanced Welcome Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <motion.div
              className="welcome-banner mb-6 md:mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text text-center tracking-wide"
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
                  <kbd className="interactive-element bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg font-mono font-semibold shadow-lg">
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
                    <kbd className="bg-gray-700 px-1.5 py-0.5 rounded">Ctrl+K</kbd>
                    Contact
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Command History */}
          <div className="space-y-1 md:space-y-2 mb-6 md:mb-8" role="log" aria-live="polite">
            <AnimatePresence mode="popLayout">
              {history.map((entry, index) => (
                <motion.div
                  key={`${index}-${entry.content}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="terminal-line"
                >
                  {entry.type === 'command' && (
                    <div className="flex" role="group">
                      <span className="text-cyan-400 command-prompt" aria-label="Command prompt">{prompt}</span>
                      <span className="text-white">{entry.content}</span>
                    </div>
                  )}
                  {(entry.type === 'output' || entry.type === 'error' || entry.type === 'component') && (
                    <ScrollReveal direction="up" delay={0.1}>
                      <CommandOutput 
                        type={entry.type}
                        content={entry.content}
                        component={entry.component}
                      />
                    </ScrollReveal>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Enhanced Input Section */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="sticky bottom-0 p-4"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="relative group">
              <motion.div
                className="relative backdrop-blur-xl bg-gradient-to-r from-black/60 via-purple-900/30 to-black/60 rounded-lg border border-gray-700 hover:border-cyan-400/50 transition-all duration-500"
              >
                <div className="flex items-center px-6 py-4">
                  <label htmlFor="command-input" className="sr-only">
                    Command input
                  </label>
                  <span 
                    className="command-prompt text-base md:text-lg font-bold mr-4 text-cyan-400"
                    aria-hidden="true"
                  >
                    {prompt}
                  </span>
                  
                  <input
                    ref={inputRef}
                    id="command-input"
                    type="text"
                    value={input}
                    onChange={(e) => {
                      const newValue = e.target.value
                      setInput(newValue)
                      updateSuggestions(newValue)
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 text-base md:text-lg font-medium bg-transparent border-none outline-none text-white/95 caret-cyan-400 focus:outline-none"
                    disabled={isTyping}
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Enter command..."
                    aria-describedby={showSuggestions ? 'command-suggestions' : undefined}
                    aria-expanded={showSuggestions}
                    role="combobox"
                    aria-autocomplete="list"
                  />
                  
                  <AnimatedCursor />
                </div>
              </div>
            </div>

            {/* Command Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                id="command-suggestions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-2"
                role="listbox"
                aria-label="Command suggestions"
              >
                <CommandSuggestions />
              </motion.div>
            )}
          </motion.form>
        </div>

        {/* Accessibility Panel Modal */}
        <Modal
          isOpen={showAccessibilityPanel}
          onClose={() => setShowAccessibilityPanel(false)}
          title="Accessibility Options"
        >
          <FocusTrap isActive={showAccessibilityPanel}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Display Options</h3>
                <div className="flex flex-wrap gap-4">
                  <HighContrastToggle />
                  <ReducedMotionToggle />
                  <FontSizeToggle />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
                <div className="space-y-2 text-sm">
                  <div><kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+L</kbd> Clear screen</div>
                  <div><kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+C</kbd> Clear input</div>
                  <div><kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl+K</kbd> Open contact</div>
                  <div><kbd className="bg-gray-700 px-2 py-1 rounded">Tab</kbd> Autocomplete</div>
                  <div><kbd className="bg-gray-700 px-2 py-1 rounded">Esc</kbd> Clear suggestions</div>
                </div>
              </div>
            </div>
          </FocusTrap>
        </Modal>

        {/* Contact Modal */}
        <Modal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          title="Get In Touch"
        >
          <FocusTrap isActive={showContactModal}>
            <div className="space-y-6">
              <p className="text-gray-300">
                Ready to discuss opportunities or collaborate on exciting projects? 
                Let's connect!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InteractiveButton
                  variant="primary"
                  onClick={() => window.open('mailto:anurag1.230101034@iiitbh.ac.in', '_blank')}
                >
                  📧 Send Email
                </InteractiveButton>
                
                <InteractiveButton
                  variant="secondary"
                  onClick={() => window.open('https://linkedin.com/in/anurag-jayaswal', '_blank')}
                >
                  💼 LinkedIn
                </InteractiveButton>
                
                <InteractiveButton
                  variant="ghost"
                  onClick={() => window.open('https://github.com/anuragj7879', '_blank')}
                >
                  🔗 GitHub
                </InteractiveButton>
                
                <InteractiveButton
                  variant="ghost"
                  onClick={() => window.open('tel:+917879219119', '_blank')}
                >
                  📞 Call Me
                </InteractiveButton>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Available for SDE roles • Open to exciting opportunities
                </p>
              </div>
            </div>
          </FocusTrap>
        </Modal>

        {/* Live Announcements for Screen Readers */}
        <LiveAnnouncement message={announcement} />

        {/* Lazy loaded components */}
        <Suspense fallback={<div className="sr-only">Loading...</div>}>
          {/* GameModal would be loaded here if needed */}
        </Suspense>
      </OptimizedContainer>
    </ErrorBoundary>
  )
}