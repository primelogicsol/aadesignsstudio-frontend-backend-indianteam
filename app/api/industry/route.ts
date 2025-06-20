import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import IndustrySubitem from "@/models/IndustrySubitem"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { categoryId, itemId, subitemId, ...industryData } = data

    if (!categoryId || !itemId || !subitemId) {
      return NextResponse.json({ error: "Missing required IDs" }, { status: 400 })
    }

    await connectToDatabase()

    // Update or create the industry subitem
    const updatedIndustry = await IndustrySubitem.findOneAndUpdate(
      { _id: subitemId },
      {
        $set: {
          ...industryData,
          categoryId,
          itemId,
          type: "industry",
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true },
    )

    // Update the subitem in the category document if needed
    const category = await Category.findById(categoryId)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Find the item in the category
    const itemIndex = category.items.findIndex((item: any) => item._id.toString() === itemId)
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found in category" }, { status: 404 })
    }

    // Find the subitem in the item
    const subitemIndex = category.items[itemIndex].subitems.findIndex(
      (subitem: any) => subitem._id.toString() === subitemId,
    )

    // If the subitem exists, update its label
    if (subitemIndex !== -1) {
      category.items[itemIndex].subitems[subitemIndex].label = industryData.title
      category.items[itemIndex].subitems[subitemIndex].type = "industry"
    } else {
      // If the subitem doesn't exist, add it
      category.items[itemIndex].subitems.push({
        _id: new ObjectId(subitemId),
        label: industryData.title,
        href: `/industries/${category.items[itemIndex].href.split("/").pop()}/${subitemId}`,
        type: "industry",
      })
    }

    await category.save()

    return NextResponse.json({
      success: true,
      message: "Industry data saved successfully",
      data: updatedIndustry,
    })
  } catch (error) {
    console.error("Error saving industry data:", error)
    return NextResponse.json({ error: "Failed to save industry data" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const subitemId = url.searchParams.get("subitemId")

    if (!subitemId) {
      return NextResponse.json({ error: "Missing subitem ID" }, { status: 400 })
    }

    await connectToDatabase()

    const industryData = await IndustrySubitem.findById(subitemId)
    if (!industryData) {
      return NextResponse.json({ error: "Industry data not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: industryData,
    })
  } catch (error) {
    console.error("Error fetching industry data:", error)
    return NextResponse.json({ error: "Failed to fetch industry data" }, { status: 500 })
  }
}
