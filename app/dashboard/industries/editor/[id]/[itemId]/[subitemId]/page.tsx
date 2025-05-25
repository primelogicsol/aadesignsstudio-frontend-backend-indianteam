import { notFound } from "next/navigation"
import IndustryDetailBodyEditor from "@/components/dashboard/industry-detail-body-editor"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import IndustrySubitem from "@/models/IndustrySubitem"
import { serializeMongoData } from "@/lib/serialize-mongo"
import { unstable_noStore } from "next/cache"

interface PageProps {
  params: {
    id: string
    itemId: string
    subitemId: string
  }
}

async function getIndustryData(categoryId: string, itemId: string, subitemId: string) {
  try {
    unstable_noStore() // Prevent caching
    await connectToDatabase()

    // Get the category document
    const category = await Category.findById(categoryId).lean()
    if (!category) {
      console.error("Category not found:", categoryId)
      return null
    }

    // Find the item in the category
    const item = category.items.find((i: any) => i._id.toString() === itemId)
    if (!item) {
      console.error("Item not found in category:", itemId)
      return null
    }

    // Find the basic subitem info in the item
    const subitemBasic = item.subitems.find((s: any) => s._id.toString() === subitemId)
    if (!subitemBasic) {
      console.error("Subitem not found in item:", subitemId)
      return null
    }

    // Get the full industry subitem content
    const industrySubitem = await IndustrySubitem.findById(subitemId).lean()

    // If no industry data exists yet, return basic data
    if (!industrySubitem) {
      return {
        title: subitemBasic.label || "Industry Title",
        subtitle: "Industry Subtitle",
        description: {
          intro: ["Enter industry description here."],
          conclusion: "Conclusion text here.",
        },
        industryStatus: {
          title: "Industry Status",
          items: ["Status item 1"],
        },
        challenges: ["Challenge 1"],
        requirements: ["Requirement 1"],
        solutions: [
          {
            title: "Solution 1",
            description: "Solution description",
            items: ["Solution item 1"],
            image: "",
          },
        ],
        benefits: [
          {
            title: "Benefit 1",
            description: "Benefit description",
          },
        ],
        features: [
          {
            title: "Feature 1",
            description: "Feature description",
            image: "",
          },
        ],
        faq: [
          {
            question: "Frequently asked question?",
            answer: "Answer to the question.",
          },
        ],
        heroImage: "",
        sidebarImage: "",
        categoryName: category.name,
        categorySlug: category.slug,
        itemName: item.title || item.label,
      }
    }

    return {
      ...serializeMongoData(industrySubitem),
      categoryName: category.name,
      categorySlug: category.slug,
      itemName: item.title || item.label,
    }
  } catch (error) {
    console.error("Error fetching industry data:", error)
    return null
  }
}

export default async function EditIndustryPage({ params }: PageProps) {
  const industryData = await getIndustryData(params.id, params.itemId, params.subitemId)

  if (!industryData) {
    notFound()
  }

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold mb-8 px-4">Edit Industry: {industryData.title}</h1>
      <IndustryDetailBodyEditor
        data={industryData}
        categoryId={params.id}
        itemId={params.itemId}
        subitemId={params.subitemId}
        category={industryData.categoryName}
        categoryPath={`/${industryData.categorySlug}`}
        parentTitle={industryData.itemName}
        parentPath={`/${industryData.categorySlug}/${industryData.itemName}`}
      />
    </div>
  )
}
