import { NextResponse } from "next/server"
import { designTrendsFallbackData } from "@/lib/design-trends/fallback-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Find the trend by ID
    const trend = designTrendsFallbackData.trends.find((t) => t.id === id)

    if (!trend) {
      return NextResponse.json({ error: "Design trend not found" }, { status: 404 })
    }

    // For this example, we'll add some mock content if it doesn't exist
    const trendDetail = {
      ...trend,
      content:
        trend.content ||
        `
        <p>${trend.description}</p>
        
        <h2>Overview</h2>
        <p>This is a detailed overview of the ${trend.title} design trend. It explores the origins, key characteristics, and practical applications of this trend in modern design.</p>
        
        <h2>Key Characteristics</h2>
        <ul>
          <li>Characteristic one of the ${trend.title} trend</li>
          <li>Characteristic two with detailed explanation</li>
          <li>Characteristic three showing practical examples</li>
          <li>Characteristic four demonstrating implementation</li>
        </ul>
        
        <h2>Implementation</h2>
        <p>When implementing the ${trend.title} trend in your designs, consider the following best practices:</p>
        <ul>
          <li>Best practice one with explanation</li>
          <li>Best practice two with code examples</li>
          <li>Best practice three with visual references</li>
        </ul>
        
        <h2>Future Outlook</h2>
        <p>The future of ${trend.title} looks promising as more designers adopt this approach. We expect to see continued evolution and refinement of this trend over the coming years.</p>
      `,
      authorInfo: {
        name: trend.author || "Unknown Author",
        avatar: `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(trend.author || "author")}`,
        bio: `Expert in ${trend.category} with years of experience in the design industry. Specializes in ${trend.tags?.join(", ") || "design trends"}.`,
      },
      relatedTrends: designTrendsFallbackData.trends
        .filter(
          (t) => t.id !== id && (t.category === trend.category || t.tags?.some((tag) => trend.tags?.includes(tag))),
        )
        .slice(0, 3)
        .map((t) => t.id),
    }

    return NextResponse.json(trendDetail)
  } catch (error) {
    console.error("Error in design trend detail API:", error)
    return NextResponse.json({ error: "Failed to fetch design trend detail" }, { status: 500 })
  }
}
