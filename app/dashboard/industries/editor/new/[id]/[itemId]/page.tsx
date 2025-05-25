import IndustryDetailBodyEditor from "@/components/dashboard/industry-detail-body-editor"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
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

export default async function NewIndustryPage({ params }: PageProps) {
  const data = await getCategoryAndItemData(params.id, params.itemId)

  if (!data) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-red-500">Failed to load category and item data</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Industry</h1>
      <IndustryDetailBodyEditor
        data={null}
        categoryId={params.id}
        itemId={params.itemId}
        category={data.categoryName}
        categoryPath={`/${data.categorySlug}`}
        parentTitle={data.itemName}
        parentPath={`/${data.categorySlug}/${data.itemName}`}
      />
    </div>
  )
}
