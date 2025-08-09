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

export interface GameState {
  active: boolean
  type: 'snake' | 'typing' | null
}

export function useTerminalLogic() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [currentPath, setCurrentPath] = useState('/home/anurag')
  const [currentUser, setCurrentUser] = useState('visitor')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [gameState, setGameState] = useState<GameState>({ active: false, type: null })

  const systemInfo = {
    os: 'Anurag Terminal OS v2.0.1',
    version: '2.0.1',
    uptime: '42 days, 13:37:42'
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
    const command = input.trim().toLowerCase()
    const args = command.split(' ')
    const baseCommand = args[0]

    // Add command to history
    addToHistory({ type: 'command', content: input })
    addCommandToHistory(input)

    // Simulate typing delay for realism
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))

    try {
      switch (baseCommand) {
        case 'help':
          addToHistory({
            type: 'output',
            content: formatOutput.help()
          })
          break

        case 'about':
          addToHistory({
            type: 'output',
            content: formatOutput.about(portfolioData.personal)
          })
          break

        case 'education':
          addToHistory({
            type: 'output',
            content: formatOutput.education(portfolioData.education)
          })
          break

        case 'experience':
          addToHistory({
            type: 'output',
            content: formatOutput.experience(portfolioData.experience)
          })
          break

        case 'projects':
          addToHistory({
            type: 'output',
            content: formatOutput.projects(portfolioData.projects)
          })
          break

        case 'skills':
          addToHistory({
            type: 'output',
            content: formatOutput.skills(portfolioData.skills)
          })
          break

        case 'achievements':
          addToHistory({
            type: 'output',
            content: formatOutput.achievements(portfolioData.achievements)
          })
          break

        case 'contact':
          addToHistory({
            type: 'output',
            content: formatOutput.contact(portfolioData.personal)
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

        case 'whoami':
          addToHistory({
            type: 'output',
            content: `${currentUser}\nYou are currently exploring Anurag Jayaswal's interactive portfolio.`
          })
          break

        case 'ls':
          addToHistory({
            type: 'output',
            content: formatOutput.ls(currentPath)
          })
          break

        case 'cd':
          if (args.length > 1) {
            const newPath = args[1]
            setCurrentPath(formatOutput.cd(currentPath, newPath))
            addToHistory({
              type: 'output',
              content: `Changed directory to: ${currentPath}`
            })
          } else {
            setCurrentPath('/home/anurag')
            addToHistory({
              type: 'output',
              content: 'Changed directory to: /home/anurag'
            })
          }
          break

        case 'pwd':
          addToHistory({
            type: 'output',
            content: currentPath
          })
          break

        case 'history':
          addToHistory({
            type: 'output',
            content: formatOutput.history(commandHistory)
          })
          break

        case 'tree':
          addToHistory({
            type: 'output',
            content: formatOutput.tree()
          })
          break

        // AI/ML Commands
        case 'ai-projects':
          addToHistory({
            type: 'output',
            content: formatOutput.aiProjects(portfolioData.projects)
          })
          break

        case 'ml-skills':
          addToHistory({
            type: 'output',
            content: formatOutput.mlSkills(portfolioData.skills)
          })
          break

        case 'neural-net':
          addToHistory({
            type: 'output',
            content: formatOutput.neuralNet()
          })
          break

        case 'transformers':
          addToHistory({
            type: 'output',
            content: formatOutput.transformers()
          })
          break

        // Coding Platform Commands
        case 'leetcode':
          addToHistory({
            type: 'output',
            content: formatOutput.leetcode(portfolioData.achievements.leetcode)
          })
          break

        case 'codeforces':
          addToHistory({
            type: 'output',
            content: formatOutput.codeforces(portfolioData.achievements.codeforces)
          })
          break

        case 'coding-stats':
          addToHistory({
            type: 'output',
            content: formatOutput.codingStats(portfolioData.achievements)
          })
          break

        case 'contest-history':
          addToHistory({
            type: 'output',
            content: formatOutput.contestHistory(portfolioData.achievements)
          })
          break

        // Games
        case 'snake':
          setGameState({ active: true, type: 'snake' })
          addToHistory({
            type: 'output',
            content: 'Starting Snake game...'
          })
          break

        case 'typing':
          setGameState({ active: true, type: 'typing' })
          addToHistory({
            type: 'output',
            content: 'Starting typing test...'
          })
          break

        // Fun Commands
        case 'matrix':
          addToHistory({
            type: 'output',
            content: 'Activating Matrix mode... Wake up, Neo.'
          })
          break

        case 'weather':
          addToHistory({
            type: 'output',
            content: formatOutput.weather()
          })
          break

        case 'quote':
          addToHistory({
            type: 'output',
            content: formatOutput.quote()
          })
          break

        case 'joke':
          addToHistory({
            type: 'output',
            content: formatOutput.joke()
          })
          break

        case 'cowsay':
          const message = args.slice(1).join(' ') || 'Hello from Anurag!'
          addToHistory({
            type: 'output',
            content: formatOutput.cowsay(message)
          })
          break

        case 'figlet':
          const text = args.slice(1).join(' ') || 'ANURAG'
          addToHistory({
            type: 'output',
            content: formatOutput.figlet(text)
          })
          break

        case 'ping':
          const url = args[1] || 'localhost'
          addToHistory({
            type: 'output',
            content: formatOutput.ping(url)
          })
          break

        case 'uptime':
          addToHistory({
            type: 'output',
            content: `System uptime: ${systemInfo.uptime}\nPortfolio has been running since inception!`
          })
          break

        case 'ps':
          addToHistory({
            type: 'output',
            content: formatOutput.ps()
          })
          break

        case 'top':
          addToHistory({
            type: 'output',
            content: formatOutput.top()
          })
          break

        case 'sudo':
          if (args.length > 1) {
            addToHistory({
              type: 'output',
              content: `[sudo] ${args.slice(1).join(' ')}\nNice try! But you don't have sudo access in this portfolio. 😄`
            })
          } else {
            addToHistory({
              type: 'output',
              content: 'Usage: sudo <command>\nNote: This is a portfolio, not a real terminal! 😉'
            })
          }
          break

        case 'vim':
          addToHistory({
            type: 'output',
            content: formatOutput.vim()
          })
          break

        case 'nano':
          addToHistory({
            type: 'output',
            content: 'Opening nano editor... (Just kidding, this is a portfolio!)\nUse other commands to explore my work.'
          })
          break

        case 'ssh':
          const server = args[1] || 'github.com'
          addToHistory({
            type: 'output',
            content: `ssh: connecting to ${server}...\nConnection simulated! Check out my actual GitHub: https://github.com/anuragj7879`
          })
          break

        case 'github':
          if (args.length > 1) {
            const projectName = args[1]
            addToHistory({
              type: 'output',
              content: formatOutput.github(projectName)
            })
          } else {
            addToHistory({
              type: 'output',
              content: formatOutput.github()
            })
          }
          break

        case 'linkedin':
          addToHistory({
            type: 'output',
            content: 'Opening LinkedIn profile...\n🔗 https://linkedin.com/in/anurag-jayaswal\n\nConnect with me for professional opportunities!'
          })
          break

        case 'theme':
          if (args.length > 1) {
            addToHistory({
              type: 'output',
              content: `Theme changed to: ${args[1]}\nAvailable themes: classic, matrix, cyberpunk, amber, modern, iiit`
            })
          } else {
            addToHistory({
              type: 'output',
              content: 'Usage: theme <name>\nAvailable themes: classic, matrix, cyberpunk, amber, modern, iiit'
            })
          }
          break

        default:
          // Check if it's a partial command for suggestions
          const matchingCommands = Object.keys(commands).filter(cmd => 
            cmd.toLowerCase().startsWith(baseCommand)
          )
          
          if (matchingCommands.length > 0) {
            setSuggestions(matchingCommands)
            setShowSuggestions(true)
            setTimeout(() => setShowSuggestions(false), 3000)
            
            addToHistory({
              type: 'error',
              content: `Command not found: ${baseCommand}\nDid you mean: ${matchingCommands.slice(0, 3).join(', ')}?`
            })
          } else {
            addToHistory({
              type: 'error',
              content: `Command not found: ${baseCommand}\nType 'help' to see available commands.`
            })
          }
      }
    } catch (error) {
      addToHistory({
        type: 'error',
        content: `Error executing command: ${error}`
      })
    }
  }, [currentPath, currentUser, commandHistory, addToHistory, addCommandToHistory])

  const closeGame = useCallback(() => {
    setGameState({ active: false, type: null })
  }, [])

  return {
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
  }
}