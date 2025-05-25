
import CollaborativeNetworkEditor from "@/components/collabrativeNetworkeditor"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import { networkFallbackData } from "@/lib/collaborative-network/fallback-data"
import { unstable_noStore } from "next/cache"

interface PageProps {
  params: {
    id: string
    itemId: string
  }
}

async function getCategoryAndItemData(categoryId: string, itemId: string) {
  try {
    unstable_noStore() // Prevent caching
    await connectToDatabase()

    // Get the category document
    const category = await Category.findById(categoryId).lean()
    if (!category) {
      console.error("Category not found:", categoryId)
      return null
    }

    // Find the item in the category
    const item = category.items.find((i: any) => i._id.toString() === itemId)
    if (!item) {
      console.error("Item not found in category:", itemId)
      return null
    }

    return {
      categoryName: category.name,
      categorySlug: category.slug,
      itemName: item.title || item.label,
    }
  } catch (error) {
    console.error("Error fetching category and item data:", error)
    return null
  }
}

export default async function NewNetworkPage({ params }: PageProps) {
  const data = await getCategoryAndItemData(params.id, params.itemId)

  if (!data) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-red-500">Failed to load category and item data</p>
      </div>
    )
  }

  // Create initial data with the category and item info
  const initialData = {
    ...networkFallbackData,
    name: "New Collaborative Network",
    description: "A new collaborative network for your organization",
  }

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold mb-8 px-4">Create New Network</h1>
      <CollaborativeNetworkEditor initialData={initialData} categoryId={params.id} itemId={params.itemId} />
    </div>
  )
}
