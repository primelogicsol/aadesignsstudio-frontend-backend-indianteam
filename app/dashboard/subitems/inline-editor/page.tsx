import { SubitemInlineEditor } from "@/components/dashboard/subitem-inline-editor"
import { getCategories } from "@/lib/get-categories"
import { unstable_noStore } from "next/cache"

export default async function NewSubitemInlineEditorPage() {
  unstable_noStore() // Prevent caching
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create Subitem with Live Preview</h1>
      <SubitemInlineEditor categories={categories} />
    </div>
  )
}
