"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import styles from "./search-bar.module.css"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Use a ref to track if we've already initialized
  const initialized = useRef(false)

  // Popular search suggestions
  const suggestions = ["Organic", "Gluten-free", "Vegan", "Superfoods", "Natural sweeteners", "Healthy snacks"]

  // Initialize search term and recent searches only once
  useEffect(() => {
    // Skip if already initialized
    if (initialized.current) return

    // Get initial search term from URL if present
    const initialSearch = searchParams.get("search") || ""
    setSearchTerm(initialSearch)

    // Load recent searches from localStorage
    if (typeof window !== "undefined") {
      try {
        const savedSearches = localStorage.getItem("recentSearches")
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches))
        }
      } catch (e) {
        console.error("Failed to parse recent searches", e)
      }
    }

    // Mark as initialized
    initialized.current = true
  }, [searchParams]) // Keep searchParams in deps to satisfy React

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Save to recent searches
      const updatedSearches = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, 5) // Keep only 5 most recent

      setRecentSearches(updatedSearches)

      // Save to localStorage
      try {
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
      } catch (e) {
        console.error("Failed to save recent searches", e)
      }

      // Navigate to search results
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    router.push(`/products?search=${encodeURIComponent(suggestion)}`)
    setShowSuggestions(false)
  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <Input
            type="search"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // Delay hiding suggestions to allow for clicks
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            className={styles.searchInput}
          />
          <Button type="submit" className={styles.searchButton}>
            <Search className="mr-2 h-4 w-4" />
            {t("search.button")}
          </Button>
        </div>

        {showSuggestions && (
          <div className={styles.suggestionsContainer}>
            {recentSearches.length > 0 && (
              <div className={styles.suggestionSection}>
                <h3 className={styles.suggestionTitle}>{t("search.recent")}</h3>
                <ul className={styles.suggestionList}>
                  {recentSearches.map((search, index) => (
                    <li key={`recent-${index}`}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(search)}
                        className={styles.suggestionItem}
                      >
                        {search}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.suggestionSection}>
              <h3 className={styles.suggestionTitle}>{t("search.popular")}</h3>
              <ul className={styles.suggestionList}>
                {suggestions.map((suggestion, index) => (
                  <li key={`suggestion-${index}`}>
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={styles.suggestionItem}
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
