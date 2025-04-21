import connectToDatabase from "./mongodb"
import Category from "@/models/Category"

export async function getCategories() {
  try {
    await connectToDatabase()
    const categories = await Category.find({}).lean()
    return JSON.parse(JSON.stringify(categories)) // Serialize for client components
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}
