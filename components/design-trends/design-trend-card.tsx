"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { DesignTrend } from "@/types/design-trends"

interface DesignTrendCardProps {
  trend: DesignTrend
  featured?: boolean
  className?: string
  onClick?: () => void
}

export function DesignTrendCard({ trend, featured = false, className, onClick }: DesignTrendCardProps) {
  // Determine if the card should be clickable
  const isClickable = !!onClick

  // Determine if the trend has a valid URL
  const hasValidUrl = trend.url && trend.url.startsWith("/")

  // Prepare the card content
  const cardContent = (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 h-full flex flex-col",
        featured ? "border-blue-200" : "",
        isClickable ? "cursor-pointer hover:shadow-md" : "",
        className,
      )}
    >
      {/* Image section */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={trend.image || `/placeholder.svg?height=300&width=600&query=${encodeURIComponent(trend.title)}`}
          alt={trend.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category badge */}
        <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white" variant="secondary">
          {trend.category}
        </Badge>

        {/* Featured badge */}
        {featured && (
          <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600 text-white" variant="secondary">
            Featured
          </Badge>
        )}
      </div>

      {/* Content section */}
      <CardHeader className={cn(featured ? "pb-2" : "pb-0")}>
        <h3
          className={cn(
            "font-bold text-gray-900 group-hover:text-blue-600 transition-colors",
            featured ? "text-2xl" : "text-xl",
          )}
        >
          {trend.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4 line-clamp-2">{trend.description}</p>

        {/* Meta information */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
          {trend.date && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {trend.date}
            </div>
          )}

          {trend.author && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {trend.author}
            </div>
          )}

          {trend.readTime && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {trend.readTime}
            </div>
          )}
        </div>
      </CardContent>

      {/* Footer with tags */}
      <CardFooter className="pt-0 flex flex-col items-start">
        {trend.tags && trend.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {trend.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100">
                {tag}
              </Badge>
            ))}
            {trend.tags.length > 3 && (
              <Badge variant="outline" className="bg-gray-100">
                +{trend.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {hasValidUrl && (<></>
          // <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-800 hover:bg-transparent">
          //   Read More <ArrowRight className="ml-2 h-4 w-4" />
          // </Button>
        )}
      </CardFooter>
    </Card>
  )

  // Wrap with Link if URL is provided, otherwise with a div that handles onClick
  if (hasValidUrl) {
    return (
      <Link href={trend.url} className="group block h-full">
        {cardContent}
      </Link>
    )
  } else if (isClickable) {
    return (
      <div onClick={onClick} className="group h-full">
        {cardContent}
      </div>
    )
  } else {
    return <div className="group h-full">{cardContent}</div>
  }
}
