'use client'

import React, { createContext, useContext, useEffect } from 'react'

const themes: Record<string, { [key: string]: string }> = {
  default: {
    '--color-primary': 'oklch(70% 0.18 145)',      // vert
    '--color-primary-dark': 'oklch(55% 0.2 145)',
  },
  intuition: {
    '--color-primary': 'oklch(80% 0.18 275)',      // violet doux
    '--color-primary-dark': 'oklch(60% 0.18 275)',
  },
  action: {
    '--color-primary': 'oklch(75% 0.2 30)',        // orange chaud
    '--color-primary-dark': 'oklch(60% 0.2 30)',
  },
  // ... Ajoute tes thèmes ici
}

const ThemeContext = createContext({
  setTheme: (name: string) => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const setTheme = (name: string) => {
    const theme = themes[name] || themes.default
    for (const key in theme) {
      document.documentElement.style.setProperty(key, theme[key])
    }
  }

  useEffect(() => {
    setTheme('default')
  }, [])

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
