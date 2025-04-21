import { notFound } from "next/navigation"
import Link from "next/link"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import Subitem from "@/models/Subitem"
import ServiceDetailBody from "@/components/service-detail-body"
import { unstable_noStore } from "next/cache"
import type { ServiceDetail } from "@/types/service"

interface PageProps {
  params: {
    category: string
    item: string
    subitem: string
  }
}

async function getSubitem(categorySlug: string, itemSlug: string, subitemSlug: string) {
  try {
    unstable_noStore() // Prevent caching

    await connectToDatabase()

    // Find the category by slug
    const category = await Category.findOne({ slug: categorySlug }).lean()

    if (!category) return null

    // Find the item in the category
    let item = null

    // Strategy 1: Match by the last segment of href
    for (const i of category.items) {
      const hrefParts = i.href.split("/")
      const lastPart = hrefParts[hrefParts.length - 1]

      if (lastPart === itemSlug) {
        item = i
        break
      }
    }

    // Strategy 2: If not found, try matching by label (case insensitive)
    if (!item) {
      item = category.items.find((i) => i.label.toLowerCase() === itemSlug.toLowerCase())
    }

    if (!item) return null

    // Find the subitem in the category collection (basic info)
    let subitemBasic = null

    // Strategy 1: Match by the last segment of href
    for (const s of item.subitems || []) {
      const hrefParts = s.href.split("/")
      const lastPart = hrefParts[hrefParts.length - 1]

      if (lastPart === subitemSlug) {
        subitemBasic = s
        break
      }
    }

    // Strategy 2: If not found, try matching by label (case insensitive)
    if (!subitemBasic) {
      subitemBasic = (item.subitems || []).find((s) => s.label.toLowerCase() === subitemSlug.toLowerCase())
    }

    if (!subitemBasic) return null

    // Get the full subitem content from the subitems collection
    const subitemFull = await Subitem.findById(subitemBasic._id).lean()

    // Combine the data
    const subitem = {
      ...subitemBasic,
      ...subitemFull,
    }

    return { category, item, subitem }
  } catch (error) {
    console.error("Error fetching subitem:", error)
    return null
  }
}

export default async function SubitemPage({ params }: PageProps) {
  const result = await getSubitem(params.category, params.item, params.subitem)

  if (!result) {
    notFound()
  }

  const { category, item, subitem } = result

  // Add console.log to see the raw data
  console.log("Raw subitem data from database:", JSON.stringify(subitem, null, 2))

  // Map the subitem data directly from the database to the ServiceDetail interface
  // without adding any default values - let the component handle defaults if needed
  const serviceData: ServiceDetail = {
    id: subitem._id?.toString() || "",
    title: subitem.label || "",
    content: subitem.content?.description || "",
    planningWork: {
      title: subitem.planningWork?.title || "",
      description: subitem.planningWork?.description || "",
      features: subitem.planningWork?.features || [],
    },
    additionalInfo: subitem.additionalInfo || "",
    additionalFeatures: subitem.additionalFeatures || [],
    tabContent: {
      materials: {
        title: subitem.tabContent?.materials?.title || "",
        image: "/textile-texture-closeups.png", // We'll keep image paths for now
        content: subitem.tabContent?.materials?.content || "",
      },
      design: {
        title: subitem.tabContent?.design?.title || "",
        image: "/modern-living-space.png",
        content: subitem.tabContent?.design?.content || "",
      },
      care: {
        title: subitem.tabContent?.care?.title || "",
        image: "/self-care-essentials.png",
        content: subitem.tabContent?.care?.content || "",
      },
      support: {
        title: subitem.tabContent?.support?.title || "",
        image: "/customer-support-team.png",
        content: subitem.tabContent?.support?.content || "",
        hasForm: true,
      },
    },
  }

  // Log the mapped data for debugging
  console.log("Mapped service data:", serviceData)

  return (
    <div>
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${params.category}`} className="hover:text-gray-700">
              {category.name}
            </Link>
            <span>/</span>
            <Link href={`/${params.category}/${params.item}`} className="hover:text-gray-700">
              {item.label}
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">{subitem.label}</span>
          </div>
        </div>
      </div>

      <ServiceDetailBody serviceData={serviceData} />
    </div>
  )
}
