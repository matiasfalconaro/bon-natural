"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/data/i18n/translations"
import { TranslationKeys } from "@/types/i18n"

export type Language = "en" | "es" | "fr"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKeys) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("preferredLanguage") as Language | null
    if (saved && ["en", "es", "fr"].includes(saved)) return saved
  }
  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initialLang = getInitialLanguage()
    setLanguage(initialLang)
    document.documentElement.lang = initialLang
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem("preferredLanguage", language)
    document.documentElement.lang = language
  }, [language, isInitialized])

  const t = (key: TranslationKeys): string => {
    return (translations[language] as Record<TranslationKeys, string>)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}
