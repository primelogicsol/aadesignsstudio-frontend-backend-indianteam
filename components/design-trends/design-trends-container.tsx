"use client"

import { useState, useEffect } from "react"
import { fetchDesignTrends } from "@/lib/design-trends/api"
import { designTrendsFallbackData } from "@/lib/design-trends/fallback-data"
import { DesignTrendCard } from "./design-trend-card"
import { DesignTrendSkeleton } from "./design-trend-skeleton"
import { DesignTrendFilters } from "./design-trend-filters"
import { DesignTrendEmpty } from "./design-trend-empty"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { DesignTrend, DesignTrendCategory } from "@/types/design-trends"

export interface DesignTrendsContainerProps {
  title?: string
  description?: string
  endpoint?: string
  initialCategory?: string
  maxItems?: number
  showFilters?: boolean
  showLoadMore?: boolean
  layout?: "grid" | "list" | "featured"
  className?: string
  onTrendClick?: (trend: DesignTrend) => void
}

export function DesignTrendsContainer({
  title = "Design Trends",
  description = "Explore the latest design trends and insights",
  endpoint = "/api/design-trends",
  initialCategory = "all",
  maxItems = 9,
  showFilters = true,
  showLoadMore = true,
  layout = "grid",
  className = "",
  onTrendClick,
}: DesignTrendsContainerProps) {
  // State for trends data
  const [trends, setTrends] = useState<DesignTrend[]>([])
  const [categories, setCategories] = useState<DesignTrendCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [useFallback, setUseFallback] = useState<boolean>(false)

  // Fetch trends data
  useEffect(() => {
    const loadTrends = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Attempt to fetch data from the API
        const data = await fetchDesignTrends({
          endpoint,
          category: selectedCategory,
          page: 1,
          limit: maxItems,
        })

        setTrends(data.trends)
        setCategories(data.categories)
        setHasMore(data.hasMore)
        setPage(1)
      } catch (err) {
        console.error("Error fetching design trends:", err)

        // If API fetch fails, use fallback data
        setUseFallback(true)

        // Filter fallback data based on selected category
        const fallbackTrends = designTrendsFallbackData.trends
          .filter(
            (trend) => selectedCategory === "all" || trend.category.toLowerCase() === selectedCategory.toLowerCase(),
          )
          .slice(0, maxItems)

        setTrends(fallbackTrends)
        setCategories(designTrendsFallbackData.categories)
        setHasMore(fallbackTrends.length >= maxItems)

        // Set a user-friendly error message
        setError("Unable to fetch the latest design trends. Showing cached data instead.")
      } finally {
        setIsLoading(false)
      }
    }

    loadTrends()
  }, [endpoint, selectedCategory, maxItems])

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  // Handle load more
  const handleLoadMore = async () => {
    setIsLoading(true)

    try {
      if (useFallback) {
        // Handle load more with fallback data
        const nextPage = page + 1
        const startIndex = (nextPage - 1) * maxItems
        const endIndex = startIndex + maxItems

        const moreFallbackTrends = designTrendsFallbackData.trends
          .filter(
            (trend) => selectedCategory === "all" || trend.category.toLowerCase() === selectedCategory.toLowerCase(),
          )
          .slice(startIndex, endIndex)

        if (moreFallbackTrends.length > 0) {
          setTrends((prev) => [...prev, ...moreFallbackTrends])
          setPage(nextPage)
          setHasMore(moreFallbackTrends.length >= maxItems)
        } else {
          setHasMore(false)
        }
      } else {
        // Handle load more with API data
        const nextPage = page + 1
        const data = await fetchDesignTrends({
          endpoint,
          category: selectedCategory,
          page: nextPage,
          limit: maxItems,
        })

        setTrends((prev) => [...prev, ...data.trends])
        setPage(nextPage)
        setHasMore(data.hasMore)
      }
    } catch (err) {
      console.error("Error loading more trends:", err)
      setError("Unable to load more trends. Please try again later.")
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Determine grid layout class based on layout prop
  const getLayoutClass = () => {
    switch (layout) {
      case "list":
        return "grid grid-cols-1 gap-6"
      case "featured":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [&>*:first-child]:md:col-span-2 [&>*:first-child]:lg:col-span-2"
      case "grid":
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    }
  }

  return (
    <div className={`design-trends-container ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Error message */}
      {error && (
        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      {showFilters && categories.length > 0 && (
        <DesignTrendFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          className="mb-8"
        />
      )}

      {/* Loading state */}
      {isLoading && trends.length === 0 && (
        <div className={getLayoutClass()}>
          {[...Array(maxItems > 3 ? 3 : maxItems)].map((_, i) => (
            <DesignTrendSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && trends.length === 0 && <DesignTrendEmpty category={selectedCategory} />}

      {/* Trends grid */}
      {trends.length > 0 && (
        <div className={getLayoutClass()}>
          {trends.map((trend, index) => (
            <DesignTrendCard
              key={trend.id || index}
              trend={trend}
              featured={layout === "featured" && index === 0}
              onClick={() => onTrendClick && onTrendClick(trend)}
            />
          ))}
        </div>
      )}

      {/* Load more button */}
      {showLoadMore && hasMore && trends.length > 0 && (
        <div className="mt-8 text-center">
          <Button onClick={handleLoadMore} disabled={isLoading} variant="outline" size="lg">
            {isLoading ? "Loading..." : "Load More Trends"}
          </Button>
        </div>
      )}
    </div>
  )
}
