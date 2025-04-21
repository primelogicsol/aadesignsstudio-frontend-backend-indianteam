export interface ServiceCategory {
  name: string
  slug: string
  active: boolean
}

export const serviceCategories: ServiceCategory[] = [
  { name: "General Contracting", slug: "general-contracting", active: true },
  { name: "Material Management", slug: "material-management", active: false },
  { name: "Building Renovation", slug: "building-renovation", active: false },
  { name: "Architecture Design", slug: "architecture-design", active: false },
  { name: "Multistory Build", slug: "multistory-build", active: false },
]

