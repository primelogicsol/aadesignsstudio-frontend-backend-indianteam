"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Search, Download, FileText, Phone, Save, Edit, Plus, Minus, Bug } from "lucide-react"
import { serviceCategories } from "@/types/service"
import styles from "@/components/service-detail.module.css"

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

// Updated interface to match the exact database structure
interface Subitem {
  _id?: string
  label: string
  href: string
  categoryId: string
  itemId: string
  status?: string
  content?: {
    title?: string
    description?: string
  }
  planningWork?: {
    title?: string
    description?: string
    features?: string[]
    status?: string
  }
  additionalInfo?: string
  additionalFeatures?: string[]
  tabContent?: {
    materials?: {
      title?: string
      content?: string
    }
    design?: {
      title?: string
      content?: string
    }
    care?: {
      title?: string
      content?: string
    }
    support?: {
      title?: string
      content?: string
    }
  }
  createdAt?: string
  updatedAt?: string
}

interface SubitemWysiwygEditorProps {
  subitem?: Subitem
  categories: Category[]
}

// Helper component for labels
const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium">
    {children}
  </label>
)

export function SubitemWysiwygEditor({ subitem, categories }: SubitemWysiwygEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const controlsRef = useRef<HTMLDivElement>(null)
  const [dataInitialized, setDataInitialized] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  // Basic form data
  const [formData, setFormData] = useState<{
    label: string
    href: string
    categoryId: string
    itemId: string
    status: string
  }>({
    label: "",
    href: "",
    categoryId: categories[0]?._id || "",
    itemId: "",
    status: "draft",
  })

  // Extended content for the service detail
  const [contentData, setContentData] = useState<{
    title: string
    content: string
    planningTitle: string
    planningDescription: string
    planningFeatures: string[]
    planningStatus: string
    planningImage:string
    additionalInfo: string
    additionalFeatures: string[]
    materialsTabTitle: string
    materialsContent: string
    materialsImage: string
    designTabTitle: string
    designContent: string
    designImage: string
    careTabTitle: string
    careContent: string
    careImage: string
    supportTabTitle: string
    supportContent: string
    supportImage: string
    coverImage: string
    activeTab: string
  }>({
    title: "",
    content: "",
    planningTitle: "",
    planningDescription: "",
    planningFeatures: [],
    planningStatus: "draft",
    planningImage:'/PlanningImage.jpg',
    additionalInfo: "",
    additionalFeatures: [],
    materialsTabTitle: "",
    materialsContent: "",
    materialsImage: "/textile-texture-closeups.png",
    designTabTitle: "",
    designContent: "",
    designImage: "/modern-living-space.png",
    careTabTitle: "",
    careContent: "",
    careImage: "/self-care-essentials.png",
    supportTabTitle: "",
    supportContent: "",
    supportImage: "/customer-support-team.png",
    coverImage: "/customer-support-team.png",
    activeTab: "materials",
  })

  const [availableItems, setAvailableItems] = useState<Array<{ _id: string; label: string }>>([])
  const [editingField, setEditingField] = useState<string | null>(null)

  // Initialize form data from subitem prop when it's available
  useEffect(() => {
    if (subitem && !dataInitialized) {
      console.log("Initializing form data from subitem")

      // Set basic form data
      setFormData({
        label: subitem.label || "",
        href: subitem.href || "",
        categoryId: subitem.categoryId || categories[0]?._id || "",
        itemId: subitem.itemId || "",
        status: subitem.status || "draft",
      })

      // Set extended content data - carefully extract all fields from the database structure
      setContentData({
        title: subitem.content?.title || "",
        content: subitem.content?.description || "",
        planningTitle: subitem.planningWork?.title || "",
        planningDescription: subitem.planningWork?.description || "",
        planningFeatures: subitem.planningWork?.features || [],
        planningStatus: subitem.planningWork?.status || "draft",
        planningImage:subitem.planningImage || "/PlanningImage.jpg",
        additionalInfo: subitem.additionalInfo || "",
        additionalFeatures: subitem.additionalFeatures || [],
        materialsTabTitle: subitem.tabContent?.materials?.title || "",
        materialsContent: subitem.tabContent?.materials?.content || "",
        materialsImage: subitem.tabContent?.materials?.image || "/textile-texture-closeups.png",
        designTabTitle: subitem.tabContent?.design?.title || "",
        designContent: subitem.tabContent?.design?.content || "",
        designImage: subitem.tabContent?.design?.image || "/modern-living-space.png",
        careTabTitle: subitem.tabContent?.care?.title || "",
        careContent: subitem.tabContent?.care?.content || "",
        careImage: subitem.tabContent?.care?.image || "/self-care-essentials.png",
        supportTabTitle: subitem.tabContent?.support?.title || "",
        supportContent: subitem.tabContent?.support?.content || "",
        supportImage: subitem.tabContent?.support?.image || "/customer-support-team.png",
        coverImage: subitem.coverImage || "/customer-support-team.png",
        activeTab: "materials",
      })

      setDataInitialized(true)
    }
  }, [subitem, categories, dataInitialized])

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

  // Handle click outside of controls
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (controlsRef.current && !controlsRef.current.contains(event.target as Node)) {
        setShowControls(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
    updateHrefFromSelection(value, formData.label)
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value
    setFormData((prev) => ({ ...prev, label }))
    updateHrefFromSelection(formData.itemId, label)
  }

  // Helper function to update href based on category, item and label
  const updateHrefFromSelection = (itemId: string, label: string) => {
    // Auto-generate href if it's empty or starts with /
    if (!formData.href || formData.href.startsWith("/")) {
      const selectedCategory = categories.find((cat) => cat._id === formData.categoryId)
      const selectedItem = selectedCategory?.items.find((item) => item._id === itemId)

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

  const handleTabChange = (tab: string) => {
    setContentData((prev) => ({ ...prev, activeTab: tab }))
  }

  const handleEditableChange = (field: string, value: string) => {
    setContentData((prev) => ({ ...prev, [field]: value }))
    setEditingField(null)
  }

  const handleFeatureChange = (index: number, value: string, field: "planningFeatures" | "additionalFeatures") => {
    setContentData((prev) => {
      const features = [...prev[field]]
      features[index] = value
      return { ...prev, [field]: features }
    })
  }

  const addFeature = (field: "planningFeatures" | "additionalFeatures") => {
    setContentData((prev) => {
      const features = [...prev[field], "New feature"]
      return { ...prev, [field]: features }
    })
  }

  const removeFeature = (index: number, field: "planningFeatures" | "additionalFeatures") => {
    setContentData((prev) => {
      const features = [...prev[field]]
      features.splice(index, 1)
      return { ...prev, [field]: features }
    })
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

      // Prepare data in the exact format expected by the database
      const submitData = {
        label: formData.label,
        href: formData.href,
        status: formData.status,
        // Include extended content data
        content: {
          title: contentData.title || formData.label,
          description: contentData.content,
        },
        planningWork: {
          title: contentData.planningTitle,
          description: contentData.planningDescription,
          features: contentData.planningFeatures,
          status: contentData.planningStatus,
        },
        planningImage:contentData.planningImage,
        additionalInfo: contentData.additionalInfo,
        additionalFeatures: contentData.additionalFeatures,
        tabContent: {
          materials: {
            title: contentData.materialsTabTitle,
            content: contentData.materialsContent,
            image: contentData.materialsImage,
          },
          design: {
            title: contentData.designTabTitle,
            content: contentData.designContent,
            image: contentData.designImage,
          },
          care: {
            title: contentData.careTabTitle,
            content: contentData.careContent,
            image: contentData.careImage,
          },
          support: {
            title: contentData.supportTabTitle,
            content: contentData.supportContent,
            image: contentData.supportImage,
          },
        },
        coverImage: contentData.coverImage,
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Server error response:", errorData)
        throw new Error(`Failed to save subitem: ${response.status} ${response.statusText}`)
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
        description: `There was a problem saving the subitem: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Editable component for inline editing - FIXED to avoid invalid HTML nesting
  const EditableField = ({
    value,
    field,
    multiline = false,
    className = "",
  }: {
    value: string
    field: string
    multiline?: boolean
    className?: string
  }) => {
    const [editValue, setEditValue] = useState(value)

    // Update edit value when the source value changes
    useEffect(() => {
      setEditValue(value)
    }, [value])

    if (editingField === field) {
      return multiline ? (
        <span className="relative block">
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-2 border border-blue-400 rounded"
            autoFocus
          />
          <span className="absolute right-2 bottom-2 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingField(null)}
              className="bg-white text-gray-700"
            >
              Cancel
            </Button>
            <Button size="sm" onClick={() => handleEditableChange(field, editValue)} className="bg-blue-600">
              Save
            </Button>
          </span>
        </span>
      ) : (
        <span className="relative block">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-2 border border-blue-400 rounded"
            autoFocus
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingField(null)}
              className="bg-white text-gray-700"
            >
              Cancel
            </Button>
            <Button size="sm" onClick={() => handleEditableChange(field, editValue)} className="bg-blue-600">
              Save
            </Button>
          </span>
        </span>
      )
    }

    return (
      <span
        className={`relative group cursor-pointer ${className}`}
        onClick={() => setEditingField(field)}
        role="button"
        tabIndex={0}
      >
        {value || <span className="text-gray-400 italic">Click to add content</span>}
        <span className="absolute inset-0 bg-blue-500 bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Edit className="h-4 w-4 text-blue-600" />
        </span>
      </span>
    )
  }

  // Editable list for features - FIXED to avoid invalid HTML nesting
  const EditableFeatureList = ({
    features,
    field,
  }: {
    features: string[]
    field: "planningFeatures" | "additionalFeatures"
  }) => {
    return (
      <ul className="space-y-2">
        {features && features.length > 0 ? (
          features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={styles.icon}>
                <Check size={12} />
              </span>
              <span className="flex-1 relative group">
                {editingField === `${field}-${index}` ? (
                  <span className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value, field)}
                      className="flex-1 p-1 text-sm border border-blue-400 rounded"
                      autoFocus
                      onBlur={() => setEditingField(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditingField(null)
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFeature(index, field)}
                      className="h-6 w-6 p-0 text-red-500"
                    >
                      <Minus size={14} />
                    </Button>
                  </span>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => setEditingField(`${field}-${index}`)}
                    role="button"
                    tabIndex={0}
                  >
                    {feature}
                    <span className="absolute inset-0 bg-blue-500 bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </span>
                )}
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-400 italic">No features added yet</li>
        )}
        <li>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addFeature(field)}
            className="flex items-center gap-1 text-xs mt-2"
          >
            <Plus size={12} /> Add Feature
          </Button>
        </li>
      </ul>
    )
  }

  // Debug panel to show raw data
  const DebugPanel = () => (
    <div className="fixed bottom-4 right-4 z-40 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md max-h-96 overflow-auto">
      <h3 className="font-bold mb-2">Debug: Current Data</h3>
      <div className="text-xs font-mono whitespace-pre-wrap">
        <div className="mb-2">
          <strong>Form Data:</strong>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
        <div>
          <strong>Content Data:</strong>
          <pre>{JSON.stringify(contentData, null, 2)}</pre>
        </div>
      </div>
    </div>
  )

  // Add a new component for editable images
  const EditableImage = ({
    src,
    alt,
    field,
    width = 400,
    height = 300,
    className = "",
  }: {
    src: string
    alt: string
    field: string
    width?: number
    height?: number
    className?: string
  }) => {
    const [imageUrl, setImageUrl] = useState(src || "")
    const [inputUrl, setInputUrl] = useState(src || "")
    const [imageError, setImageError] = useState(false)

    // Update image URL when the source changes
    useEffect(() => {
      setImageUrl(src || "")
      setInputUrl(src || "")
      setImageError(false)
    }, [src])

    const handleApplyUrl = () => {
      setImageUrl(inputUrl)
      setImageError(false)
      // Also update in the parent component's state
      setContentData((prev) => ({ ...prev, [field]: inputUrl }))
    }

    const handleImageError = () => {
      setImageError(true)
    }

    return (
      <div className="space-y-2">
        {/* Always visible URL input and apply button */}
        <div className="flex gap-2">
          <Input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1"
          />
          <Button onClick={handleApplyUrl} variant="secondary" className="whitespace-nowrap">
            Apply URL
          </Button>
        </div>

        {/* Image container with border */}
        <div className="relative border border-dashed border-gray-300 rounded-md overflow-hidden">
          {imageUrl && !imageError ? (
            // Try to display the image if URL exists and no error
            <div className="relative w-full" style={{ minHeight: "200px" }}>
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={alt}
                width={width}
                height={height}
                className={`w-full h-auto ${className}`}
                onError={handleImageError}
              />
            </div>
          ) : (
            // Show placeholder if no image URL or if image failed to load
            <div
              className="flex items-center justify-center bg-gray-100 w-full"
              style={{ height: `${height}px`, minHeight: "200px" }}
            >
              <div className="text-center p-4">
                <div className="text-gray-400 mb-2">{imageError ? "Image failed to load" : "No image available"}</div>
                <p className="text-sm text-gray-500">Enter a URL above and click "Apply URL" to add an image</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Floating controls panel */}
      <div
        ref={controlsRef}
        className={`fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 transition-opacity ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Page Settings</h3>
          <Button size="sm" variant="ghost" onClick={() => setShowControls(false)}>
            ×
          </Button>
        </div>

        <div className="space-y-4">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : subitem?._id ? "Update Subitem" : "Create Subitem"}
          </Button>
        </div>
      </div>

      {/* Settings button */}
      <div className="fixed top-4 right-4 z-40">
        <Button onClick={() => setShowControls(true)} className="flex items-center gap-2">
          <Edit className="h-4 w-4" /> Page Settings
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 mb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span>{categories.find((c) => c._id === formData.categoryId)?.name || "Category"}</span>
            <span>/</span>
            <span>{availableItems.find((i) => i._id === formData.itemId)?.label || "Item"}</span>
            <span>/</span>
            <span className="font-medium text-gray-900">
              <EditableField value={formData.label || "Subitem"} field="label" />
            </span>
          </div>
        </div>
      </div>

      {/* WYSIWYG Editor - Service Detail Body */}
      <section className={styles.servicesDetailsPage}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="w-full lg:w-7/12">
              <div className={styles.servicesDetailsContent}>
                {/* Main Image */}
                <div className={styles.servicesDetailsImg1}>
                  <EditableImage
                    src={contentData.coverImage}
                    alt={formData.label}
                    field="coverImage"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>

                {/* Text Box 1 */}
                <div className={styles.servicesDetailsTextBox1}>
                  <div className={styles.title}>
                    <h2>
                      <EditableField value={contentData.title || formData.label} field="title" />
                    </h2>
                  </div>
                  {/* Fixed: Using span instead of div inside p */}
                  <span className={styles.text1}>
                    <EditableField value={contentData.content} field="content" multiline={true} />
                  </span>
                </div>

                {/* Text Box 2 - Planning Work */}
                <div className={styles.servicesDetailsTextBox2}>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-5/12">
                      <div className={styles.servicesDetailsTextBox2Img}>
                        <EditableImage
                          src={contentData.planningImage}
                          alt={formData.label}
                          field="planningImage"
                          width={400}
                          height={300}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-7/12">
                      <div className={styles.servicesDetailsTextBox2Content}>
                        <div className={styles.title}>
                          <h2>
                            <EditableField value={contentData.planningTitle} field="planningTitle" />
                          </h2>
                        </div>
                        <div className={styles.text}>
                          {/* Fixed: Using span instead of p > div */}
                          <span className="block">
                            <EditableField
                              value={contentData.planningDescription}
                              field="planningDescription"
                              multiline={true}
                            />
                          </span>
                        </div>
                        <EditableFeatureList features={contentData.planningFeatures} field="planningFeatures" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab Box */}
                <div className={styles.servicesDetailsTabBox}>
                  <div className="w-full">
                    <div className={styles.servicesDetailsTab}>
                      <div className={styles.servicesDetailsTabButton}>
                        <ul>
                          <li
                            className={contentData.activeTab === "materials" ? styles.activeBtn : ""}
                            onClick={() => handleTabChange("materials")}
                          >
                            <h4>
                              {editingField === "materialsTabTitle" ? (
                                <span onClick={(e) => e.stopPropagation()}>
                                  <Input
                                    value={contentData.materialsTabTitle}
                                    onChange={(e) =>
                                      setContentData((prev) => ({ ...prev, materialsTabTitle: e.target.value }))
                                    }
                                    className="p-1 text-sm border border-blue-400 rounded"
                                    autoFocus
                                    onBlur={() => setEditingField(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        setEditingField(null)
                                      }
                                    }}
                                  />
                                </span>
                              ) : (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditingField("materialsTabTitle")
                                  }}
                                  className="cursor-pointer hover:text-blue-600"
                                >
                                  {contentData.materialsTabTitle || "Materials"}
                                </span>
                              )}
                            </h4>
                          </li>
                          <li
                            className={contentData.activeTab === "design" ? styles.activeBtn : ""}
                            onClick={() => handleTabChange("design")}
                          >
                            <h4>
                              {editingField === "designTabTitle" ? (
                                <span onClick={(e) => e.stopPropagation()}>
                                  <Input
                                    value={contentData.designTabTitle}
                                    onChange={(e) =>
                                      setContentData((prev) => ({
                                        ...prev,
                                        designTabTitle: e.target.value,
                                      }))
                                    }
                                    className="p-1 text-sm border border-blue-400 rounded"
                                    autoFocus
                                    onBlur={() => setEditingField(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        setEditingField(null)
                                      }
                                    }}
                                  />
                                </span>
                              ) : (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditingField("designTabTitle")
                                  }}
                                  className="cursor-pointer hover:text-blue-600"
                                >
                                  {contentData.designTabTitle || "Design"}
                                </span>
                              )}
                            </h4>
                          </li>
                          <li
                            className={contentData.activeTab === "care" ? styles.activeBtn : ""}
                            onClick={() => handleTabChange("care")}
                          >
                            <h4>
                              {editingField === "careTabTitle" ? (
                                <span onClick={(e) => e.stopPropagation()}>
                                  <Input
                                    value={contentData.careTabTitle}
                                    onChange={(e) =>
                                      setContentData((prev) => ({ ...prev, careTabTitle: e.target.value }))
                                    }
                                    className="p-1 text-sm border border-blue-400 rounded"
                                    autoFocus
                                    onBlur={() => setEditingField(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        setEditingField(null)
                                      }
                                    }}
                                  />
                                </span>
                              ) : (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditingField("careTabTitle")
                                  }}
                                  className="cursor-pointer hover:text-blue-600"
                                >
                                  {contentData.careTabTitle || "Care"}
                                </span>
                              )}
                            </h4>
                          </li>
                          <li
                            className={contentData.activeTab === "support" ? styles.activeBtn : ""}
                            onClick={() => handleTabChange("support")}
                          >
                            <h4>
                              {editingField === "supportTabTitle" ? (
                                <span onClick={(e) => e.stopPropagation()}>
                                  <Input
                                    value={contentData.supportTabTitle}
                                    onChange={(e) =>
                                      setContentData((prev) => ({ ...prev, supportTabTitle: e.target.value }))
                                    }
                                    className="p-1 text-sm border border-blue-400 rounded"
                                    autoFocus
                                    onBlur={() => setEditingField(null)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        setEditingField(null)
                                      }
                                    }}
                                  />
                                </span>
                              ) : (
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditingField("supportTabTitle")
                                  }}
                                  className="cursor-pointer hover:text-blue-600"
                                >
                                  {contentData.supportTabTitle || "Support"}
                                </span>
                              )}
                            </h4>
                          </li>
                        </ul>
                      </div>

                      <div className={styles.tabsContent}>
                        {/* Materials Tab */}
                        <div
                          className={`${styles.tab} ${contentData.activeTab === "materials" ? styles.activeTab : ""}`}
                          id="materials"
                        >
                          <div className={styles.servicesDetailsTabContentItem}>
                            <div className={styles.qualityMaterialsTabBox}>
                              <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-6/12">
                                  <div className={styles.qualityMaterialsTabBoxImg}>
                                    <EditableImage
                                      src={contentData.materialsImage}
                                      alt="Quality Materials"
                                      field="materialsImage"
                                      width={400}
                                      height={300}
                                      className="w-full h-auto"
                                    />
                                  </div>
                                </div>
                                <div className="w-full md:w-6/12">
                                  <div className={styles.qualityMaterialsTabBoxContent}>
                                    {/* Fixed: Using span instead of div inside p */}
                                    <span className={styles.text1}>
                                      <EditableField
                                        value={contentData.materialsContent}
                                        field="materialsContent"
                                        multiline={true}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Design Tab */}
                        <div
                          className={`${styles.tab} ${contentData.activeTab === "design" ? styles.activeTab : ""}`}
                          id="design"
                        >
                          <div className={styles.servicesDetailsTabContentItem}>
                            <div className={styles.interiorDesignTabBox}>
                              <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-6/12">
                                  <div className={styles.interiorDesignTabBoxImg}>
                                    <EditableImage
                                      src={contentData.designImage}
                                      alt="Interior Design"
                                      field="designImage"
                                      width={400}
                                      height={300}
                                      className="w-full h-auto"
                                    />
                                  </div>
                                </div>
                                <div className="w-full md:w-6/12">
                                  <div className={styles.interiorDesignTabBoxContent}>
                                    {/* Fixed: Using span instead of div inside p */}
                                    <span className={styles.text1}>
                                      <EditableField
                                        value={contentData.designContent}
                                        field="designContent"
                                        multiline={true}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Care Tab */}
                        <div
                          className={`${styles.tab} ${contentData.activeTab === "care" ? styles.activeTab : ""}`}
                          id="care"
                        >
                          <div className={styles.servicesDetailsTabContentItem}>
                            <div className={styles.personalCareTabBox}>
                              <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-6/12">
                                  <div className={styles.personalCareTabBoxImg}>
                                    <EditableImage
                                      src={contentData.careImage}
                                      alt="Personal Care"
                                      field="careImage"
                                      width={400}
                                      height={300}
                                      className="w-full h-auto"
                                    />
                                  </div>
                                </div>
                                <div className="w-full md:w-6/12">
                                  <div className={styles.personalCareTabBoxContent}>
                                    {/* Fixed: Using span instead of div inside p */}
                                    <span className={styles.text1}>
                                      <EditableField
                                        value={contentData.careContent}
                                        field="careContent"
                                        multiline={true}
                                      />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Support Tab */}
                        <div
                          className={`${styles.tab} ${contentData.activeTab === "support" ? styles.activeTab : ""}`}
                          id="support"
                        >
                          <div className={styles.servicesDetailsTabContentItem}>
                            <div className={styles.superSupportTabBox}>
                              <div className="w-full">
                                <div className={styles.superSupportTabBoxForm}>
                                  <form className="comment-one__form contact-form-validated">
                                    <div className="flex flex-col md:flex-row gap-4">
                                      <div className="w-full md:w-6/12">
                                        <div className={styles.commentFormInputBox}>
                                          <input type="text" placeholder="Full name" name="name" />
                                        </div>
                                      </div>
                                      <div className="w-full md:w-6/12">
                                        <div className={styles.commentFormInputBox}>
                                          <input type="email" placeholder="Email address" name="email" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-full">
                                      <div className={styles.commentFormInputBox}>
                                        <textarea name="message" placeholder="Your Message"></textarea>
                                      </div>
                                      <button className={styles.thmBtn} type="button">
                                        Send Message +
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-5/12">
              <div className={styles.servicesDetailsSidebar}>
                {/* Search */}
                <div className={`${styles.servicesDetailsSidebarSingle} ${styles.servicesDetailsSearch}`}>
                  <div className={styles.title}>
                    <h2>Search</h2>
                  </div>
                  <form className={styles.servicesDetailsSearchForm}>
                    <input type="search" placeholder="Search.." />
                    <button type="button">
                      <Search size={14} />
                    </button>
                  </form>
                </div>

                {/* Categories */}
                <div className={`${styles.servicesDetailsSidebarSingle} ${styles.servicesDetailsCategory}`}>
                  <div className={styles.title}>
                    <h2>Services Category</h2>
                  </div>
                  <ul className={styles.servicesDetailsCategoryList}>
                    {serviceCategories.map((category) => (
                      <li key={category.slug}>
                        <a href="#" className={category.active ? "active" : ""}>
                          {category.name}
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download Buttons */}
                <div className={`${styles.servicesDetailsSidebarSingle} ${styles.servicesDetailsButtonBox}`}>
                  <div className={styles.btnOne}>
                    <a href="#">
                      Download Doc <Download size={16} className="ml-2 inline" />
                    </a>
                  </div>
                  <div className={`${styles.btnOne} ${styles.btnOneTwo}`}>
                    <a href="#">
                      Download PDF <FileText size={16} className="ml-2 inline" />
                    </a>
                  </div>
                </div>

                {/* Help Box */}
                <div className={`${styles.servicesDetailsSidebarSingle} ${styles.servicesDetailsContactBox}`}>
                  <div className={styles.title}>
                    <h2>Need Any Help</h2>
                  </div>
                  {/* Fixed: Using span instead of p > div */}
                  <span className="block">
                    <EditableField value={contentData.additionalInfo} field="additionalInfo" multiline={true} />
                  </span>
                  <div className={styles.number}>
                    <a href="tel:6665559990">
                      <Phone size={20} className="mr-2 inline" />
                      666-555-999-00
                    </a>
                  </div>
                </div>

                <div className={styles.servicesDetailsTextBox3}>
                  {/* Fixed: Using span instead of p > div */}
                  <span className="block">
                    <EditableField value={contentData.additionalInfo} field="additionalInfo" multiline={true} />
                  </span>
                  <EditableFeatureList features={contentData.additionalFeatures} field="additionalFeatures" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Save button (fixed at bottom) */}
      <div className="fixed bottom-4 left-4 z-40">
        <Button onClick={handleSubmit} disabled={isLoading} size="lg" className="flex items-center gap-2 shadow-lg">
          <Save className="h-4 w-4" />
          {isLoading ? "Saving..." : subitem?._id ? "Update Subitem" : "Create Subitem"}
        </Button>
      </div>

      {/* Debug button and panel */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setShowDebug(!showDebug)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Bug className="h-4 w-4" /> Debug Data
        </Button>
        {showDebug && <DebugPanel />}
      </div>
    </div>
  )
}
