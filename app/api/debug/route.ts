import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"

export async function GET() {
  try {
    await connectToDatabase()

    // Get all categories with minimal fields
    const categories = await Category.find({}).lean()

    // Create a simplified structure for debugging
    const simplifiedCategories = categories.map((category) => ({
      id: category._id,
      name: category.name,
      slug: category.slug,
      items: category.items.map((item: any) => ({
        label: item.label,
        href: item.href,
        subitems: item.subitems
          ? item.subitems.map((subitem: any) => ({
              label: subitem.label,
              href: subitem.href,
            }))
          : [],
      })),
    }))

    return NextResponse.json({
      categories: simplifiedCategories,
      message: "Visit /api/debug to see your database structure",
    })
  } catch (error) {
    console.error("Debug route error:", error)
    return NextResponse.json({ error: "Failed to fetch debug data" }, { status: 500 })
  }
}
