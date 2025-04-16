"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <label className="theme-switch">
      <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
      <span className="theme-switch-slider"></span>
      <Sun className="theme-switch-icon sun" size={16} />
      <Moon className="theme-switch-icon moon" size={16} />
    </label>
  )
}
