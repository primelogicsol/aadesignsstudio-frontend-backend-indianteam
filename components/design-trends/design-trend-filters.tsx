"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { DesignTrendCategory } from "@/types/design-trends"

interface DesignTrendFiltersProps {
  categories: DesignTrendCategory[]
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  className?: string
}

export function DesignTrendFilters({
  categories,
  selectedCategory = "all",
  onCategoryChange,
  className = "",
}: DesignTrendFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const handleCategoryClick = (categorySlug: string) => {
    if (onCategoryChange) {
      onCategoryChange(categorySlug)
    }
  }

  // Ensure we always have an "All" category
  const allCategories = categories.some((cat) => cat.slug === "all")
    ? categories
    : [{ name: "All", slug: "all", count: 0 }, ...categories]

  return (
    <div className={`design-trend-filters ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Browse Design Trends</h3>
        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search trends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowSearch(true)}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Trends</SheetTitle>
                <SheetDescription>Refine trends by various criteria</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Date Range</h3>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all">All Time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="month" id="month" />
                      <Label htmlFor="month">Last Month</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="year" id="year" />
                      <Label htmlFor="year">Last Year</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Tags</h3>
                  <div className="space-y-2">
                    {["Minimalism", "Animation", "Typography", "Color", "Layout", "3D", "Accessibility"].map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox id={`tag-${tag}`} />
                        <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Reading Time</h3>
                  <RadioGroup defaultValue="any">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any-time" />
                      <Label htmlFor="any-time">Any Length</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="short" id="short" />
                      <Label htmlFor="short">Short (&lt; 5 min)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium (5-10 min)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="long" id="long" />
                      <Label htmlFor="long">Long (&gt; 10 min)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline">Reset</Button>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {allCategories.map((category) => (
          <Button
            key={category.slug}
            variant={category.slug === selectedCategory ? "default" : "outline"}
            size="sm"
            className={`rounded-full whitespace-nowrap ${
              category.slug === selectedCategory ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100"
            }`}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
            {category.count > 0 && category.slug !== "all" && (
              <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">{category.count}</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}
