import type { DesignTrendResponse } from "@/types/design-trends"
import { designTrendsFallbackData } from "./fallback-data"

interface FetchDesignTrendsOptions {
  endpoint?: string
  category?: string
  page?: number
  limit?: number
  sort?: string
  tag?: string
}

/**
 * Fetches design trends from the API with error handling and timeout
 * For now, this always returns the fallback data
 */
export async function fetchDesignTrends({
  endpoint = "/api/design-trends",
  category = "all",
  page = 1,
  limit = 9,
  sort = "latest",
  tag,
}: FetchDesignTrendsOptions): Promise<DesignTrendResponse> {
  // For now, we'll always use the fallback data
  console.log("Using static fallback data for design trends")

  // Filter fallback data based on category if provided
  const filteredTrends =
    category && category !== "all"
      ? designTrendsFallbackData.trends.filter((trend) => trend.category.toLowerCase() === category.toLowerCase())
      : designTrendsFallbackData.trends

  // Apply pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTrends = filteredTrends.slice(startIndex, endIndex)

  return {
    trends: paginatedTrends,
    categories: designTrendsFallbackData.categories,
    hasMore: endIndex < filteredTrends.length,
    total: filteredTrends.length,
  }
}
