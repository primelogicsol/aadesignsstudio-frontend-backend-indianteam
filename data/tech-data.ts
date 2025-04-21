export interface TechItem {
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
  tutorials?: {
    title: string
    description: string
    link: string
  }[]
}

export interface TechCategory {
  slug: string
  title: string
  description: string
  subtitle?: string
  overview?: string
  image?: string
}

// Sample data for tech categories
export const techCategories: TechCategory[] = [
  {
    slug: "design-drafting",
    title: "Design & Drafting Software",
    description: "Professional tools for architectural and design drafting.",
    overview:
      "Choosing the right design and drafting software is crucial for project success. The appropriate tools allow our designers to create precise technical drawings, develop detailed 3D models, collaborate effectively, and ensure design accuracy.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "landscape-design",
    title: "Landscape Design Software",
    description: "Specialized tools for landscape architecture and planning.",
    overview:
      "Landscape design software provides specialized tools for creating beautiful, functional outdoor spaces, from initial concept through detailed planting plans and 3D visualization.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "project-management",
    title: "Project Management Tools",
    description: "Digital solutions for efficient project coordination and management.",
    overview:
      "Effective project management tools streamline communication, track progress, manage resources, and keep your projects on time and within budget.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "rendering-visualization",
    title: "Rendering & Visualization",
    description: "Advanced tools to bring your designs to life with photorealistic rendering.",
    overview:
      "Visualization tools allow designers to communicate ideas effectively, validate design decisions, and provide clients with realistic previews of finished spaces.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "surveying-gis",
    title: "Surveying & GIS Tools",
    description: "Precision mapping and geographical information systems.",
    overview:
      "Surveying and GIS tools provide accurate spatial data for site analysis, planning, and construction, ensuring projects are precisely aligned with their environment.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "visualization-ar",
    title: "Visualization & AR Tools",
    description: "Immersive experiences with augmented reality technology.",
    overview:
      "Visualization and AR tools allow clients to experience designs in a realistic, interactive way, improving communication and decision-making.",
    image: "/placeholder.svg?height=600&width=1200",
  },
]

// Sample data for tech items
const techItems: Record<string, TechItem[]> = {
  "design-drafting": [
    {
      slug: "autocad",
      title: "AutoCAD",
      description: "Industry-standard CAD software for precise 2D and 3D design and drafting.",
      image: "/placeholder.svg?height=500&width=1200",
      sections: [
        {
          title: "AutoCAD Features",
          content:
            "AutoCAD is a versatile computer-aided design and drafting software that offers powerful tools for precision design, documentation, and collaboration.",
          features: [
            "Precise 2D drafting and documentation",
            "3D modeling and visualization",
            "Industry-specific toolsets",
            "Customizable user interface",
          ],
        },
        {
          title: "How We Use AutoCAD",
          content:
            "Our team uses AutoCAD to create detailed construction documents, precise technical drawings, and to collaborate effectively across disciplines.",
          image: "/placeholder.svg?height=400&width=700",
        },
      ],
      tutorials: [
        {
          title: "Getting Started with AutoCAD",
          description: "Learn the basics of the AutoCAD interface and essential commands.",
          link: "/tutorials/autocad-basics",
        },
        {
          title: "Advanced AutoCAD Techniques",
          description: "Master advanced features and workflows for complex projects.",
          link: "/tutorials/advanced-autocad",
        },
      ],
    },
    {
      slug: "sketchup",
      title: "SketchUp",
      description: "User-friendly 3D modeling software for architecture, interior design, and more.",
      image: "/placeholder.svg?height=500&width=1200",
      sections: [
        {
          title: "SketchUp Features",
          content:
            "SketchUp offers intuitive 3D modeling capabilities that make it easy to create, modify, and share design concepts quickly.",
          features: [
            "Intuitive 3D modeling",
            "Extensive component library",
            "Quick visualization capabilities",
            "Easy to learn and use",
          ],
        },
      ],
    },
    // More design-drafting items would be added here
  ],
  "landscape-design": [
    {
      slug: "land-fx",
      title: "Land F/X",
      description: "Specialized landscape and irrigation design software for professional landscape architects.",
      image: "/placeholder.svg?height=500&width=1200",
      sections: [
        {
          title: "Land F/X Features",
          content:
            "Land F/X streamlines landscape design with powerful plant databases, irrigation design tools, and automated scheduling capabilities.",
          features: [
            "Comprehensive plant database",
            "Automated plant scheduling",
            "Irrigation design tools",
            "Integration with CAD software",
          ],
        },
      ],
    },
    // More landscape design items would be added here
  ],
  // More tech categories would be added here
}

// Functions to get data
export function getTechCategory(slug: string): TechCategory | undefined {
  return techCategories.find((category) => category.slug === slug)
}

export function getTechItemsByCategory(categorySlug: string): TechItem[] {
  return techItems[categorySlug] || []
}

export function getTechData(categorySlug: string, itemSlug: string): TechItem | undefined {
  const items = techItems[categorySlug] || []
  return items.find((item) => item.slug === itemSlug)
}

