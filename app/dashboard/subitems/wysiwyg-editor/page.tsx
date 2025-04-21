import { SubitemWysiwygEditor } from "@/components/dashboard/subitem-wysiwyg-editor"
import { getCategories } from "@/lib/get-categories"
import { unstable_noStore } from "next/cache"

export default async function NewSubitemWysiwygEditorPage() {
  unstable_noStore() // Prevent caching
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create Subitem with WYSIWYG Editor</h1>
      <SubitemWysiwygEditor categories={categories} />
    </div>
  )
}
