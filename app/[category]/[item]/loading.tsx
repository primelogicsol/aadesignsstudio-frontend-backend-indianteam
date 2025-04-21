import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-10 w-96 mb-4" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="h-px bg-gray-200 w-full my-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col h-full">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-6 w-3/4 mt-4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-1" />
            <Skeleton className="h-4 w-4/6 mb-4" />
            <Skeleton className="h-10 w-full mt-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
