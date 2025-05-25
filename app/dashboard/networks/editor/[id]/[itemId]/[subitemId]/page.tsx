import { notFound } from "next/navigation"
import CollaborativeNetworkEditor from "@/components/collabrativeNetworkeditor"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import NetworkSubitem from "@/models/NetworkSubitem"
import { serializeMongoData } from "@/lib/serialize-mongo"
import { networkFallbackData } from "@/lib/collaborative-network/fallback-data"
import { unstable_noStore } from "next/cache"

interface PageProps {
  params: {
    id: string
    itemId: string
    subitemId: string
  }
}

async function getNetworkData(categoryId: string, itemId: string, subitemId: string) {
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

    // Find the basic subitem info in the item
    const subitemBasic = item.subitems.find((s: any) => s._id.toString() === subitemId)
    if (!subitemBasic) {
      console.error("Subitem not found in item:", subitemId)
      return null
    }

    // Get the full network subitem content
    const networkSubitem = await NetworkSubitem.findById(subitemId).lean()

    // If no network data exists yet, return basic data with fallback
    if (!networkSubitem) {
      return {
        ...networkFallbackData,
        name: subitemBasic.label || "Network Name",
        categoryName: category.name,
        categorySlug: category.slug,
        itemName: item.title || item.label,
      }
    }

    return {
      ...serializeMongoData(networkSubitem),
      categoryName: category.name,
      categorySlug: category.slug,
      itemName: item.title || item.label,
    }
  } catch (error) {
    console.error("Error fetching network data:", error)
    return null
  }
}

export default async function EditNetworkPage({ params }: PageProps) {
  const networkData = await getNetworkData(params.id, params.itemId, params.subitemId)

  if (!networkData) {
    notFound()
  }

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold mb-8 px-4">Edit Network: {networkData.name}</h1>
      <CollaborativeNetworkEditor
        initialData={networkData}
        categoryId={params.id}
        itemId={params.itemId}
        subitemId={params.subitemId}
      />
    </div>
  )
}
