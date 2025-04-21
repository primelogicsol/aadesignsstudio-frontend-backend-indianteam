import { notFound } from "next/navigation"
import { SubitemForm } from "@/components/dashboard/subitem-form"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import Subitem from "@/models/Subitem"
import { getCategories } from "@/lib/get-categories"
import { unstable_noStore } from "next/cache"

interface PageProps {
  params: {
    id: string
    itemId: string
    subitemId: string
  }
}

async function getSubitem(id: string, itemId: string, subitemId: string) {
  try {
    unstable_noStore() // Prevent caching

    await connectToDatabase()

    // Get the basic subitem info from the category collection
    const category = await Category.findOne({
      _id: id,
      "items._id": itemId,
      "items.subitems._id": subitemId,
    }).lean()

    if (!category) {
      console.error("Category not found:", id)
      return null
    }

    // Find the item and subitem in the category
    const item = category.items.find((item: any) => item._id.toString() === itemId)
    if (!item) {
      console.error("Item not found in category:", itemId)
      return null
    }

    const subitemBasic = item.subitems.find((subitem: any) => subitem._id.toString() === subitemId)
    if (!subitemBasic) {
      console.error("Subitem not found in item:", subitemId)
      return null
    }

    // Get the full subitem content from the subitems collection
    const subitemFull = await Subitem.findById(subitemId).lean()

    console.log("Retrieved subitem from database:", JSON.stringify(subitemFull, null, 2))

    // Combine the data
    return {
      ...subitemBasic,
      ...subitemFull,
      itemId,
      categoryId: id,
    }
  } catch (error) {
    console.error("Error fetching subitem:", error)
    return null
  }
}

export default async function EditSubitemPage({ params }: PageProps) {
  const [subitem, categories] = await Promise.all([
    getSubitem(params.id, params.itemId, params.subitemId),
    getCategories(),
  ])

  if (!subitem) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Subitem</h1>
      <SubitemForm subitem={subitem} categories={categories} />
    </div>
  )
}
