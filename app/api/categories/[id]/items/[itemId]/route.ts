import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"

export async function PUT(request: Request, { params }: { params: { id: string; itemId: string } }) {
  try {
    const body = await request.json()
    const { label, href } = body

    await connectToDatabase()

    // Find the category and update the specific item
    const category = await Category.findOneAndUpdate(
      {
        _id: params.id,
        "items._id": params.itemId,
      },
      {
        $set: {
          "items.$.label": label,
          "items.$.href": href,
        },
      },
      { new: true },
    )

    if (!category) {
      return NextResponse.json({ error: "Category or item not found" }, { status: 404 })
    }

    // Find the updated item
    const updatedItem = category.items.find((item: any) => item._id.toString() === params.itemId)

    return NextResponse.json(
      {
        message: "Item updated successfully",
        item: updatedItem,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string; itemId: string } }) {
  try {
    await connectToDatabase()

    // Find the category and pull the item from the items array
    const category = await Category.findByIdAndUpdate(
      params.id,
      {
        $pull: {
          items: { _id: params.itemId },
        },
      },
      { new: true },
    )

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: "Item deleted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}
