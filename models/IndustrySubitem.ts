import mongoose from "mongoose"

const IndustrySubitemSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: {
      intro: [String],
      conclusion: String,
    },
    industryStatus: {
      title: String,
      items: [String],
    },
    challenges: [String],
    requirements: [String],
    solutions: [
      {
        title: String,
        description: String,
        items: [String],
        image: String,
      },
    ],
    benefits: [
      {
        title: String,
        description: String,
      },
    ],
    features: [
      {
        title: String,
        description: String,
        image: String,
      },
    ],
    faq: [
      {
        question: String,
        answer: String,
      },
    ],
    heroImage: String,
    sidebarImage: String,
    sidebarTitle: String,
    contactTitle: String,
    contactText: String,
    categoryId: String,
    itemId: String,
    type: {
      type: String,
      default: "industry",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.IndustrySubitem || mongoose.model("IndustrySubitem", IndustrySubitemSchema)
