import { notFound } from "next/navigation"
import { ItemForm } from "@/components/dashboard/item-form"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import { getCategories } from "@/lib/get-categories"

interface PageProps {
  params: {
    id: string
    itemId: string
  }
}

async function getItem(id: string, itemId: string) {
  try {
    await connectToDatabase()
    const category = await Category.findById(id).lean()

    if (!category) {
      return null
    }

    const item = category.items.find((item: any) => item._id.toString() === itemId)

    if (!item) {
      return null
    }

    return {
      ...JSON.parse(JSON.stringify(item)),
      categoryId: id,
    }
  } catch (error) {
    console.error("Error fetching item:", error)
    return null
  }
}

export default async function EditItemPage({ params }: PageProps) {
  const [item, categories] = await Promise.all([getItem(params.id, params.itemId), getCategories()])

  if (!item) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Item</h1>
      <ItemForm item={item} categories={categories} />
    </div>
  )
}
