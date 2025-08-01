"use client"

import { Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect, useRef } from "react"
import styles from "./product-filter.module.css"
import type React from "react"

//No need to move to types/, is not reused
interface ProductFilters {
  categories: string[];
  priceRange: [number, number];
  dietary: string[];
  searchTerm: string;
}

interface ProductFilterProps {
  onFilter: (filters: ProductFilters) => void;
  initialSearchTerm?: string;
}

export default function ProductFilter({ onFilter, initialSearchTerm = "" }: ProductFilterProps) {
  const { t } = useLanguage()
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filtersChanged, setFiltersChanged] = useState(false)
  const initialized = useRef(false)
  const prevInitialSearchTerm = useRef(initialSearchTerm)

  const categories = [
    { label: "Beverages", slug: "beverages" },
    { label: "Wholefood", slug: "wholefood" },
    { label: "Dairy Alternatives", slug: "dairy-alternatives" },
    { label: "Grains & Legumes", slug: "grains-legumes" },
    { label: "Oils & Vinegars", slug: "oils-vinegars" },
    { label: "Nuts & Seeds", slug: "nuts-seeds" },
    { label: "Superfoods", slug: "superfoods" },
    { label: "Natural Sweeteners", slug: "natural-sweeteners" },
  ]

  const dietaryPreferences = ["Gluten-Free", "Organic", "Vegan", "Non-GMO", "Sugar-Free", "Paleo", "Whole Grain"]

  useEffect(() => {
    if (!initialized.current || prevInitialSearchTerm.current !== initialSearchTerm) {
      setSearchTerm(initialSearchTerm)
      prevInitialSearchTerm.current = initialSearchTerm

      if (!initialized.current) {
        initialized.current = true
        onFilter({
          categories: selectedCategories,
          priceRange,
          dietary: selectedDietary,
          searchTerm: initialSearchTerm,
        })
      } else {
        setFiltersChanged(true)
      }
    }
  }, [initialSearchTerm])

  useEffect(() => {
    if (filtersChanged && initialized.current) {
      onFilter({
        categories: selectedCategories,
        priceRange,
        dietary: selectedDietary,
        searchTerm,
      })
      setFiltersChanged(false)
    }
  }, [filtersChanged, selectedCategories, priceRange, selectedDietary, searchTerm, onFilter])

  const markFiltersChanged = () => {
    setFiltersChanged(true)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
    markFiltersChanged()
  }

  const handleDietaryChange = (preference: string, checked: boolean) => {
    if (checked) {
      setSelectedDietary((prev) => [...prev, preference])
    } else {
      setSelectedDietary((prev) => prev.filter((p) => p !== preference))
    }
    markFiltersChanged()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    markFiltersChanged()
  }

  const handleReset = () => {
    setPriceRange([0, 50])
    setSelectedCategories([])
    setSelectedDietary([])
    setSearchTerm("")
    markFiltersChanged()
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number])
    markFiltersChanged()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    // Don't mark as changed here to avoid too many updates
    // The form submission will trigger the filter
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("filters.title")}</h2>
        <Button variant="ghost" size="sm" onClick={handleReset} className={styles.resetButton}>
          {t("filters.reset")}
        </Button>
      </div>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchContainer}>
          <Input
            type="search"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <Button type="submit" size="icon" className={styles.searchButton}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </form>

      <Accordion type="single" collapsible defaultValue="price" className={styles.accordion}>
        <AccordionItem value="price">
          <AccordionTrigger>{t("filters.priceRange")}</AccordionTrigger>
          <AccordionContent>
            <div className={styles.priceRangeContainer}>
              <Slider defaultValue={[0, 50]} max={50} step={1} value={priceRange} onValueChange={handlePriceChange} />
              <div className={styles.priceLabels}>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>{t("filters.categories")}</AccordionTrigger>
          <AccordionContent>
            <div className={styles.checkboxGroup}>
            {categories.map(({ label, slug }) => (
              <div key={slug} className={styles.checkboxItem}>
                <Checkbox
                  id={`category-${slug}`}
                  checked={selectedCategories.includes(slug)}
                  onCheckedChange={(checked) => handleCategoryChange(slug, checked === true)}
                />
                <Label htmlFor={`category-${slug}`} className={styles.checkboxLabel}>
                  {label}
                </Label>
              </div>
            ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dietary">
          <AccordionTrigger>{t("filters.dietaryPreferences")}</AccordionTrigger>
          <AccordionContent>
            <div className={styles.checkboxGroup}>
              {dietaryPreferences.map((preference) => (
                <div key={preference} className={styles.checkboxItem}>
                  <Checkbox
                    id={`preference-${preference}`}
                    checked={selectedDietary.includes(preference)}
                    onCheckedChange={(checked) => handleDietaryChange(preference, checked === true)}
                  />
                  <Label htmlFor={`preference-${preference}`} className={styles.checkboxLabel}>
                    {preference}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
