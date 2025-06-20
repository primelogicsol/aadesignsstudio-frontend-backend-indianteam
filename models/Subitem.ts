import mongoose from "mongoose"

// Subitem schema for the separate collection
const SubitemSchema = new mongoose.Schema(
  {
    // Reference to the parent category and item
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // Basic information (duplicated from the category collection for quick access)
    label: String,
    href: String,
    slug: String,
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    // Rich content fields from WYSIWYG editor
    content: {
      title: String,
      description: String,
    },
    planningWork: {
      title: String,
      description: String,
      features: [String],
      image: String,
    },
    planningImage: String,
    additionalInfo: String,
    additionalFeatures: [String],
    tabContent: {
      materials: {
        title: String,
        content: String,
        image: String,
      },
      design: {
        title: String,
        content: String,
        image: String,
      },
      care: {
        title: String,
        content: String,
        image: String,
      },
      support: {
        title: String,
        content: String,
        image: String,
      },
    },
    body: String,
    metaTitle: String,
    metaDescription: String,
    coverImage: String,
  },
  { timestamps: true },
)

// Create indexes for faster queries
SubitemSchema.index({ categoryId: 1, itemId: 1 })
SubitemSchema.index({ href: 1 })

// Create the Subitem model
const Subitem = mongoose.models.Subitem || mongoose.model("Subitem", SubitemSchema)

export default Subitem
