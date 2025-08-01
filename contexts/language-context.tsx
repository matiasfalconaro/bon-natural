"use client"

import { translations } from "@/data/i18n/translations"
import { LanguageContextType, SupportedLanguage, TranslationKeys } from "@/types/i18n";
import React, { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("preferredLanguage") as SupportedLanguage | null
    if (saved && ["en", "es", "fr"].includes(saved)) return saved
  }
  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>("en")
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
