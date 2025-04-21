import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, List, Tag, Users, Settings } from "lucide-react"
import Link from "next/link"
import { getCategories } from "@/lib/get-categories"
import { unstable_noStore } from "next/cache"

export default async function DashboardPage() {
  // Prevent caching
  unstable_noStore()

  const categories = await getCategories()

  // Count items and subitems
  let itemCount = 0
  let subitemCount = 0

  categories.forEach((category) => {
    if (category.items) {
      itemCount += category.items.length

      category.items.forEach((item) => {
        if (item.subitems) {
          subitemCount += item.subitems.length
        }
      })
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Categories"
          value={categories.length}
          description="Total categories"
          icon={Layers}
          href="/dashboard/categories"
        />
        <DashboardCard title="Items" value={itemCount} description="Total items" icon={List} href="/dashboard/items" />
        <DashboardCard
          title="Subitems"
          value={subitemCount}
          description="Total subitems"
          icon={Tag}
          href="/dashboard/subitems"
        />
        <DashboardCard title="Tasks" value={0} description="Total tasks" icon={Users} href="/tasks" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes to your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.slice(0, 5).map((category) => (
                <div key={category._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.items?.length || 0} items</p>
                  </div>
                </div>
              ))}

              {categories.length === 0 && <p className="text-gray-500 text-center py-4">No categories found</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/dashboard/categories/new"
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-md flex flex-col items-center justify-center text-center transition-colors"
              >
                <Layers className="h-8 w-8 text-blue-600 mb-2" />
                <span className="font-medium">Add Category</span>
              </Link>
              <Link
                href="/dashboard/items/new"
                className="p-4 bg-green-50 hover:bg-green-100 rounded-md flex flex-col items-center justify-center text-center transition-colors"
              >
                <List className="h-8 w-8 text-green-600 mb-2" />
                <span className="font-medium">Add Item</span>
              </Link>
              <Link
                href="/dashboard/subitems/new"
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-md flex flex-col items-center justify-center text-center transition-colors"
              >
                <Tag className="h-8 w-8 text-purple-600 mb-2" />
                <span className="font-medium">Add Subitem</span>
              </Link>
              <Link
                href="/dashboard/settings"
                className="p-4 bg-gray-50 hover:bg-gray-100 rounded-md flex flex-col items-center justify-center text-center transition-colors"
              >
                <Settings className="h-8 w-8 text-gray-600 mb-2" />
                <span className="font-medium">Settings</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  href,
}: {
  title: string
  value: number
  description: string
  icon: React.ElementType
  href: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
        <Link href={href} className="text-xs text-blue-600 hover:underline mt-2 inline-block">
          View all
        </Link>
      </CardContent>
    </Card>
  )
}
