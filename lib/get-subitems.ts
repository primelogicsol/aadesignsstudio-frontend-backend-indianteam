import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import Subitem from "@/models/Subitem"

export async function getSubitems() {
  await connectToDatabase()

  // Get all categories with their items and subitems (basic info)
  const categories = await Category.find().lean()

  const subitems = []

  // For each category, get its items and subitems
  for (const category of categories) {
    for (const item of category.items || []) {
      for (const subitemBasic of item.subitems || []) {
        // Get the full subitem data from the subitems collection
        const subitemFull = await Subitem.findById(subitemBasic._id).lean()

        if (subitemFull) {
          subitems.push({
            ...subitemBasic,
            ...subitemFull,
            categoryId: category._id,
            categoryName: category.name,
            itemId: item._id,
            itemName: item.label,
          })
        } else {
          // If no full data exists yet, just use the basic info
          subitems.push({
            ...subitemBasic,
            categoryId: category._id,
            categoryName: category.name,
            itemId: item._id,
            itemName: item.label,
          })
        }
      }
    }
  }

  return subitems
}
