import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const featuredProjects = [
  {
    title: "Modern Luxury Villa",
    category: "Residential",
    description: "A contemporary luxury villa with sustainable features and panoramic views",
    image: "/sleek-coastal-retreat.png",
    href: "/portfolio/residential/modern-luxury-villa",
  },
  {
    title: "Corporate Headquarters",
    category: "Commercial",
    description: "An innovative office space designed for collaboration and productivity",
    image: "/modern-city-skyline.png",
    href: "/portfolio/commercial/corporate-headquarters",
  },
  {
    title: "Boutique Hotel",
    category: "Hospitality",
    description: "A unique boutique hotel that blends local culture with modern amenities",
    image: "/urban-chic-retreat.png",
    href: "/portfolio/hospitality/boutique-hotel",
  },
]

const portfolioCategories = [
  {
    title: "Residential Projects",
    description: "Luxury homes, apartments, and residential developments",
    image: "/modern-family-home.png",
    href: "/portfolio/residential",
  },
  {
    title: "Commercial Projects",
    description: "Office spaces, retail environments, and commercial buildings",
    image: "/modern-urban-marketplace.png",
    href: "/portfolio/commercial",
  },
  {
    title: "Hospitality Projects",
    description: "Hotels, resorts, restaurants, and entertainment venues",
    image: "/placeholder.svg?height=300&width=500&query=hospitality design",
    href: "/portfolio/hospitality",
  },
  {
    title: "Institutional Projects",
    description: "Educational facilities, healthcare buildings, and public institutions",
    image: "/placeholder.svg?height=300&width=500&query=institutional architecture",
    href: "/portfolio/institutional",
  },
  {
    title: "Urban Design",
    description: "Master planning, urban spaces, and community developments",
    image: "/placeholder.svg?height=300&width=500&query=urban design",
    href: "/portfolio/urban-design",
  },
  {
    title: "Interior Design",
    description: "Residential and commercial interior design projects",
    image: "/placeholder.svg?height=300&width=500&query=interior design",
    href: "/portfolio/interior-design",
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#003087] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl mb-8">
              Explore our diverse collection of award-winning projects spanning residential, commercial, hospitality,
              and institutional sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#categories"
                className="px-6 py-3 bg-white text-[#003087] rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Browse by Category
              </Link>
              <Link
                href="#featured"
                className="px-6 py-3 border-2 border-white rounded-full font-medium hover:bg-white hover:text-[#003087] transition-colors"
              >
                Featured Projects
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
          <div className="relative h-full w-full">
            <Image
              src="/inverseWhiteLogo.png"
              alt="Portfolio showcase"
              fill
              className="object-contain object-right-bottom"
            />
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div id="featured" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg">
              Highlighting our most innovative and impactful design solutions across various sectors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 bg-[#003087] text-white px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#003087]">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Link
                    href={project.href}
                    className="inline-flex items-center text-[#003087] font-medium hover:underline"
                  >
                    View Project
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio/all"
              className="inline-block px-6 py-3 border-2 border-[#003087] text-[#003087] rounded-full font-medium hover:bg-[#003087] hover:text-white transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div id="categories" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 text-lg">
              Explore our projects by sector to discover our specialized expertise in different areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2"
              >
                <div className="relative h-48">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-[#003087]">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link
                    href={category.href}
                    className="inline-flex items-center text-[#003087] font-medium hover:underline"
                  >
                    View Projects
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#003087] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with our expertise in design and architecture
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-[#003087] rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  )
}
