"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash, PenTool, Building, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Subitem {
  _id: string
  label: string
  href: string
  itemId: string
  itemLabel: string
  categoryId: string
  categoryName: string
  type?: string // Optional type property
}

interface Category {
  _id: string
  name: string
  slug: string
  items: any[]
}

interface SubitemTableProps {
  subitems: Subitem[]
  categories: Category[]
}

export function SubitemTable({ subitems, categories }: SubitemTableProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [subitemToDelete, setSubitemToDelete] = useState<{
    categoryId: string
    itemId: string
    subitemId: string
  } | null>(null)

  // New state for filtering
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [itemFilter, setItemFilter] = useState("all")
  const [filteredItems, setFilteredItems] = useState<any[]>([])

  // Update filtered items when category changes
  useEffect(() => {
    if (categoryFilter === "all") {
      setFilteredItems([])
      setItemFilter("all")
    } else {
      const category = categories.find((c) => c._id === categoryFilter)
      setFilteredItems(category?.items || [])
      setItemFilter("all")
    }
  }, [categoryFilter, categories])

  // Filter subitems based on search term, category, and item
  const filteredSubitems = subitems.filter((subitem) => {
    const matchesSearch = subitem.label.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || subitem.categoryId === categoryFilter
    const matchesItem = itemFilter === "all" || subitem.itemId === itemFilter

    return matchesSearch && matchesCategory && matchesItem
  })

  const handleDelete = async () => {
    if (!subitemToDelete) return

    try {
      // Use the correct API path with [id] instead of [categoryId]
      const response = await fetch(
        `/api/categories/${subitemToDelete.categoryId}/items/${subitemToDelete.itemId}/subitems/${subitemToDelete.subitemId}`,
        {
          method: "DELETE",
        },
      )

      if (!response.ok) {
        throw new Error("Failed to delete subitem")
      }

      // Refresh the page to show updated data
      router.refresh()
    } catch (error) {
      console.error("Error deleting subitem:", error)
    } finally {
      setIsDeleteDialogOpen(false)
      setSubitemToDelete(null)
    }
  }

  const confirmDelete = (categoryId: string, itemId: string, subitemId: string) => {
    setSubitemToDelete({ categoryId, itemId, subitemId })
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      {/* Filtering controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search subitems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={itemFilter} onValueChange={setItemFilter} disabled={categoryFilter === "all"}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by item" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              {filteredItems.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.label || item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          {filteredSubitems.length} {filteredSubitems.length === 1 ? "subitem" : "subitems"} found
        </div>
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link href="/dashboard/subitems/wysiwyg-editor">
            <PenTool className="h-4 w-4" />
            Create with WYSIWYG Editor
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Parent Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubitems.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No subitems found. Create your first subitem to get started.
                </TableCell>
              </TableRow>
            )}

            {filteredSubitems.map((subitem) => (
              <TableRow key={subitem._id}>
                <TableCell className="font-medium">{subitem.label}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50">
                    {subitem.itemLabel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50">
                    {subitem.categoryName}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/subitems/${subitem.categoryId}/${subitem.itemId}/${subitem._id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>

                    {subitem.type === "industry" && (
                      <Button variant="outline" size="sm" className="bg-blue-50" asChild>
                        <Link
                          href={`/dashboard/industries/editor/${subitem.categoryId}/${subitem.itemId}/${subitem._id}`}
                        >
                          <Building className="h-4 w-4" />
                          <span className="sr-only">Edit Industry</span>
                        </Link>
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/subitems/${subitem.categoryId}/${subitem.itemId}/${subitem._id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/subitems/wysiwyg-editor/${subitem.categoryId}/${subitem.itemId}/${subitem._id}`}
                          >
                            <PenTool className="mr-2 h-4 w-4" /> Edit with WYSIWYG
                          </Link>
                        </DropdownMenuItem>
                        
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/industries/editor/${subitem.categoryId}/${subitem.itemId}/${subitem._id}`}
                            >
                              <Building className="mr-2 h-4 w-4" /> Edit Industry
                            </Link>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/collabrative-network-editor/${subitem.categoryId}/${subitem.itemId}/${subitem._id}`}
                            >
                              <Building className="mr-2 h-4 w-4" /> Edit Collabrative Network
                            </Link>
                          </DropdownMenuItem>
                        
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => confirmDelete(subitem.categoryId, subitem.itemId, subitem._id)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => confirmDelete(subitem.categoryId, subitem.itemId, subitem._id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the subitem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
