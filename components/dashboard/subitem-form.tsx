"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  items: Array<{
    _id: string
    label: string
    href: string
  }>
}

interface Subitem {
  _id?: string
  label: string
  href: string
  categoryId: string
  itemId: string
}

interface SubitemFormProps {
  subitem?: Subitem
  categories: Category[]
}

export function SubitemForm({ subitem, categories }: SubitemFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<{
    label: string
    href: string
    categoryId: string
    itemId: string
  }>({
    label: subitem?.label || "",
    href: subitem?.href || "",
    categoryId: subitem?.categoryId || categories[0]?._id || "",
    itemId: subitem?.itemId || "",
  })

  const [availableItems, setAvailableItems] = useState<Array<{ _id: string; label: string }>>([])

  // Update available items when category changes
  useEffect(() => {
    const selectedCategory = categories.find((cat) => cat._id === formData.categoryId)
    if (selectedCategory) {
      setAvailableItems(selectedCategory.items || [])

      // If no item is selected or the selected item doesn't belong to this category,
      // select the first item from this category
      if (!formData.itemId || !selectedCategory.items.some((item) => item._id === formData.itemId)) {
        setFormData((prev) => ({
          ...prev,
          itemId: selectedCategory.items[0]?._id || "",
        }))
      }
    } else {
      setAvailableItems([])
    }
  }, [formData.categoryId, categories])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, categoryId: value }))
  }

  const handleItemChange = (value: string) => {
    setFormData((prev) => ({ ...prev, itemId: value }))

    // Update href if it's empty or when changing item
    if (!formData.href || formData.href.startsWith("/")) {
      const selectedCategory = categories.find((cat) => cat._id === formData.categoryId)
      const selectedItem = selectedCategory?.items.find((item) => item._id === value)

      if (selectedCategory && selectedItem) {
        const slug = formData.label
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
        const itemSlug = selectedItem.href.split("/").pop() || ""
        setFormData((prev) => ({
          ...prev,
          href: `/${selectedCategory.slug}/${itemSlug}/${slug}`,
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
      const selectedItem = selectedCategory?.items.find((item) => item._id === formData.itemId)

      if (selectedCategory && selectedItem) {
        const slug = label
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
        const itemSlug = selectedItem.href.split("/").pop() || ""
        setFormData((prev) => ({
          ...prev,
          href: `/${selectedCategory.slug}/${itemSlug}/${slug}`,
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Use the correct API path with [id] instead of [categoryId]
      const url = subitem?._id
        ? `/api/categories/${formData.categoryId}/items/${formData.itemId}/subitems/${subitem._id}`
        : `/api/categories/${formData.categoryId}/items/${formData.itemId}/subitems`

      const method = subitem?._id ? "PUT" : "POST"

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
        throw new Error("Failed to save subitem")
      }

      toast({
        title: subitem?._id ? "Subitem updated" : "Subitem created",
        description: subitem?._id
          ? "Your changes have been saved successfully."
          : "The new subitem has been created successfully.",
      })

      router.push("/dashboard/subitems")
      router.refresh()
    } catch (error) {
      console.error("Error saving subitem:", error)
      toast({
        title: "Error",
        description: "There was a problem saving the subitem. Please try again.",
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
            <Label htmlFor="itemId">Parent Item</Label>
            <Select
              value={formData.itemId}
              onValueChange={handleItemChange}
              disabled={isLoading || availableItems.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a parent item" />
              </SelectTrigger>
              <SelectContent>
                {availableItems.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {availableItems.length === 0 && (
              <p className="text-sm text-red-500">No items available in this category. Please create an item first.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              name="label"
              value={formData.label}
              onChange={handleLabelChange}
              placeholder="Enter subitem label"
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
              placeholder="/category-slug/item-slug/subitem-slug"
              required
              disabled={isLoading}
            />
            <p className="text-sm text-gray-500">The URL path for this subitem. Should start with a slash.</p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading || availableItems.length === 0}>
              {isLoading ? "Saving..." : subitem?._id ? "Update Subitem" : "Create Subitem"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/subitems")}
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
