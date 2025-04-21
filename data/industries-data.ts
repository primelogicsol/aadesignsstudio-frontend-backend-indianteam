// Types for industries
export interface IndustryItem {
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
  caseStudies?: {
    title: string
    description: string
    slug: string
  }[]
}

export interface IndustryCategory {
  slug: string
  title: string
  description: string
  subtitle?: string
  overview?: string
  image?: string
}

// Sample data for industry categories
export const industryCategories: IndustryCategory[] = [
  {
    slug: "residential-luxury-homes",
    title: "Residential & Luxury Homes",
    description: "Exceptional design for distinctive residential properties.",
    overview:
      "We create beautiful, functional homes that reflect the lifestyle and aspirations of our clients, from luxury villas to smart homes and eco-friendly residences.",
    image: "/luxury.jpg",
  },
  {
    slug: "corporate-office-spaces",
    title: "Corporate & Office Spaces",
    description: "Functional and inspiring workspaces for productivity.",
    overview:
      "Our corporate design solutions create workspaces that enhance productivity, foster collaboration, and reflect your company's brand and culture.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "retail-commercial",
    title: "Retail & Commercial",
    description: "Engaging environments that enhance customer experience.",
    overview:
      "We design retail and commercial spaces that create memorable customer experiences, maximize sales potential, and strengthen brand identity.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "hospitality-tourism",
    title: "Hospitality & Tourism",
    description: "Creating memorable experiences through thoughtful design.",
    overview:
      "Our hospitality designs focus on creating immersive, memorable experiences that delight guests while maximizing operational efficiency.",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    slug: "healthcare-wellness",
    title: "Healthcare & Wellness",
    description: "Healing environments that promote wellbeing.",
    overview:
      "We create healthcare environments that promote healing, enhance efficiency, and improve experiences for patients, staff, and visitors.",
    image: "/placeholder.svg?height=600&width=1200",
  },
]

// Sample data for industry items
const industryItems: Record<string, IndustryItem[]> = {
  "residential-luxury-homes": [
    {
      slug: "luxury-villas",
      title: "Luxury Villas",
      description: "Exclusive villa designs that blend luxury with functionality.",
      image: "/luxury1.jpg",
      sections: [
        {
          title: "Bespoke Villa Design",
          content:
            "Our luxury villa designs combine stunning aesthetics with practical functionality, creating homes that are as livable as they are beautiful.",
          features: [
            "Custom architectural designs",
            "Premium material selection",
            "Integrated smart home technology",
            "Indoor-outdoor living spaces",
          ],
        },
        {
          title: "Our Approach to Luxury",
          content:
            "We believe that true luxury lies in the details, from thoughtful space planning to exquisite finishes and custom elements.",
          image: "/luxury1.jpg",
        },
      ],
      caseStudies: [
        {
          title: "Oceanfront Villa",
          description: "A stunning modern villa designed to maximize views while providing privacy and comfort.",
          slug: "oceanfront-villa",
        },
        {
          title: "Mountain Retreat",
          description:
            "A luxury mountain home that blends with its natural surroundings while offering premium amenities.",
          slug: "mountain-retreat",
        },
      ],
    },
    {
      slug: "penthouses",
      title: "Penthouses",
      description: "Sophisticated penthouse designs with panoramic views and premium finishes.",
      image: "/placeholder.svg?height=500&width=1200",
      sections: [
        {
          title: "Urban Luxury Living",
          content:
            "Our penthouse designs create the ultimate urban retreats, with expansive views, premium materials, and thoughtful space planning.",
          features: [
            "Open concept floor plans",
            "Luxury material palettes",
            "Custom storage solutions",
            "Smart home integration",
          ],
        },
      ],
    },
    // More residential items would be added here
  ],
  "corporate-office-spaces": [
    {
      slug: "open-offices",
      title: "Open Offices",
      description: "Dynamic, collaborative workspaces designed for modern business needs.",
      image: "/placeholder.svg?height=500&width=1200",
      sections: [
        {
          title: "Collaborative Environments",
          content:
            "Our open office designs balance collaborative spaces with areas for focused work, creating environments that support diverse work styles.",
          features: [
            "Flexible workstation configurations",
            "Collaboration zones",
            "Privacy solutions",
            "Acoustic management",
          ],
        },
      ],
    },
    // More corporate office items would be added here
  ],
  // More industry categories would be added here
}

// Functions to get data
export function getIndustryCategory(slug: string): IndustryCategory | undefined {
  return industryCategories.find((category) => category.slug === slug)
}

export function getIndustryItemsByCategory(categorySlug: string): IndustryItem[] {
  return industryItems[categorySlug] || []
}

export function getIndustryData(categorySlug: string, itemSlug: string): IndustryItem | undefined {
  const items = industryItems[categorySlug] || []
  return items.find((item) => item.slug === itemSlug)
}

