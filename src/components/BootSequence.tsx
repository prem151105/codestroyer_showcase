'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BootSequenceProps {
  onComplete: () => void
}

const bootMessages = [
  'Initializing Anurag Terminal OS v2.0.1...',
  'Loading AI/ML modules...',
  'Mounting /dev/skills...',
  'Starting portfolio services...',
  'Loading project database...',
  'Initializing GitHub integration...',
  'Setting up LeetCode connection...',
  'Configuring Codeforces API...',
  'Loading achievement data...',
  'Starting terminal interface...',
  'System ready.',
  '',
  'Welcome to Anurag Jayaswal\'s Interactive Portfolio'
]

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([])

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, bootMessages[currentLine]])
        setCurrentLine(prev => prev + 1)
      }, 200)

      return () => clearTimeout(timer)
    } else {
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 1000)

      return () => clearTimeout(completeTimer)
    }
  }, [currentLine, onComplete])

  return (
    <div className="min-h-screen bg-black text-terminal-green font-mono p-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayedMessages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-1"
          >
            {message && (
              <>
                <span className="text-terminal-cyan">[</span>
                <span className="text-terminal-green">OK</span>
                <span className="text-terminal-cyan">]</span>
                <span className="ml-2">{message}</span>
              </>
            )}
            {!message && <br />}
          </motion.div>
        ))}
      </motion.div>
      
      {currentLine < bootMessages.length && (
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-terminal-green text-xl mt-4"
        >
          _
        </motion.div>
      )}
    </div>
  )
}