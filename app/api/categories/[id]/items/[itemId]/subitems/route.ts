import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import Subitem from "@/models/Subitem"
import { revalidatePath } from "next/cache"

export async function POST(request: Request, { params }: { params: { id: string; itemId: string } }) {
  try {
    const body = await request.json()
    const {
      label,
      href,
      content,
      planningWork,
      additionalInfo,
      additionalFeatures,
      tabContent,
      body: itemBody,
      metaTitle,
      metaDescription,
      coverImage,
    } = body

    await connectToDatabase()

    // Find the category
    const category = await Category.findById(params.id)

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Find the item
    const itemIndex = category.items.findIndex((item: any) => item._id.toString() === params.itemId)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Add the basic subitem info to the category document
    if (!category.items[itemIndex].subitems) {
      category.items[itemIndex].subitems = []
    }

    // Create the subitem in the category collection (minimal data)
    const subitemData = {
      label,
      href,
    }

    category.items[itemIndex].subitems.push(subitemData)
    await category.save()

    // Get the newly created subitem's ID
    const subitem = category.items[itemIndex].subitems[category.items[itemIndex].subitems.length - 1]
    const subitemId = subitem._id

    // Create the full subitem document in the subitems collection
    const fullSubitem = new Subitem({
      categoryId: params.id,
      itemId: params.itemId,
      _id: subitemId, // Use the same ID as in the category collection
      label,
      href,
      content,
      planningWork,
      additionalInfo,
      additionalFeatures,
      tabContent,
      body: itemBody,
      metaTitle,
      metaDescription,
      coverImage,
    })

    await fullSubitem.save()

    // Revalidate paths
    revalidatePath(`/${category.slug}`)
    revalidatePath(`/${category.slug}/${category.items[itemIndex].href.split("/").pop()}`)

    return NextResponse.json(
      {
        message: "Subitem added successfully",
        subitem: fullSubitem,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding subitem:", error)
    return NextResponse.json({ error: "Failed to add subitem" }, { status: 500 })
  }
}
