import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import Subitem from "@/models/Subitem"
import { revalidatePath } from "next/cache"

export async function PUT(request: Request, { params }: { params: { id: string; itemId: string; subitemId: string } }) {
  try {
    const body = await request.json()
    const {
      label,
      href,
      slug,
      status,
      content,
      planningWork,
      additionalInfo,
      additionalFeatures,
      tabContent,
      metaTitle,
      metaDescription,
      coverImage,
    } = body

    await connectToDatabase()

    // Update the basic info in the category collection
    const category = await Category.findOneAndUpdate(
      {
        _id: params.id,
        "items._id": params.itemId,
        "items.subitems._id": params.subitemId,
      },
      {
        $set: {
          "items.$[item].subitems.$[subitem].label": label,
          "items.$[item].subitems.$[subitem].href": href,
        },
      },
      {
        new: true,
        arrayFilters: [{ "item._id": params.itemId }, { "subitem._id": params.subitemId }],
      },
    )

    if (!category) {
      return NextResponse.json({ error: "Category, item, or subitem not found" }, { status: 404 })
    }

    // Update the full content in the subitems collection
    const updatedSubitem = await Subitem.findByIdAndUpdate(
      params.subitemId,
      {
        label,
        href,
        slug,
        status,
        content,
        planningWork,
        additionalInfo,
        additionalFeatures,
        tabContent,
        body: body.body,
        metaTitle,
        metaDescription,
        coverImage,
      },
      { new: true, upsert: true }, // Create if it doesn't exist
    )

    // Revalidate paths
    revalidatePath(`/${category.slug}`)
    const item = category.items.find((item: any) => item._id.toString() === params.itemId)
    if (item) {
      revalidatePath(`/${category.slug}/${item.href.split("/").pop()}`)
      revalidatePath(`/${category.slug}/${item.href.split("/").pop()}/${href.split("/").pop()}`)
    }

    return NextResponse.json(
      {
        message: "Subitem updated successfully",
        subitem: updatedSubitem,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating subitem:", error)
    return NextResponse.json({ error: "Failed to update subitem" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; itemId: string; subitemId: string } },
) {
  try {
    await connectToDatabase()

    // Remove from category collection
    const category = await Category.findOneAndUpdate(
      { _id: params.id, "items._id": params.itemId },
      {
        $pull: {
          "items.$.subitems": { _id: params.subitemId },
        },
      },
      { new: true },
    )

    if (!category) {
      return NextResponse.json({ error: "Category or item not found" }, { status: 404 })
    }

    // Remove from subitems collection
    await Subitem.findByIdAndDelete(params.subitemId)

    // Revalidate paths
    revalidatePath(`/${category.slug}`)
    const item = category.items.find((item: any) => item._id.toString() === params.itemId)
    if (item) {
      revalidatePath(`/${category.slug}/${item.href.split("/").pop()}`)
    }

    return NextResponse.json(
      {
        message: "Subitem deleted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error deleting subitem:", error)
    return NextResponse.json({ error: "Failed to delete subitem" }, { status: 500 })
  }
}
