import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import { revalidatePath } from "next/cache"

export async function GET() {
  try {
    await connectToDatabase()
    const categories = await Category.find({}).lean()

    // Set cache control headers to prevent caching
    const response = NextResponse.json({ categories }, { status: 200 })
    response.headers.set("Cache-Control", "no-store, max-age=0")

    return response
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, image } = body

    await connectToDatabase()

    // Check if category with same slug already exists
    const existingCategory = await Category.findOne({ slug }).lean()
    if (existingCategory) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 400 })
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      items: [],
      globalInitiatives: [],
    })

    // Revalidate paths that might use this data
    revalidatePath("/")
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/categories")
    revalidatePath(`/${slug}`)

    return NextResponse.json({ category }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
