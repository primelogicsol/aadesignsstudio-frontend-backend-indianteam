import { SubitemForm } from "@/components/dashboard/subitem-form"
import { getCategories } from "@/lib/get-categories"

export default async function NewSubitemPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Subitem</h1>
      <SubitemForm categories={categories} />
    </div>
  )
}
