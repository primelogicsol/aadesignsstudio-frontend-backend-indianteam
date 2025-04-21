import { notFound } from "next/navigation"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import { SubitemCard } from "@/components/subitem-card"

interface PageProps {
  params: {
    category: string
    item: string
  }
}

async function getCategoryAndItem(categorySlug: string, itemSlug: string) {
  try {
    await connectToDatabase()

    // Find the category by slug
    const category = await Category.findOne({ slug: categorySlug }).lean()

    if (!category) {
      console.log(`Category not found: ${categorySlug}`)
      return null
    }

    // Find the item in the category - try different matching strategies
    let item = null

    // Strategy 1: Match by the last segment of href
    for (const i of category.items) {
      const hrefParts = i.href.split("/")
      const lastPart = hrefParts[hrefParts.length - 1]

      if (lastPart === itemSlug) {
        item = i
        break
      }
    }

    // Strategy 2: If not found, try matching by label (case insensitive)
    if (!item) {
      item = category.items.find((i) => i.label.toLowerCase() === itemSlug.toLowerCase())
    }

    // Strategy 3: Try matching by href containing the itemSlug
    if (!item) {
      item = category.items.find((i) => i.href.includes(itemSlug))
    }

    if (!item) {
      console.log(`Item not found in category ${categorySlug}: ${itemSlug}`)
      return null
    }

    return { category, item }
  } catch (error) {
    console.error("Error fetching category and item:", error)
    return null
  }
}

export default async function ItemPage({ params }: PageProps) {
  const result = await getCategoryAndItem(params.category, params.item)

  if (!result) {
    notFound()
  }

  const { category, item } = result

  // Helper function to extract the last part of a URL for subitem links
  const getSubitemSlug = (href: string) => {
    const parts = href.split("/")
    return parts[parts.length - 1]
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Categories</span>
          <span>/</span>
          <span>{category.name}</span>
          <span>/</span>
          <span className="font-medium text-gray-900">{item.label}</span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{item.label}</h1>

        {category.description && <p className="text-gray-600 max-w-3xl">{category.description}</p>}

        <div className="h-px bg-gray-200 w-full my-6"></div>
      </div>

      {item.subitems && item.subitems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {item.subitems.map((subitem: any) => (
            <SubitemCard
              key={subitem._id || subitem.label}
              title={subitem.label}
              href={`/${params.category}/${params.item}/${getSubitemSlug(subitem.href)}`}
              description={`Explore our ${subitem.label} offerings and discover how they can benefit your business needs.`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No subitems found</h3>
          <p className="text-gray-500 mt-2">This item doesn't have any subitems yet.</p>
        </div>
      )}
    </div>
  )
}
