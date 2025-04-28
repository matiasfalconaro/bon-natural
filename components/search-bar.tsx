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
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    const initialSearch = searchParams.get("search") || ""
    setSearchTerm(initialSearch)

    initialized.current = true
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`)
    }
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
            // onFocus={() => setShowSuggestions(true)}
            // onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className={styles.searchInput}
          />
          <Button type="submit" className={styles.searchButton}>
            <Search className="mr-2 h-4 w-4" />
            {t("search.button")}
          </Button>
        </div>
      </form>
    </div>
  )
}
