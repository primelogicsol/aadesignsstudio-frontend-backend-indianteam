export interface TabContent {
  title: string
  image: string
  content: string
  hasForm?: boolean
}

export interface PlanningWork {
  title: string
  description: string
  features: string[]
}

export interface ServiceDetail {
  id: string
  title: string
  content: string
  planningWork: PlanningWork
  additionalInfo: string
  additionalFeatures: string[]
  tabContent: {
    materials: TabContent
    design: TabContent
    care: TabContent
    support: TabContent & { hasForm?: boolean }
  }
  coverImage?: string // Add this line
}

export interface ServiceCategory {
  name: string
  slug: string
  active?: boolean
}

export const serviceCategories: ServiceCategory[] = [
  { name: "Interior Design", slug: "interior-design", active: true },
  { name: "Architecture", slug: "architecture" },
  { name: "Planning", slug: "planning" },
  { name: "Decoration", slug: "decoration" },
  { name: "Furniture", slug: "furniture" },
  { name: "Renovation", slug: "renovation" },
]
