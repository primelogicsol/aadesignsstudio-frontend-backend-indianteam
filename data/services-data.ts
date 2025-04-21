// Types for services
export interface ServiceItem {
  slug: string
  title: string
  description: string
  shortDescription?: string
  image?: string
  sections?: {
    title: string
    content: string
    featuresTitle?: string
    features?: string[]
    image?: string
  }[]
  relatedServices?: {
    category: string
    slug: string
    title: string
    description: string
  }[]
}

export interface ServiceCategory {
  slug: string
  title: string
  description: string
  subtitle?: string
  approach?: string
  image?: string
}

// Sample data for service categories
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "consulting",
    title: "Consulting Services",
    description: "Expert advice and strategic planning for your design and construction projects.",
    approach:
      "Our consulting approach combines industry expertise with analytical rigor to deliver practical, implementable strategies tailored to your specific needs.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "project-management",
    title: "Project Management",
    description: "Comprehensive project management services to ensure successful project delivery.",
    approach:
      "We provide structured, methodical project management that ensures your projects are completed on time, within budget, and to the highest quality standards.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "architecture",
    title: "Architecture Services",
    description: "Innovative architectural solutions for residential and commercial projects.",
    approach:
      "Our architectural approach blends creativity, functionality, and technical expertise to create exceptional spaces that meet your specific needs.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    description: "Transform your spaces with our expert interior design services.",
    approach:
      "We create interiors that balance aesthetics, functionality, and your unique style to deliver spaces that inspire and delight.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "engineering",
    title: "Engineering Services",
    description: "Technical expertise for complex design and construction challenges.",
    approach:
      "Our engineering services combine technical precision with innovative problem-solving to address complex design and construction challenges.",
    image: "/placeholder.svg?height=600&width=1200",
  },
]

// Sample data for service items
const serviceItems: Record<string, ServiceItem[]> = {
  consulting: [
    {
      slug: "business-strategy",
      title: "Business Strategy",
      description: "Strategic planning and analysis to guide your design and construction business.",
      image: "/placeholder.svg?height=500&width=1200",
      sections: [
        {
          title: "How We Can Help",
          content:
            "Our strategic consulting approach combines industry expertise with analytical rigor to deliver practical, implementable strategies tailored to your specific needs.",
          features: [
            "Vision and mission development",
            "Long-term business planning",
            "Goal setting and KPI development",
            "Strategic roadmap creation",
          ],
        },
        {
          title: "Our Process",
          content:
            "We follow a structured approach to developing your business strategy, from initial discovery to implementation support.",
          featuresTitle: "Process Steps",
          features: [
            "Discovery: Understanding your business, goals, and challenges",
            "Analysis: Market research and competitive analysis",
            "Strategy: Developing tailored strategic recommendations",
            "Implementation: Action plan development and execution support",
          ],
        },
      ],
      relatedServices: [
        {
          category: "consulting",
          slug: "market-analysis",
          title: "Market Analysis",
          description: "In-depth market research to identify opportunities and trends",
        },
        {
          category: "consulting",
          slug: "project-planning",
          title: "Project Planning",
          description: "Comprehensive project planning to ensure successful execution",
        },
        {
          category: "consulting",
          slug: "feasibility-studies",
          title: "Feasibility Studies",
          description: "Detailed analysis to determine project viability and potential challenges",
        },
      ],
    },
    {
      slug: "market-analysis",
      title: "Market Analysis",
      description:
        "In-depth market research to identify opportunities and trends in the design and construction industry.",
      image: "/placeholder.svg?height=500&width=1200",
      sections: [
        {
          title: "Comprehensive Research",
          content:
            "Our market analysis provides detailed insights into market trends, competitor positioning, and growth opportunities specific to your sector.",
          features: [
            "Industry trend analysis",
            "Competitor benchmarking",
            "Target market identification",
            "Growth opportunity assessment",
          ],
        },
      ],
    },
    // More consulting services would be added here
  ],
  "project-management": [
    {
      slug: "timeline",
      title: "Timeline Management",
      description: "Effective scheduling and timeline control for on-time project delivery.",
      image: "/placeholder.svg?height=500&width=1200",
      sections: [
        {
          title: "Scheduling Excellence",
          content:
            "Our timeline management ensures your projects stay on schedule through detailed planning and proactive monitoring.",
          features: [
            "Detailed project scheduling",
            "Critical path analysis",
            "Milestone tracking",
            "Resource timeline coordination",
          ],
        },
      ],
    },
    // More project management services would be added here
  ],
  // More service categories would be added here
}

// Functions to get data
export function getServiceCategory(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug)
}

export function getServiceItemsByCategory(categorySlug: string): ServiceItem[] {
  return serviceItems[categorySlug] || []
}

export function getServiceData(categorySlug: string, itemSlug: string): ServiceItem | undefined {
  const items = serviceItems[categorySlug] || []
  return items.find((item) => item.slug === itemSlug)
}

