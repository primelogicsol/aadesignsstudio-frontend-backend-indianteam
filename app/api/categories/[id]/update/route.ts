import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import { revalidatePath } from "next/cache"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, slug, description, image, items } = body

    await connectToDatabase()

    // Check if another category with the same slug exists (excluding this one)
    if (slug) {
      const existingCategory = await Category.findOne({
        slug,
        _id: { $ne: params.id },
      }).lean()

      if (existingCategory) {
        return NextResponse.json({ error: "Another category with this slug already exists" }, { status: 400 })
      }
    }

    // Get the old category to check if slug changed
    const oldCategory = await Category.findById(params.id).lean()
    const oldSlug = oldCategory?.slug

    // Update the entire category document including items and subitems
    const updatedCategory = await Category.findByIdAndUpdate(
      params.id,
      { name, slug, description, image, items },
      { new: true, runValidators: true },
    )

    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Revalidate paths that might use this data
    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/categories")

    // Revalidate the old and new category paths
    if (oldSlug) {
      revalidatePath(`/${oldSlug}`)
    }
    revalidatePath(`/${slug}`)

    return NextResponse.json({ category: updatedCategory }, { status: 200 })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}
