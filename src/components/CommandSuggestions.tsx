'use client'

import { motion } from 'framer-motion'

interface CommandSuggestionsProps {
  suggestions: string[]
  onSelect: (command: string) => void
}

export default function CommandSuggestions({ suggestions, onSelect }: CommandSuggestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-2 p-3 border border-terminal-green bg-black bg-opacity-90 rounded"
    >
      <div className="text-terminal-cyan mb-2 text-xs">💡 Did you mean:</div>
      <div className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(suggestion)}
            className="block text-left text-terminal-green hover:text-terminal-amber hover:bg-terminal-green hover:bg-opacity-10 px-2 py-1 rounded transition-colors duration-200 text-sm"
          >
            <span className="text-terminal-cyan">$</span> {suggestion}
          </motion.button>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Click on a suggestion or press Tab to autocomplete
      </div>
    </motion.div>
  )
}