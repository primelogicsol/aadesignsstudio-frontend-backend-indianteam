"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Trash, Plus, ChevronDown, ChevronUp, GripVertical } from "lucide-react"

interface Item {
  _id?: string
  label: string
  href: string
  subitems: Subitem[]
}

interface Subitem {
  _id?: string
  label: string
  href: string
}

interface Category {
  _id?: string
  name: string
  slug: string
  description: string
  image?: string
  items: Item[]
}

interface CategoryStructureFormProps {
  category: Category
}

export function CategoryStructureForm({ category: initialCategory }: CategoryStructureFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState<Category>(initialCategory)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  // Toggle item expansion
  const toggleItemExpansion = (itemIndex: number) => {
    const itemId = `item-${itemIndex}`
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  // Handle category field changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCategory((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from name if name field is changed and slug is empty or auto-generated
    if (name === "name" && (!category.slug || category.slug === generateSlug(category.name))) {
      setCategory((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }))
    }
  }

  // Generate slug from text
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  // Handle item changes
  const handleItemChange = (itemIndex: number, field: keyof Item, value: string) => {
    setCategory((prev) => {
      const updatedItems = [...prev.items]
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        [field]: value,
      }

      // Auto-generate href if label is changed
      if (
        field === "label" &&
        (!updatedItems[itemIndex].href ||
          updatedItems[itemIndex].href === generateItemHref(prev.slug, updatedItems[itemIndex].label))
      ) {
        updatedItems[itemIndex].href = generateItemHref(prev.slug, value)
      }

      return {
        ...prev,
        items: updatedItems,
      }
    })
  }

  // Generate item href
  const generateItemHref = (categorySlug: string, itemLabel: string) => {
    return `/${categorySlug}/${generateSlug(itemLabel)}`
  }

  // Handle subitem changes
  const handleSubitemChange = (itemIndex: number, subitemIndex: number, field: keyof Subitem, value: string) => {
    setCategory((prev) => {
      const updatedItems = [...prev.items]
      const updatedSubitems = [...updatedItems[itemIndex].subitems]

      updatedSubitems[subitemIndex] = {
        ...updatedSubitems[subitemIndex],
        [field]: value,
      }

      // Auto-generate href if label is changed
      if (field === "label") {
        const itemHref = updatedItems[itemIndex].href
        const itemSlug = itemHref.split("/").pop() || ""
        updatedSubitems[subitemIndex].href = `${itemHref}/${generateSlug(value)}`
      }

      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        subitems: updatedSubitems,
      }

      return {
        ...prev,
        items: updatedItems,
      }
    })
  }

  // Add new item
  const addItem = () => {
    setCategory((prev) => {
      const newItemLabel = `New Item ${prev.items.length + 1}`
      const newItem: Item = {
        label: newItemLabel,
        href: generateItemHref(prev.slug, newItemLabel),
        subitems: [],
      }

      return {
        ...prev,
        items: [...prev.items, newItem],
      }
    })
  }

  // Remove item
  const removeItem = (itemIndex: number) => {
    setCategory((prev) => {
      const updatedItems = [...prev.items]
      updatedItems.splice(itemIndex, 1)
      return {
        ...prev,
        items: updatedItems,
      }
    })
  }

  // Add new subitem
  const addSubitem = (itemIndex: number) => {
    setCategory((prev) => {
      const updatedItems = [...prev.items]
      const item = updatedItems[itemIndex]
      const newSubitemLabel = `New Subitem ${item.subitems.length + 1}`
      const itemSlug = item.href.split("/").pop() || ""

      const newSubitem: Subitem = {
        label: newSubitemLabel,
        href: `${item.href}/${generateSlug(newSubitemLabel)}`,
      }

      updatedItems[itemIndex] = {
        ...item,
        subitems: [...item.subitems, newSubitem],
      }

      return {
        ...prev,
        items: updatedItems,
      }
    })

    // Ensure the item is expanded when adding a subitem
    setExpandedItems((prev) => ({
      ...prev,
      [`item-${itemIndex}`]: true,
    }))
  }

  // Remove subitem
  const removeSubitem = (itemIndex: number, subitemIndex: number) => {
    setCategory((prev) => {
      const updatedItems = [...prev.items]
      const updatedSubitems = [...updatedItems[itemIndex].subitems]
      updatedSubitems.splice(subitemIndex, 1)

      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        subitems: updatedSubitems,
      }

      return {
        ...prev,
        items: updatedItems,
      }
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = category._id ? `/api/categories/${category._id}/update` : "/api/categories"
      const method = category._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to save category")
      }

      toast({
        title: category._id ? "Category updated" : "Category created",
        description: category._id
          ? "Your changes have been saved successfully."
          : "The new category has been created successfully.",
      })

      router.refresh()

      // Force a hard refresh of the page to ensure all components are updated
      setTimeout(() => {
        window.location.href = "/dashboard/categories"
      }, 1000)

      router.push("/dashboard/categories")
      router.refresh()
    } catch (error) {
      console.error("Error saving category:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "There was a problem saving the category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={category.name}
              onChange={handleCategoryChange}
              placeholder="Enter category name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={category.slug}
              onChange={handleCategoryChange}
              placeholder="enter-slug-here"
              required
              disabled={isLoading}
            />
            <p className="text-sm text-gray-500">Used in URLs. Only lowercase letters, numbers, and hyphens.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={category.description}
              onChange={handleCategoryChange}
              placeholder="Enter category description"
              rows={4}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={category.image || ""}
              onChange={handleCategoryChange}
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Items</CardTitle>
          <Button type="button" onClick={addItem} size="sm" disabled={isLoading}>
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {category.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items yet. Click "Add Item" to create your first item.
            </div>
          ) : (
            <div className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <Card key={item._id || `new-item-${itemIndex}`} className="border border-gray-200">
                  <CardHeader className="bg-gray-50 p-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-gray-400" />
                      <span className="font-medium">{item.label || `Item ${itemIndex + 1}`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="ghost" size="sm" onClick={() => toggleItemExpansion(itemIndex)}>
                        {expandedItems[`item-${itemIndex}`] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(itemIndex)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  {expandedItems[`item-${itemIndex}`] && (
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`item-${itemIndex}-label`}>Label</Label>
                        <Input
                          id={`item-${itemIndex}-label`}
                          value={item.label}
                          onChange={(e) => handleItemChange(itemIndex, "label", e.target.value)}
                          placeholder="Enter item label"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-${itemIndex}-href`}>URL Path</Label>
                        <Input
                          id={`item-${itemIndex}-href`}
                          value={item.href}
                          onChange={(e) => handleItemChange(itemIndex, "href", e.target.value)}
                          placeholder={`/${category.slug}/item-slug`}
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Subitems</h4>
                          <Button
                            type="button"
                            onClick={() => addSubitem(itemIndex)}
                            size="sm"
                            variant="outline"
                            disabled={isLoading}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Subitem
                          </Button>
                        </div>

                        {item.subitems.length === 0 ? (
                          <div className="text-center py-4 text-gray-500 text-sm">
                            No subitems yet. Click "Add Subitem" to create your first subitem.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {item.subitems.map((subitem, subitemIndex) => (
                              <div
                                key={subitem._id || `new-subitem-${subitemIndex}`}
                                className="border border-gray-200 rounded-md p-4 bg-gray-50"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <GripVertical className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm font-medium">
                                      {subitem.label || `Subitem ${subitemIndex + 1}`}
                                    </span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSubitem(itemIndex, subitemIndex)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`subitem-${itemIndex}-${subitemIndex}-label`} className="text-xs">
                                      Label
                                    </Label>
                                    <Input
                                      id={`subitem-${itemIndex}-${subitemIndex}-label`}
                                      value={subitem.label}
                                      onChange={(e) =>
                                        handleSubitemChange(itemIndex, subitemIndex, "label", e.target.value)
                                      }
                                      placeholder="Enter subitem label"
                                      required
                                      disabled={isLoading}
                                      className="h-8 text-sm"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`subitem-${itemIndex}-${subitemIndex}-href`} className="text-xs">
                                      URL Path
                                    </Label>
                                    <Input
                                      id={`subitem-${itemIndex}-${subitemIndex}-href`}
                                      value={subitem.href}
                                      onChange={(e) =>
                                        handleSubitemChange(itemIndex, subitemIndex, "href", e.target.value)
                                      }
                                      placeholder={`${item.href}/subitem-slug`}
                                      required
                                      disabled={isLoading}
                                      className="h-8 text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : category._id ? "Update Category" : "Create Category"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/categories")}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
