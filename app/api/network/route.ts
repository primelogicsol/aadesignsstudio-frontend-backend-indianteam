import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import NetworkSubitem from "@/models/NetworkSubitem"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { networkData, categoryId, itemId, subitemId } = data

    if (!categoryId || !itemId || !subitemId) {
      return NextResponse.json({ error: "Missing required IDs" }, { status: 400 })
    }

    console.log(`Connecting to MongoDB to save network data for subitem: ${subitemId}`)
    await connectToDatabase()
    console.log("Connected to MongoDB successfully")

    // Prepare the data for MongoDB
    const networkDataForMongo = {
      ...networkData,
      categoryId,
      itemId,
      updatedAt: new Date().toISOString(),
    }

    console.log(`Updating or creating network subitem with ID: ${subitemId}`)

    // Update or create the network subitem
    const updatedNetwork = await NetworkSubitem.findOneAndUpdate(
      { _id: subitemId },
      {
        $set: networkDataForMongo,
      },
      { upsert: true, new: true },
    )

    console.log(`Network subitem updated successfully: ${updatedNetwork._id}`)

    // Update the subitem in the category document if needed
    console.log(`Updating category ${categoryId} with network reference`)
    const category = await Category.findById(categoryId)
    if (!category) {
      console.error(`Category not found: ${categoryId}`)
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Find the item in the category
    const itemIndex = category.items.findIndex((item: any) => item._id.toString() === itemId)
    if (itemIndex === -1) {
      console.error(`Item not found in category: ${itemId}`)
      return NextResponse.json({ error: "Item not found in category" }, { status: 404 })
    }

    // Find the subitem in the item
    const subitemIndex = category.items[itemIndex].subitems.findIndex(
      (subitem: any) => subitem._id.toString() === subitemId,
    )

    // If the subitem exists, update its label
    if (subitemIndex !== -1) {
      console.log(`Updating existing subitem reference in category`)
      category.items[itemIndex].subitems[subitemIndex].label = networkData.name
      category.items[itemIndex].subitems[subitemIndex].type = "network"
    } else {
      // If the subitem doesn't exist, add it
      console.log(`Adding new subitem reference to category`)
      category.items[itemIndex].subitems.push({
        _id: new ObjectId(subitemId),
        label: networkData.name,
        href: `/networks/${category.items[itemIndex].href.split("/").pop()}/${subitemId}`,
        type: "network",
      })
    }

    await category.save()
    console.log(`Category updated successfully`)

    return NextResponse.json({
      success: true,
      message: "Network data saved successfully to MongoDB",
      data: {
        id: updatedNetwork._id,
        name: updatedNetwork.name,
        memberCount: updatedNetwork.members?.length || 0,
        projectCount: updatedNetwork.projects?.length || 0,
      },
    })
  } catch (error) {
    console.error("Error saving network data to MongoDB:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to save network data to MongoDB",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const subitemId = url.searchParams.get("subitemId")

    if (!subitemId) {
      return NextResponse.json({ error: "Missing subitem ID" }, { status: 400 })
    }

    console.log(`Connecting to MongoDB to fetch network data for subitem: ${subitemId}`)
    await connectToDatabase()
    console.log("Connected to MongoDB successfully")

    console.log(`Fetching network data for subitem: ${subitemId}`)
    const networkData = await NetworkSubitem.findById(subitemId)

    if (!networkData) {
      console.log(`Network data not found for subitem: ${subitemId}`)
      return NextResponse.json({ error: "Network data not found" }, { status: 404 })
    }

    console.log(`Network data fetched successfully for subitem: ${subitemId}`)
    return NextResponse.json({
      success: true,
      data: networkData,
    })
  } catch (error) {
    console.error("Error fetching network data from MongoDB:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch network data from MongoDB",
      },
      { status: 500 },
    )
  }
}
