import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface SubitemCardProps {
  title: string
  href: string
  imageSrc?: string
  description?: string
}

export function SubitemCard({ title, href, imageSrc, description }: SubitemCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg border-gray-200 group">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={imageSrc || `/abstract-geometric-shapes.png?height=200&width=400&query=${encodeURIComponent(title)}`}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold tracking-tight group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
      </CardHeader>
      {description && (
        <CardContent className="py-2 flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </CardContent>
      )}
      <CardFooter className="pt-2">
        <Button
          asChild
          variant="outline"
          className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-200"
        >
          <Link href={href} className="flex items-center justify-center">
            <span>Learn More</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
