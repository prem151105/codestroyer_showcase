'use client'

import { useState, useCallback } from 'react'
import { portfolioData } from '@/data/portfolioData'
import { commands } from '@/data/commands'
import { formatOutput } from '@/utils/formatters'

export interface HistoryEntry {
  type: 'command' | 'output' | 'error'
  content: string
  timestamp: Date
}

export function useTerminalLogic() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const systemInfo = {
    os: 'Portfolio Terminal v1.0',
    version: '1.0.0'
  }

  const addToHistory = useCallback((entry: Omit<HistoryEntry, 'timestamp'>) => {
    setHistory(prev => [...prev, { ...entry, timestamp: new Date() }])
  }, [])

  const addCommandToHistory = useCallback((command: string) => {
    setCommandHistory(prev => {
      const newHistory = [...prev, command]
      return newHistory.slice(-50) // Keep last 50 commands
    })
  }, [])

  const executeCommand = useCallback(async (input: string) => {
    const trimmedInput = input.trim()
    const command = trimmedInput.toLowerCase()
    const args = command.split(' ')
    const baseCommand = args[0]

    // Add command to history
    addToHistory({ type: 'command', content: trimmedInput })
    addCommandToHistory(trimmedInput)

    // Simulate typing delay for realism
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))

    try {
      // Handle aliases
      const commandMap: { [key: string]: string } = {
        'h': 'help',
        'info': 'about',
        'exp': 'experience',
        'work': 'experience',
        'proj': 'projects',
        'portfolio': 'projects',
        'tech': 'skills',
        'edu': 'education',
        'school': 'education',
        'reach': 'contact',
        'connect': 'contact',
        'cv': 'resume',
        'cls': 'clear'
      }

      const actualCommand = commandMap[baseCommand] || baseCommand

      switch (actualCommand) {
        case 'help':
          addToHistory({
            type: 'output',
            content: formatOutput.help()
          })
          break

        case 'about':
          addToHistory({
            type: 'output',
            content: formatOutput.about()
          })
          break

        case 'education':
          addToHistory({
            type: 'output',
            content: formatOutput.education()
          })
          break

        case 'experience':
          addToHistory({
            type: 'output',
            content: formatOutput.experience()
          })
          break

        case 'projects':
          addToHistory({
            type: 'output',
            content: formatOutput.projects()
          })
          break

        case 'skills':
          addToHistory({
            type: 'output',
            content: formatOutput.skills()
          })
          break

        case 'contact':
          addToHistory({
            type: 'output',
            content: formatOutput.contact()
          })
          break

        case 'resume':
          addToHistory({
            type: 'output',
            content: formatOutput.resume()
          })
          break

        case 'clear':
          setHistory([])
          break

        default:
          // Check if it's a partial command for suggestions
          const availableCommands = commands.map(cmd => cmd.name)
          const matchingCommands = availableCommands.filter(cmd => 
            cmd.toLowerCase().startsWith(baseCommand)
          )
          
          if (matchingCommands.length > 0) {
            setSuggestions(matchingCommands)
            setShowSuggestions(true)
            setTimeout(() => setShowSuggestions(false), 3000)
            
            addToHistory({
              type: 'error',
              content: `❌ Command not found: "${baseCommand}"\n💡 Did you mean: ${matchingCommands.slice(0, 3).join(', ')}?\n\n🔧 Available commands: help, about, experience, projects, skills, education, contact, resume, clear`
            })
          } else {
            addToHistory({
              type: 'error',
              content: `❌ Command not found: "${baseCommand}"\n\n💡 Type "help" to see all available commands\n🎯 Quick start: about | projects | experience | contact`
            })
          }
      }
    } catch (error) {
      addToHistory({
        type: 'error',
        content: `Error executing command: ${error}`
      })
    }
  }, [addToHistory, addCommandToHistory])

  return {
    history,
    commandHistory,
    systemInfo,
    executeCommand,
    showSuggestions,
    suggestions
  }
}