import { notFound } from "next/navigation"
import { SubitemWysiwygEditor } from "@/components/dashboard/subitem-wysiwyg-editor"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import Subitem from "@/models/Subitem"
import { getCategories } from "@/lib/get-categories"
import { unstable_noStore } from "next/cache"
import { serializeMongoData } from "@/lib/serialize-mongo"

interface PageProps {
  params: {
    id: string
    itemId: string
    subitemId: string
  }
}

// Enhanced data fetching to get complete subitem data
async function getSubitemData(categoryId: string, itemId: string, subitemId: string) {
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

    // Get the full subitem content from the Subitem collection with no projection
    const subitemFull = await Subitem.findById(subitemId).lean()

    if (!subitemFull) {
      console.error("Subitem document not found in Subitem collection:", subitemId)
      return null
    }

    // Create a plain object with string IDs using our serialization function
    const plainSubitem = serializeMongoData({
      ...subitemBasic,
      ...subitemFull,
      _id: subitemId,
      categoryId,
      itemId,
    })

    // Return the combined data with serialized values
    return {
      category: serializeMongoData(category),
      item: serializeMongoData(item),
      subitem: plainSubitem,
    }
  } catch (error) {
    console.error("Error fetching subitem data:", error)
    return null
  }
}

export default async function EditSubitemWysiwygPage({ params }: PageProps) {
  // Get all categories for the dropdown and the specific subitem data
  const [categoriesResult, subitemData] = await Promise.all([
    getCategories(),
    getSubitemData(params.id, params.itemId, params.subitemId),
  ])

  if (!subitemData) {
    notFound()
  }

  // Ensure categories are also properly serialized
  const categories = serializeMongoData(categoriesResult)
  const { category, item, subitem } = subitemData

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Subitem with WYSIWYG Editor</h1>
      <div className="mb-4 text-sm text-gray-500">
        <span>Path: </span>
        <span>
          {category.name} / {item.label} / {subitem.label}
        </span>
      </div>
      <SubitemWysiwygEditor subitem={subitem} categories={categories} />
    </div>
  )
}
