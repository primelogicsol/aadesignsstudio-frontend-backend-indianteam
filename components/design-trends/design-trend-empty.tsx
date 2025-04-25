"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface DesignTrendEmptyProps {
  category?: string
  onRefresh?: () => void
}

export function DesignTrendEmpty({ category = "all", onRefresh }: DesignTrendEmptyProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto w-48 h-48 relative mb-6">
        <Image src="/deserted-beach.png" alt="No trends found" fill className="object-contain" />
      </div>

      <h3 className="text-xl font-semibold mb-2">No trends found</h3>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {category === "all"
          ? "We couldn't find any design trends. Try refreshing or check back later."
          : `We couldn't find any design trends in the "${category}" category. Try selecting a different category.`}
      </p>

      {onRefresh && (
        <Button onClick={onRefresh} variant="outline" className="mx-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      )}
    </div>
  )
}
