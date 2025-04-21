"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash, PenTool } from "lucide-react"
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

interface Subitem {
  _id: string
  label: string
  href: string
  itemId: string
  itemLabel: string
  categoryId: string
  categoryName: string
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
      <div className="flex justify-between items-center mb-4">
        <div></div>
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
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subitems.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No subitems found. Create your first subitem to get started.
                </TableCell>
              </TableRow>
            )}

            {subitems.map((subitem) => (
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
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
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => confirmDelete(subitem.categoryId, subitem.itemId, subitem._id)}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
