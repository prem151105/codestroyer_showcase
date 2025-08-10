'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InteractiveButton } from './EnhancedVisualEffects'

interface LayoutSwitcherProps {
  onLayoutChange: (layout: 'terminal' | 'modern') => void
  currentLayout: 'terminal' | 'modern'
}

export const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({ 
  onLayoutChange, 
  currentLayout 
}) => {
  const [showSwitcher, setShowSwitcher] = useState(false)

  useEffect(() => {
    // Show switcher after initial load
    const timer = setTimeout(() => setShowSwitcher(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {showSwitcher && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 z-50 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-lg p-4 shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300 mb-2">Choose Interface:</p>
            <div className="flex gap-2">
              <InteractiveButton
                variant={currentLayout === 'terminal' ? 'primary' : 'ghost'}
                onClick={() => onLayoutChange('terminal')}
                className="text-xs px-3 py-2"
              >
                🖥️ Terminal
              </InteractiveButton>
              <InteractiveButton
                variant={currentLayout === 'modern' ? 'primary' : 'ghost'}
                onClick={() => onLayoutChange('modern')}
                className="text-xs px-3 py-2"
              >
                ✨ Modern
              </InteractiveButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LayoutSwitcher