import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DesignTrendSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full" />

      <CardHeader className="pb-2">
        {/* Title skeleton */}
        <Skeleton className="h-7 w-3/4 mb-2" />
      </CardHeader>

      <CardContent>
        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />

        {/* Meta information skeleton */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        {/* Tags skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardFooter>
    </Card>
  )
}
