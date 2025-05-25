import { NextResponse } from "next/server"
import { designTrendsFallbackData } from "@/lib/design-trends/fallback-data"

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const category = url.searchParams.get("category") || "all"
    const page = Number.parseInt(url.searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(url.searchParams.get("limit") || "9", 10)
    const sort = url.searchParams.get("sort") || "latest"
    const tag = url.searchParams.get("tag")

    // Use fallback data as our source
    let trends = [...designTrendsFallbackData.trends]

    // Filter by category if specified
    if (category && category !== "all") {
      trends = trends.filter((trend) => trend.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by tag if specified
    if (tag) {
      trends = trends.filter((trend) => trend.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()))
    }

    // Sort trends
    if (sort === "latest") {
      // Assuming date is in format "Month Day, Year"
      trends.sort((a, b) => {
        if (!a.date) return 1
        if (!b.date) return -1
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    } else if (sort === "oldest") {
      trends.sort((a, b) => {
        if (!a.date) return 1
        if (!b.date) return -1
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    } else if (sort === "a-z") {
      trends.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === "z-a") {
      trends.sort((a, b) => b.title.localeCompare(a.title))
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTrends = trends.slice(startIndex, endIndex)

    // Return response
    return NextResponse.json({
      trends: paginatedTrends,
      categories: designTrendsFallbackData.categories,
      hasMore: endIndex < trends.length,
      total: trends.length,
    })
  } catch (error) {
    console.error("Error in design trends API:", error)
    return NextResponse.json({ error: "Failed to fetch design trends" }, { status: 500 })
  }
}
