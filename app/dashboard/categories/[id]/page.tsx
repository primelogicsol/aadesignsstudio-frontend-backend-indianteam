import { notFound } from "next/navigation"
import { CategoryForm } from "@/components/dashboard/category-form"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"

interface PageProps {
  params: {
    id: string
  }
}

async function getCategory(id: string) {
  try {
    await connectToDatabase()
    const category = await Category.findById(id).lean()

    if (!category) {
      return null
    }

    return JSON.parse(JSON.stringify(category))
  } catch (error) {
    console.error("Error fetching category:", error)
    return null
  }
}

export default async function EditCategoryPage({ params }: PageProps) {
  const category = await getCategory(params.id)

  if (!category) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  )
}
