'use client'

import { useState, useCallback } from 'react'

export type Theme = {
  name: string
  background: string
  primary: string
  secondary: string
  accent: string
  text: string
  prompt: string
}

const themes: Record<string, Theme> = {
  classic: {
    name: 'Classic Green',
    background: 'bg-black',
    primary: 'text-terminal-green',
    secondary: 'text-terminal-cyan',
    accent: 'text-terminal-amber',
    text: 'text-terminal-green',
    prompt: 'text-terminal-green'
  },
  matrix: {
    name: 'Matrix',
    background: 'bg-black',
    primary: 'text-matrix',
    secondary: 'text-green-400',
    accent: 'text-green-300',
    text: 'text-matrix',
    prompt: 'text-matrix'
  },
  cyberpunk: {
    name: 'Cyberpunk',
    background: 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900',
    primary: 'text-cyberpunk-primary',
    secondary: 'text-cyberpunk-secondary',
    accent: 'text-cyberpunk-accent',
    text: 'text-cyberpunk-primary',
    prompt: 'text-cyberpunk-primary'
  },
  amber: {
    name: 'Retro Amber',
    background: 'bg-black',
    primary: 'text-terminal-amber',
    secondary: 'text-yellow-400',
    accent: 'text-orange-400',
    text: 'text-terminal-amber',
    prompt: 'text-terminal-amber'
  },
  modern: {
    name: 'Modern Dark',
    background: 'bg-gradient-to-br from-gray-900 to-blue-900',
    primary: 'text-blue-400',
    secondary: 'text-cyan-400',
    accent: 'text-purple-400',
    text: 'text-blue-400',
    prompt: 'text-blue-400'
  },
  iiit: {
    name: 'IIIT Theme',
    background: 'bg-gradient-to-br from-blue-900 to-indigo-900',
    primary: 'text-blue-300',
    secondary: 'text-cyan-300',
    accent: 'text-yellow-300',
    text: 'text-blue-300',
    prompt: 'text-blue-300'
  }
}

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState('classic')

  const changeTheme = useCallback((themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
    }
  }, [])

  const getThemeClasses = useCallback(() => {
    const theme = themes[currentTheme]
    return `${theme.background} ${theme.text}`
  }, [currentTheme])

  const getThemeColors = useCallback(() => {
    return themes[currentTheme]
  }, [currentTheme])

  return {
    theme: themes[currentTheme],
    themeName: themes[currentTheme].name,
    currentTheme,
    changeTheme,
    getThemeClasses,
    getThemeColors,
    availableThemes: Object.keys(themes)
  }
}