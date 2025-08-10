'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Skip Link Component for keyboard navigation
export const SkipLink: React.FC<{
  href: string
  children: React.ReactNode
}> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-cyan-500 text-white px-4 py-2 rounded-lg z-[9999] transition-all duration-200"
      style={{ clipPath: 'inset(50%)', position: 'absolute', width: '1px', height: '1px' }}
      onFocus={(e) => {
        e.currentTarget.style.clipPath = 'none'
        e.currentTarget.style.width = 'auto'
        e.currentTarget.style.height = 'auto'
      }}
      onBlur={(e) => {
        e.currentTarget.style.clipPath = 'inset(50%)'
        e.currentTarget.style.width = '1px'
        e.currentTarget.style.height = '1px'
      }}
    >
      {children}
    </a>
  )
}

// Focus Trap Component for modals and dropdowns
export const FocusTrap: React.FC<{
  children: React.ReactNode
  isActive: boolean
}> = ({ children, isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([])

  useEffect(() => {
    if (!containerRef.current || !isActive) return

    const focusableSelectors = [
      'button',
      '[href]',
      'input',
      'select', 
      'textarea',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',')

    const elements = Array.from(
      containerRef.current.querySelectorAll(focusableSelectors)
    ) as HTMLElement[]

    setFocusableElements(elements.filter(el => 
      !el.hasAttribute('disabled') && 
      !el.getAttribute('aria-hidden')
    ))

    // Focus first element
    if (elements.length > 0) {
      elements[0].focus()
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || elements.length === 0) return

      const firstElement = elements[0]
      const lastElement = elements[elements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isActive])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

// Announcement Component for screen readers
export const LiveAnnouncement: React.FC<{
  message: string
  priority?: 'polite' | 'assertive'
  clearAfter?: number
}> = ({ message, priority = 'polite', clearAfter = 5000 }) => {
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    setAnnouncement(message)
    
    if (clearAfter) {
      const timer = setTimeout(() => {
        setAnnouncement('')
      }, clearAfter)
      
      return () => clearTimeout(timer)
    }
  }, [message, clearAfter])

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  )
}

// High Contrast Toggle
export const HighContrastToggle: React.FC = () => {
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('high-contrast')
    if (saved) {
      setHighContrast(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
    localStorage.setItem('high-contrast', JSON.stringify(highContrast))
  }, [highContrast])

  return (
    <button
      onClick={() => setHighContrast(!highContrast)}
      className="p-2 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
      aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
      title={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" 
        />
      </svg>
    </button>
  )
}

// Motion Preference Toggle
export const ReducedMotionToggle: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }, [reducedMotion])

  return (
    <button
      onClick={() => setReducedMotion(!reducedMotion)}
      className="p-2 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
      aria-label={`${reducedMotion ? 'Enable' : 'Disable'} animations`}
      title={`${reducedMotion ? 'Enable' : 'Disable'} animations`}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M13 10V3L4 14h7v7l9-11h-7z" 
        />
      </svg>
    </button>
  )
}

// Font Size Toggle
export const FontSizeToggle: React.FC = () => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')

  useEffect(() => {
    const saved = localStorage.getItem('font-size') as 'small' | 'medium' | 'large'
    if (saved) {
      setFontSize(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.remove('font-small', 'font-medium', 'font-large')
    document.documentElement.classList.add(`font-${fontSize}`)
    localStorage.setItem('font-size', fontSize)
  }, [fontSize])

  const cycleFontSize = () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large']
    const currentIndex = sizes.indexOf(fontSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    setFontSize(sizes[nextIndex])
  }

  return (
    <button
      onClick={cycleFontSize}
      className="p-2 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
      aria-label={`Current font size: ${fontSize}. Click to change.`}
      title={`Current font size: ${fontSize}. Click to change.`}
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M6 20h12M6 4h12M6 8h12M6 12h12M6 16h12" 
        />
      </svg>
      <span className="sr-only">Font size: {fontSize}</span>
    </button>
  )
}

// Accessible Form Field Component
export const AccessibleField: React.FC<{
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  description?: string
  placeholder?: string
}> = ({ 
  id, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false, 
  description,
  placeholder
}) => {
  const errorId = error ? `${id}-error` : undefined
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-300"
      >
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-500">
          {description}
        </p>
      )}
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        className={`w-full px-3 py-2 bg-gray-900 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
          error 
            ? 'border-red-500 focus:ring-red-400' 
            : 'border-gray-700 focus:ring-cyan-400 focus:border-cyan-400'
        }`}
      />
      
      {error && (
        <p id={errorId} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Accessible Progress Indicator
export const AccessibleProgress: React.FC<{
  value: number
  max?: number
  label: string
  showPercentage?: boolean
}> = ({ value, max = 100, label, showPercentage = true }) => {
  const percentage = Math.round((value / max) * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        {showPercentage && (
          <span className="text-sm text-gray-400">{percentage}%</span>
        )}
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${percentage}%`}
        className="w-full bg-gray-700 rounded-full h-2"
      >
        <motion.div
          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// Keyboard Navigation Helper
export const useKeyboardNavigation = (
  items: any[],
  onSelect: (item: any, index: number) => void
) => {
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev + 1) % items.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev - 1 + items.length) % items.length)
        break
      case 'Enter':
      case ' ':
        if (focusedIndex >= 0) {
          e.preventDefault()
          onSelect(items[focusedIndex], focusedIndex)
        }
        break
      case 'Escape':
        e.preventDefault()
        setFocusedIndex(-1)
        break
    }
  }, [items, focusedIndex, onSelect])

  return { focusedIndex, handleKeyDown, setFocusedIndex }
}