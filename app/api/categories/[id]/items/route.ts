import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { label, href } = body

    await connectToDatabase()

    // Find the category
    const category = await Category.findById(params.id)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Add the new item
    category.items.push({
      label,
      href,
      subitems: [],
    })

    await category.save()

    return NextResponse.json(
      {
        message: "Item added successfully",
        item: category.items[category.items.length - 1],
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 })
  }
}
