"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ServiceDetailBody from "@/components/service-detail-body"
import type { ServiceDetail } from "@/types/service"
import { Save, Eye, Edit } from "lucide-react"

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

interface SubitemInlineEditorProps {
  subitem?: Subitem
  categories: Category[]
}

export function SubitemInlineEditor({ subitem, categories }: SubitemInlineEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("edit")

  // Basic form data
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

  // Extended content for the service detail preview
  const [contentData, setContentData] = useState<{
    content: string
    planningTitle: string
    planningDescription: string
    planningFeatures: string
    additionalInfo: string
    additionalFeatures: string
    materialsContent: string
    designContent: string
    careContent: string
  }>({
    content:
      "Our services are tailored to meet your specific needs. We work closely with you to understand your requirements and deliver solutions that exceed your expectations.",
    planningTitle: "Our Planning Process",
    planningDescription:
      "We follow a comprehensive planning process to ensure that every aspect of your project is carefully considered and executed to perfection.",
    planningFeatures: "Initial consultation\nSite assessment\nConcept development\nImplementation",
    additionalInfo: "We pride ourselves on delivering exceptional results that exceed our clients' expectations.",
    additionalFeatures: "Customized solutions\nTransparent pricing\nTimely completion",
    materialsContent:
      "We source only the highest quality materials for our projects, ensuring durability, aesthetics, and value for money.",
    designContent:
      "Our design philosophy centers around creating solutions that reflect your needs while optimizing functionality.",
    careContent:
      "We believe in providing personalized attention to each client, taking the time to understand your unique needs and preferences.",
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

  // Generate service detail data for preview
  const generateServiceDetailData = (): ServiceDetail => {
    // Split features by newline and filter out empty lines
    const planningFeatures = contentData.planningFeatures.split("\n").filter((feature) => feature.trim() !== "")

    const additionalFeatures = contentData.additionalFeatures.split("\n").filter((feature) => feature.trim() !== "")

    return {
      id: subitem?._id || "new-subitem",
      title: formData.label,
      content: contentData.content,
      planningWork: {
        title: contentData.planningTitle,
        description: contentData.planningDescription,
        features: planningFeatures,
      },
      additionalInfo: contentData.additionalInfo,
      additionalFeatures: additionalFeatures,
      tabContent: {
        materials: {
          title: "Quality Materials",
          image: "/textile-texture-closeups.png",
          content: contentData.materialsContent,
        },
        design: {
          title: "Design Process",
          image: "/modern-living-space.png",
          content: contentData.designContent,
        },
        care: {
          title: "Personal Care",
          image: "/self-care-essentials.png",
          content: contentData.careContent,
        },
        support: {
          title: "Support",
          image: "/customer-support-team.png",
          content: "Our commitment to excellence extends beyond project completion.",
          hasForm: true,
        },
      },
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle basic form data
    if (name in formData) {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    // Handle extended content data
    else if (name in contentData) {
      setContentData((prev) => ({ ...prev, [name]: value }))
    }
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
          // In a real implementation, you would also save the extended content data
          // This would require updating your API and database schema
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : subitem?._id ? "Update Subitem" : "Create Subitem"}
          </Button>
        </div>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <p className="text-sm text-red-500">
                    No items available in this category. Please create an item first.
                  </p>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Main Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={contentData.content}
                  onChange={handleChange}
                  placeholder="Enter the main content"
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="planningTitle">Planning Section Title</Label>
                  <Input
                    id="planningTitle"
                    name="planningTitle"
                    value={contentData.planningTitle}
                    onChange={handleChange}
                    placeholder="Enter planning section title"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="planningDescription">Planning Description</Label>
                  <Textarea
                    id="planningDescription"
                    name="planningDescription"
                    value={contentData.planningDescription}
                    onChange={handleChange}
                    placeholder="Enter planning description"
                    rows={2}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="planningFeatures">Planning Features (one per line)</Label>
                <Textarea
                  id="planningFeatures"
                  name="planningFeatures"
                  value={contentData.planningFeatures}
                  onChange={handleChange}
                  placeholder="Enter planning features (one per line)"
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={contentData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Enter additional information"
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalFeatures">Additional Features (one per line)</Label>
                <Textarea
                  id="additionalFeatures"
                  name="additionalFeatures"
                  value={contentData.additionalFeatures}
                  onChange={handleChange}
                  placeholder="Enter additional features (one per line)"
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tab Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="materialsContent">Materials Tab Content</Label>
                <Textarea
                  id="materialsContent"
                  name="materialsContent"
                  value={contentData.materialsContent}
                  onChange={handleChange}
                  placeholder="Enter content for the Materials tab"
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designContent">Design Tab Content</Label>
                <Textarea
                  id="designContent"
                  name="designContent"
                  value={contentData.designContent}
                  onChange={handleChange}
                  placeholder="Enter content for the Design tab"
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="careContent">Care Tab Content</Label>
                <Textarea
                  id="careContent"
                  name="careContent"
                  value={contentData.careContent}
                  onChange={handleChange}
                  placeholder="Enter content for the Care tab"
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="border rounded-lg p-4 bg-white">
          <div className="bg-gray-100 py-4 mb-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Home</span>
                <span>/</span>
                <span>{categories.find((c) => c._id === formData.categoryId)?.name || "Category"}</span>
                <span>/</span>
                <span>{availableItems.find((i) => i._id === formData.itemId)?.label || "Item"}</span>
                <span>/</span>
                <span className="font-medium text-gray-900">{formData.label || "Subitem"}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <ServiceDetailBody serviceData={generateServiceDetailData()} />
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}
