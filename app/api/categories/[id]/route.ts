import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import { revalidatePath } from "next/cache"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const category = await Category.findById(params.id).lean()

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Set cache control headers to prevent caching
    const response = NextResponse.json({ category }, { status: 200 })
    response.headers.set("Cache-Control", "no-store, max-age=0")

    return response
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, slug, description, image } = body

    await connectToDatabase()

    // Get the old category to check if slug changed
    const oldCategory = await Category.findById(params.id).lean()
    const oldSlug = oldCategory?.slug

    // Check if another category with the same slug exists (excluding this one)
    const existingCategory = await Category.findOne({
      slug,
      _id: { $ne: params.id },
    }).lean()

    if (existingCategory) {
      return NextResponse.json({ error: "Another category with this slug already exists" }, { status: 400 })
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      params.id,
      { name, slug, description, image },
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
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    // Get the category before deleting to get the slug
    const category = await Category.findById(params.id).lean()
    const slug = category?.slug

    const deletedCategory = await Category.findByIdAndDelete(params.id)

    if (!deletedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Revalidate paths that might use this data
    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/categories")

    // Revalidate the category path
    if (slug) {
      revalidatePath(`/${slug}`)
    }

    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
