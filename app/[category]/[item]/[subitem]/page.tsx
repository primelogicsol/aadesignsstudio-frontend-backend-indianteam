import { notFound } from "next/navigation"
import Link from "next/link"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import Subitem from "@/models/Subitem"
import IndustrySubitem from "@/models/IndustrySubitem" // Import the IndustrySubitem model
import ServiceDetailBody from "@/components/service-detail-body"
import { unstable_noStore } from "next/cache"
import type { ServiceDetail } from "@/types/service"
import { serializeMongoData } from "@/lib/serialize-mongo"
import IndustryDetailBody from "@/components/IndustryDetailBody"
import { DesignTrendsContainer } from "@/components/design-trends/design-trends-container"
import { CollaborativeNetworkDetail } from "@/components/collaborative-network/collaborative-network-detail"
import { networkFallbackData } from "@/lib/collaborative-network/fallback-data"

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

    // Check if this is an industry subitem
    const isIndustry = categorySlug === "industries" || subitemBasic.type === "industry"

    // If it's an industry, get the industry-specific data
    let industryData = null
    if (isIndustry) {
      industryData = await IndustrySubitem.findById(subitemBasic._id).lean()
    }

    // Combine the data and serialize it
    const subitem = serializeMongoData({
      ...subitemBasic,
      ...subitemFull,
      industryData: industryData, // Add the industry data if available
    })

    return {
      category: serializeMongoData(category),
      item: serializeMongoData(item),
      subitem,
    }
  } catch (error) {
    console.error("Error fetching subitem:", error)
    return null
  }
}

export default async function SubitemPage({ params }: PageProps) {
  try {
    const result = await getSubitem(params.category, params.item, params.subitem)

    if (!result) {
      notFound()
    }

    const { category, item, subitem } = result

    // Check if this is a collaborative network category
    const isCollaborativeNetworkCategory = params.category === "collaborative-network"

    // Check if this is an industry category
    const isIndustryCategory = params.category === "industries" || subitem.type === "industry"

    // Check if this is a design trends category
    const isDesignTrendsCategory = params.category === "design-trends"

    if (isCollaborativeNetworkCategory) {
      // Use the subitem data or fallback to default network data
      try {
        return (
          <div className="container mx-auto py-8 px-4">
            <div className="bg-gray-100 py-4 mb-6">
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

            <CollaborativeNetworkDetail
              networkId={subitem._id?.toString()}
              networkData={subitem.networkData || networkFallbackData}
              categoryId={category._id?.toString()}
              itemId={item._id?.toString()}
              subitemId={subitem._id?.toString()}
              isEditable={true}
              className="mt-8"
            />
          </div>
        )
      } catch (error) {
        console.error("Error rendering CollaborativeNetworkDetail:", error)
        // Fallback to standard ServiceDetailBody if there's an error
        return renderFallbackView(category, item, subitem, params)
      }
    }

    if (isDesignTrendsCategory) {
      // Use static data for design trends instead of fetching from an API
      try {
        return (
          <div className="container mx-auto py-8 px-4">
            <div className="bg-gray-100 py-4 mb-6">
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

            <h1 className="text-3xl font-bold mb-6">{subitem.label}</h1>

            <DesignTrendsContainer
              title={subitem.content?.title || subitem.label}
              description={
                typeof subitem.content?.description === "string"
                  ? subitem.content.description
                  : "Explore the latest design trends and insights"
              }
              // Force the use of fallback data by providing a non-existent endpoint
              endpoint="/api/non-existent-endpoint"
              initialCategory="all"
              maxItems={6}
              showFilters={true}
              showLoadMore={true}
              layout="featured"
              className="mt-8"
            />
          </div>
        )
      } catch (error) {
        console.error("Error rendering DesignTrendsContainer:", error)
        // Fallback to standard ServiceDetailBody if there's an error
        return renderFallbackView(category, item, subitem, params)
      }
    }

    if (isIndustryCategory) {
      try {
        // Use the industry data if available
        const industryData = subitem.industryData || {}

        // Map the industry data to the format expected by IndustryDetailBody
        const mappedIndustryData = {
          id: subitem._id?.toString() || "",
          title: industryData.title || subitem.label || "",
          subtitle: industryData.subtitle || subitem.content?.title || subitem.label || "",
          description: {
            intro:
              industryData.description?.intro ||
              (subitem.content?.description ? [subitem.content.description] : ["No description available"]),
            conclusion: industryData.description?.conclusion || subitem.additionalInfo || "",
          },
          industryStatus: industryData.industryStatus || {
            title: "Industry Status",
            items: [],
          },
          challenges: industryData.challenges || [],
          requirements: industryData.requirements || [],
          solutions: industryData.solutions || [],
          benefits: industryData.benefits || [],
          features: industryData.features || [],
          faq: industryData.faq || [],
          heroImage: industryData.heroImage || subitem.coverImage || "/diverse-manufacturing-floor.png",
          sidebarImage: industryData.sidebarImage || "/modern-business-tri-fold.png",
          sidebarTitle: industryData.sidebarTitle || "All Services",
          contactTitle: industryData.contactTitle || "Need Help?",
          contactText: industryData.contactText || "Contact our customer support team if you have any questions.",
        }

        return (
          <IndustryDetailBody
            data={mappedIndustryData}
            type="industry"
            parentTitle={item.label}
            parentPath={`/${params.category}/${params.item}`}
            category={category.name}
            categoryPath={`/${params.category}`}
          />
        )
      } catch (error) {
        console.error("Error rendering IndustryDetailBody:", error)
        // Fallback to standard ServiceDetailBody if there's an error
        return renderFallbackView(category, item, subitem, params)
      }
    }

    // Default case: render standard service detail
    return renderFallbackView(category, item, subitem, params)
  } catch (error) {
    console.error("Error in SubitemPage:", error)
    // Render a generic error page
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Something went wrong</h1>
        <p className="mb-4">We encountered an error while loading this page.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to home page
        </Link>
      </div>
    )
  }
}

// Helper function to render a fallback view
function renderFallbackView(category: any, item: any, subitem: any, params: PageProps["params"]) {
  // Map the subitem data directly from the database to the ServiceDetail interface
  const serviceData: ServiceDetail = {
    id: subitem._id?.toString() || "",
    title: subitem.label || "",
    content: typeof subitem.content?.description === "string" ? subitem.content.description : "",
    planningWork: {
      title: subitem.planningWork?.title || "",
      description: subitem.planningWork?.description || "",
      features: Array.isArray(subitem.planningWork?.features) ? subitem.planningWork.features : [],
    },
    planningImage: subitem.planningImage || "/planningImage.jpg",
    additionalInfo: subitem.additionalInfo || "",
    additionalFeatures: Array.isArray(subitem.additionalFeatures) ? subitem.additionalFeatures : [],
    tabContent: {
      materials: {
        title: subitem.tabContent?.materials?.title || "Quality Materials",
        image: subitem.tabContent?.materials?.image || "/textile-texture-closeups.png",
        content: subitem.tabContent?.materials?.content || "",
      },
      design: {
        title: subitem.tabContent?.design?.title || "Interior Design",
        image: subitem.tabContent?.design?.image || "/modern-living-space.png",
        content: subitem.tabContent?.design?.content || "",
      },
      care: {
        title: subitem.tabContent?.care?.title || "Personal Care",
        image: subitem.tabContent?.care?.image || "/self-care-essentials.png",
        content: subitem.tabContent?.care?.content || "",
      },
      support: {
        title: subitem.tabContent?.support?.title || "Support",
        image: subitem.tabContent?.support?.image || "/customer-support-team.png",
        content: subitem.tabContent?.support?.content || "",
        hasForm: true,
      },
    },
    coverImage: subitem.coverImage || "/customer-support-team.png",
  }

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
