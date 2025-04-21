import mongoose from "mongoose"

// Subitem schema definition
const SubitemSchema = new mongoose.Schema({
  label: String,
  href: String,
})

// Item schema definition with a subitems array
const ItemSchema = new mongoose.Schema({
  label: String,
  href: String,
  subitems: [SubitemSchema], // This field will store an array of subitems
})

// Initiative schema definition
const InitiativeSchema = new mongoose.Schema({
  label: String,
  href: String,
  image: String,
})

// Category schema definition
const CategorySchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    image: String,
    items: [ItemSchema], // Items with subitems
    globalInitiatives: [InitiativeSchema],
  },
  { timestamps: true },
)

// Create the Category model
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)

// Export as both default and named export
export { Category }
export default Category
