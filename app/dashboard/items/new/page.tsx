import { ItemForm } from "@/components/dashboard/item-form"
import { getCategories } from "@/lib/get-categories"

export default async function NewItemPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Item</h1>
      <ItemForm categories={categories} />
    </div>
  )
}
