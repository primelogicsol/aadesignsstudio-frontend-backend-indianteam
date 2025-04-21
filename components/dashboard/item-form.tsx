"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Category {
  _id: string
  name: string
  slug: string
}

interface Item {
  _id?: string
  label: string
  href: string
  categoryId: string
}

interface ItemFormProps {
  item?: Item
  categories: Category[]
}

export function ItemForm({ item, categories }: ItemFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<{
    label: string
    href: string
    categoryId: string
  }>({
    label: item?.label || "",
    href: item?.href || "",
    categoryId: item?.categoryId || categories[0]?._id || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, categoryId: value }))

    // Update href if it's empty or when changing category
    if (!formData.href || formData.href.startsWith("/")) {
      const selectedCategory = categories.find((cat) => cat._id === value)
      if (selectedCategory) {
        const slug = formData.label
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
        setFormData((prev) => ({
          ...prev,
          href: `/${selectedCategory.slug}/${slug}`,
        }))
      }
    }
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value
    setFormData((prev) => ({ ...prev, label }))

    // Auto-generate href if it's empty
    if (!formData.href || formData.href.startsWith("/")) {
      const selectedCategory = categories.find((cat) => cat._id === formData.categoryId)
      if (selectedCategory) {
        const slug = label
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
        setFormData((prev) => ({
          ...prev,
          href: `/${selectedCategory.slug}/${slug}`,
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Use the correct API path with [id] instead of [categoryId]
      const url = item?._id
        ? `/api/categories/${formData.categoryId}/items/${item._id}`
        : `/api/categories/${formData.categoryId}/items`

      const method = item?._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: formData.label,
          href: formData.href,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save item")
      }

      toast({
        title: item?._id ? "Item updated" : "Item created",
        description: item?._id
          ? "Your changes have been saved successfully."
          : "The new item has been created successfully.",
      })

      router.push("/dashboard/items")
      router.refresh()
    } catch (error) {
      console.error("Error saving item:", error)
      toast({
        title: "Error",
        description: "There was a problem saving the item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <Select value={formData.categoryId} onValueChange={handleCategoryChange} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              name="label"
              value={formData.label}
              onChange={handleLabelChange}
              placeholder="Enter item label"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="href">URL Path</Label>
            <Input
              id="href"
              name="href"
              value={formData.href}
              onChange={handleChange}
              placeholder="/category-slug/item-slug"
              required
              disabled={isLoading}
            />
            <p className="text-sm text-gray-500">The URL path for this item. Should start with a slash.</p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : item?._id ? "Update Item" : "Create Item"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/items")}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
