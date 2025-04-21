import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories } from "@/lib/get-categories"
import { Plus, PenTool } from "lucide-react"
import { SubitemTable } from "@/components/dashboard/subitem-table"
import { unstable_noStore } from "next/cache"

export default async function SubitemsPage() {
  unstable_noStore() // Prevent caching

  const categories = await getCategories()

  // Extract all subitems from all categories and items
  const subitems = categories.flatMap((category) =>
    (category.items || []).flatMap((item) =>
      (item.subitems || []).map((subitem) => ({
        ...subitem,
        itemId: item._id,
        itemLabel: item.label,
        categoryId: category._id,
        categoryName: category.name,
      })),
    ),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subitems</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/subitems/new">
              <Plus className="mr-2 h-4 w-4" /> Add Subitem
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/subitems/wysiwyg-editor">
              <PenTool className="mr-2 h-4 w-4" /> WYSIWYG Editor
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Subitems</CardTitle>
          <CardDescription>Manage subitems across all categories and items</CardDescription>
        </CardHeader>
        <CardContent>
          <SubitemTable subitems={subitems} categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
