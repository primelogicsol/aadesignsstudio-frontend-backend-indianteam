import connectToDatabase from "./mongodb"
import Category from "@/models/Category"
import { unstable_noStore } from "next/cache"
import { serializeMongoData } from "./serialize-mongo"

export async function getCategories() {
  try {
    unstable_noStore()
    await connectToDatabase()

    const categories = await Category.find({}).lean()

    // Serialize the MongoDB documents to plain JavaScript objects
    return serializeMongoData(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}
