import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Skeleton className="h-6 w-64 mb-2" />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <Skeleton className="h-10 w-96 mb-4" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-1" />
            <Skeleton className="h-4 w-4/6 mb-6" />
          </div>

          <div className="w-full md:w-1/3 lg:w-1/4">
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full my-8"></div>
      </div>

      <Skeleton className="h-8 w-64 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col h-full">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-6 w-3/4 mt-4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <Skeleton className="h-4 w-1/3 mt-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
