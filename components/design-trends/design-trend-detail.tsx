"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { designTrendsFallbackData } from "@/lib/design-trends/fallback-data"
import type { DesignTrendDetail } from "@/types/design-trends"

interface DesignTrendDetailProps {
  id: string
  initialData?: DesignTrendDetail
  endpoint?: string
}

export function DesignTrendDetail({ id, initialData, endpoint = "/api/design-trends" }: DesignTrendDetailProps) {
  const [trend, setTrend] = useState<DesignTrendDetail | null>(initialData || null)
  const [isLoading, setIsLoading] = useState<boolean>(!initialData)
  const [error, setError] = useState<string | null>(null)
  const [relatedTrends, setRelatedTrends] = useState<any[]>([])

  useEffect(() => {
    if (!initialData) {
      fetchTrendDetail()
    } else {
      fetchRelatedTrends(initialData.relatedTrends || [])
    }
  }, [id, initialData])

  const fetchTrendDetail = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${endpoint}/${id}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch trend detail: ${response.status}`)
      }

      const data = await response.json()
      setTrend(data)

      // Fetch related trends
      if (data.relatedTrends && data.relatedTrends.length > 0) {
        fetchRelatedTrends(data.relatedTrends)
      }
    } catch (err) {
      console.error("Error fetching trend detail:", err)
      setError("Failed to load trend details. Please try again later.")

      // Use fallback data if available
      const fallbackTrend = designTrendsFallbackData.trends.find((t) => t.id === id)
      if (fallbackTrend) {
        setTrend({
          ...fallbackTrend,
          content: `<p>${fallbackTrend.description}</p><p>Detailed content unavailable offline.</p>`,
          authorInfo: {
            name: fallbackTrend.author || "Unknown Author",
            avatar: `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(fallbackTrend.author || "author")}`,
            bio: `Expert in ${fallbackTrend.category}`,
          },
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRelatedTrends = async (relatedIds: string[]) => {
    if (relatedIds.length === 0) return

    try {
      // In a real app, you might want to fetch these from the API
      // For simplicity, we'll use the fallback data
      const related = relatedIds
        .map((relatedId) => designTrendsFallbackData.trends.find((t) => t.id === relatedId))
        .filter(Boolean)

      setRelatedTrends(related)
    } catch (err) {
      console.error("Error fetching related trends:", err)
    }
  }

  // Extract headings for table of contents if content is available
  const extractHeadings = (content: string) => {
    if (!content) return []

    return content
      .split("<h2>")
      .slice(1)
      .map((section) => {
        const endOfHeading = section.indexOf("</h2>")
        return section.substring(0, endOfHeading)
      })
  }

  const headings = trend?.content ? extractHeadings(trend.content) : []

  if (isLoading) {
    return <DesignTrendDetailSkeleton />
  }

  if (!trend) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Design Trend Not Found</h2>
        <p className="text-gray-600 mb-6">The design trend you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/design-trends">Back to Design Trends</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex flex-wrap items-center text-sm text-white/70">
              <li className="flex items-center">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link href="/design-trends" className="hover:text-white">
                  Design Trends
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="font-medium text-white">{trend.title}</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">{trend.title}</h1>
            <p className="mb-8 text-xl text-white/90">{trend.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              {trend.date && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{trend.date}</span>
                </div>
              )}
              {trend.readTime && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{trend.readTime}</span>
                </div>
              )}
              {trend.author && (
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <Image
                      src={
                        trend.authorInfo?.avatar ||
                        `/placeholder.svg?height=24&width=24&query=${encodeURIComponent(trend.author)}`
                      }
                      alt={trend.author}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span>{trend.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Content */}
          <div className="lg:w-2/3">
            {/* Featured Image */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <Image
                src={trend.image || "/placeholder.svg"}
                alt={trend.title}
                width={800}
                height={450}
                className="w-full"
              />
            </div>

            {/* Article Body */}
            <article className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: trend.content }} />
            </article>

            {/* Tags */}
            {trend.tags && trend.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {trend.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/design-trends?tag=${tag}`}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Author Bio */}
            {trend.authorInfo && (
              <div className="mt-12 rounded-xl bg-gray-50 p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={trend.authorInfo.avatar || "/placeholder.svg"}
                      alt={trend.authorInfo.name}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{trend.authorInfo.name}</h3>
                    <p className="text-gray-600">{trend.authorInfo.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Social Sharing */}
            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" asChild>
                <Link href="/design-trends" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to All Trends
                </Link>
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <ThumbsUp size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="mb-8 rounded-xl border border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-bold">Table of Contents</h3>
                <ul className="space-y-2">
                  {headings.map((heading, index) => (
                    <li key={index}>
                      <a
                        href={`#${heading.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-blue-600 hover:underline"
                      >
                        {heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Trends */}
            {relatedTrends.length > 0 && (
              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-bold">Related Trends</h3>
                <div className="space-y-4">
                  {relatedTrends.map((relatedTrend) => (
                    <div key={relatedTrend.id} className="flex gap-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={relatedTrend.image || "/placeholder.svg"}
                          alt={relatedTrend.title}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          <Link href={`/design-trends/${relatedTrend.id}`} className="hover:text-blue-600">
                            {relatedTrend.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-gray-500">{relatedTrend.readTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Badge */}
            {trend.category && (
              <div className="mt-8 rounded-xl border border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-bold">Category</h3>
                <Link href={`/design-trends?category=${trend.category.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1">{trend.category}</Badge>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function DesignTrendDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Skeleton className="h-4 w-40 bg-white/30" />
          </div>
          <div className="max-w-3xl">
            <Skeleton className="h-12 w-3/4 mb-4 bg-white/30" />
            <Skeleton className="h-6 w-full mb-8 bg-white/30" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-32 bg-white/30" />
              <Skeleton className="h-6 w-32 bg-white/30" />
              <Skeleton className="h-6 w-32 bg-white/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Content Skeleton */}
          <div className="lg:w-2/3">
            <Skeleton className="h-96 w-full mb-8" />
            <div className="space-y-4 mb-8">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="space-y-4 mb-8">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
            <div className="space-y-4 mb-8">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:w-1/3">
            <div className="mb-8 rounded-xl border border-gray-200 p-6">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Skeleton className="h-16 w-16 flex-shrink-0" />
                  <div className="flex-grow">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-16 w-16 flex-shrink-0" />
                  <div className="flex-grow">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
