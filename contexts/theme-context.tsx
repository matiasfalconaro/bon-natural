"use client"

import { createContext,
  useContext,
  useState,
  useEffect
} from "react"
import type React from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themeColors = {
  primary: "#5a7c5a",
  primaryDark: "#4a6a4a",
  secondary: "#f8f5f0",
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null

      if (savedTheme && ["light", "dark"].includes(savedTheme)) {
        setTheme(savedTheme)
      } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark")
      }
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
    
    document.documentElement.style.setProperty("--color-primary", themeColors.primary)
    document.documentElement.style.setProperty("--color-primary-dark", themeColors.primaryDark)
    document.documentElement.style.setProperty("--color-secondary", themeColors.secondary)
  }, [theme, isInitialized])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
