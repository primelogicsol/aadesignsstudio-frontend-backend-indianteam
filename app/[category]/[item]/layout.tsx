import type React from "react"
import { notFound } from "next/navigation"
import connectToDatabase from "@/lib/mongodb"
import Category from "@/models/Category"
import { SubNavbar } from "@/components/navbar/sub-navbar"
import { MultiLineSlideHero } from "@/components/multi-line-slide-hero"

interface LayoutProps {
  children: React.ReactNode
  params: {
    category: string
    item: string
  }
}

async function getCategoryAndItem(categorySlug: string, itemSlug: string) {
  try {
    await connectToDatabase()

    // Find the category by slug
    const category = await Category.findOne({ slug: categorySlug }).lean()

    if (!category) {
      console.log(`Category not found: ${categorySlug}`)
      return null
    }

    // Find the item in the category - try different matching strategies
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

    // Strategy 3: Try matching by href containing the itemSlug
    if (!item) {
      item = category.items.find((i) => i.href.includes(itemSlug))
    }

    if (!item) {
      console.log(`Item not found in category ${categorySlug}: ${itemSlug}`)
      return null
    }

    return { category, item }
  } catch (error) {
    console.error("Error fetching category and item:", error)
    return null
  }
}

export default async function ItemLayout({ children, params }: LayoutProps) {
  const result = await getCategoryAndItem(params.category, params.item)

  if (!result) {
    notFound()
  }

  const { category, item } = result

  // Only show the SubNavbar if the item has subitems
  const hasSubitems = item.subitems && item.subitems.length > 0

  // Generate custom slides based on the current item and its subitems
  const customSlides = [
    {
      id: 0,
      heading: item.label,
      description: `Discover our comprehensive ${item.label} solutions designed to meet your business needs and drive growth.`,
      linkText: "Learn More",
      linkHref: `/${params.category}/${params.item}`,
      bgImage: "/forest-pine.jpg",
    },
    ...(item.subitems || []).slice(0, 2).map((subitem, index) => ({
      id: index + 1,
      heading: subitem.label,
      description: `Explore our ${subitem.label} offerings and see how they can transform your business operations.`,
      linkText: "View Details",
      linkHref: `/${params.category}/${params.item}/${subitem.href.split("/").pop()}`,
      bgImage: index === 0 ? "/landingpage3.jpg" : "/sydney-harbour-bridge.jpg",
    })),
  ]

  return (
    <>
      {/* Hero Section first */}
      {/* <MultiLineSlideHero /> */}

      {/* SubNavbar after hero */}
      {hasSubitems && (
        <SubNavbar
          categorySlug={category.slug}
          itemSlug={params.item}
          itemLabel={item.label}
          subitems={item.subitems}
        />
      )}

      {children}
    </>
  )
}
