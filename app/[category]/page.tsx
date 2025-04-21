import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PageProps {
  params: {
    category: string
  }
}

async function getCategoryBySlug(slug: string) {
  try {
    await connectToDatabase()
    const category = await Category.findOne({ slug }).lean()

    if (!category) {
      console.log(`Category not found: ${slug}`)
      // Try to find by name (case insensitive)
      const categoryByName = await Category.findOne({
        name: { $regex: new RegExp(`^${slug}$`, "i") },
      }).lean()

      if (categoryByName) {
        console.log(`Found category by name instead: ${categoryByName.name}`)
        return categoryByName
      }
    }

    return category
  } catch (error) {
    console.error("Error fetching category:", error)
    return null
  }
}

export default async function CategoryPage({ params }: PageProps) {
  console.log("Rendering category page with params:", params)

  const category = await getCategoryBySlug(params.category)

  if (!category) {
    notFound()
  }

  // Helper function to extract item slug from href
  const getItemSlug = (href: string) => {
    const parts = href.split("/")
    return parts[parts.length - 1]
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">{category.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
            {category.description && <p className="text-gray-600 max-w-3xl mb-6">{category.description}</p>}
          </div>

          {category.image && (
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )}
        </div>

        <div className="h-px bg-gray-200 w-full my-8"></div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Browse {category.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item: any) => (
          <Card
            key={item._id || item.label}
            className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={`/abstract-geometric-shapes.png?height=200&width=400&query=${encodeURIComponent(item.label)}`}
                alt={item.label}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <h3 className="text-xl font-semibold">{item.label}</h3>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600">
                {item.subitems && item.subitems.length > 0
                  ? `Explore ${item.subitems.length} subitems in this category`
                  : "Explore this category"}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/${params.category}/${getItemSlug(item.href)}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Details →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
