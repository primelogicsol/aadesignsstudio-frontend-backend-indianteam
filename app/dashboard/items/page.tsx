import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories } from "@/lib/get-categories"
import { Plus } from "lucide-react"
import { ItemTable } from "@/components/dashboard/item-table"

export default async function ItemsPage() {
  const categories = await getCategories()

  // Extract all items from all categories
  const items = categories.flatMap((category) =>
    (category.items || []).map((item) => ({
      ...item,
      categoryId: category._id,
      categoryName: category.name,
      categorySlug: category.slug,
    })),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Items</h1>
        <Button asChild>
          <Link href="/dashboard/items/new">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Items</CardTitle>
          <CardDescription>Manage items across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ItemTable items={items} categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
