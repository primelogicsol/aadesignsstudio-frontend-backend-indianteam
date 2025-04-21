"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubItem {
  _id?: string
  label: string
  href: string
}

interface Item {
  _id?: string
  label: string
  href: string
  subitems: SubItem[]
}

interface Initiative {
  _id?: string
  label: string
  href: string
  image: string
}

interface Category {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  items: Item[]
  globalInitiatives: Initiative[]
}

interface NavbarClientProps {
  categories: Category[]
}

export function NavbarClient({ categories }: NavbarClientProps) {
  // Add scrollProgress state and calculation
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleMouseEnter = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  const handleMouseLeave = () => {
    setActiveCategory(null)
  }

  // Helper function to extract item slug from href
  const getItemSlug = (href: string) => {
    const parts = href.split("/")
    return parts[parts.length - 1]
  }

  // Add scroll event listener with progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight

      // Calculate scroll percentage
      const scrollPercentage = (scrollPosition / windowHeight) * 100
      setScrollProgress(scrollPercentage)

      if (scrollPosition > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#003087] shadow-lg h-14" : "bg-white shadow-sm h-16"
        }`}
    >
      {scrolled && (
        <div
          className="absolute top-0 left-0 h-0.5 bg-[#ff5e14] transition-all duration-300"
          style={{
            width: `${scrollProgress}%`,
          }}
        ></div>
      )}
      <div className="container mx-auto px-4 h-full">
        <div className={`flex items-center justify-between h-full transition-all duration-300`}>
          {/* Logo with animation */}
          <div className="flex-shrink-0 transform transition-all duration-300">
            <Link href="/" className="flex items-center">
              {scrolled ?
                <Image
                  src="/inverseWhiteLogo.png"
                  alt="AA Design Studio"
                  width={80}
                  height={5}
                  className="rounded-md object-cover"
                />
                :
                <Image
                  src="/LogoNew.png"
                  alt="AA Design Studio"
                  width={80}
                  height={5}
                  className="rounded-md object-cover"
                />

              }

            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${scrolled
                    ? "text-white hover:text-gray-200 transform hover:-translate-y-0.5"
                    : "text-gray-900 hover:text-gray-600"
                  }`}
              >
                Home
              </Link>

              {categories.map((category) => (
                <div
                  key={category._id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(category._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-300 ${activeCategory === category._id
                        ? scrolled
                          ? "text-gray-200"
                          : "text-gray-600"
                        : scrolled
                          ? "text-white"
                          : "text-gray-900"
                      } ${scrolled ? "hover:text-gray-200 transform hover:-translate-y-0.5" : "hover:text-gray-600"}`}
                  >
                    {category.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${scrolled ? "transform group-hover:rotate-180" : ""}`}
                    />
                  </button>
                </div>
              ))}

              {/* <Link
                href="/tasks"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-white hover:text-gray-200 transform hover:-translate-y-0.5"
                    : "text-gray-900 hover:text-gray-600"
                }`}
              >
                Tasks
              </Link> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              className={scrolled ? "text-white hover:bg-[#004db3]" : ""}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdowns */}
      {categories.map((category) => (
        <div
          key={`dropdown-${category._id}`}
          className={`absolute left-0 w-full bg-white shadow-lg z-50 transition-all duration-300 ${activeCategory === category._id
              ? "opacity-100 visible transform translate-y-0"
              : "opacity-0 invisible transform -translate-y-2"
            }`}
          onMouseEnter={() => handleMouseEnter(category._id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Category Info and Items */}
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-1">
                <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
                {category.image && (
                  <div className="mt-4">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={200}
                      height={150}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Vertical Separator */}
              <div className="w-px bg-gray-200 h-full mx-4"></div>

              <div className="col-span-2">
                <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                  {category.items.map((item) => (
                    <div key={item._id || item.label} className="mb-4">
                      <h4 className="font-medium text-gray-900">
                        <Link href={`/${category.slug}/${getItemSlug(item.href)}`} className="hover:underline">
                          {item.label}
                        </Link>
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Separator and Initiatives */}
            {category.globalInitiatives && category.globalInitiatives.length > 0 && (
              <>
                <div className="h-px bg-gray-200 my-6"></div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Initiatives</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {category.globalInitiatives.map((initiative) => (
                      <Link
                        key={initiative._id || initiative.label}
                        href={initiative.href}
                        className="flex items-center gap-3 group"
                      >
                        {initiative.image && (
                          <div className="h-12 w-12 relative flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={initiative.image || "/placeholder.svg"}
                              alt={initiative.label}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-gray-600">{initiative.label}</h4>
                          <p className="text-xs text-gray-500">Learn more</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Mobile menu - updated to use new URL structure */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${scrolled ? "bg-[#003087]" : "bg-white"}`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`block px-3 py-2 text-base font-medium ${scrolled ? "text-white hover:bg-[#004db3]" : "text-gray-900 hover:bg-gray-50"
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {categories.map((category) => (
              <MobileCategory
                key={category._id}
                category={category}
                onNavigate={() => setMobileMenuOpen(false)}
                scrolled={scrolled}
              />
            ))}

            <Link
              href="/tasks"
              className={`block px-3 py-2 text-base font-medium ${scrolled ? "text-white hover:bg-[#004db3]" : "text-gray-900 hover:bg-gray-50"
                }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tasks
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

// Mobile category component with accordion-like behavior
function MobileCategory({
  category,
  onNavigate,
  scrolled,
}: {
  category: Category
  onNavigate: () => void
  scrolled: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Helper function to extract item slug from href
  const getItemSlug = (href: string) => {
    const parts = href.split("/")
    return parts[parts.length - 1]
  }

  return (
    <div>
      <button
        className={`flex w-full items-center justify-between px-3 py-2 text-base font-medium ${scrolled ? "text-white hover:bg-[#004db3]" : "text-gray-900 hover:bg-gray-50"
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {category.name}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="ml-4 space-y-1">
          {/* Only show main items, not subitems */}
          {category.items.map((item) => (
            <Link
              key={item._id || item.label}
              href={`/${category.slug}/${getItemSlug(item.href)}`}
              className={`block px-3 py-2 text-sm ${scrolled ? "text-gray-200 hover:bg-[#004db3]" : "text-gray-600 hover:bg-gray-50"
                }`}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          ))}

          {category.globalInitiatives && category.globalInitiatives.length > 0 && (
            <>
              <div className={`my-2 h-px ${scrolled ? "bg-gray-600" : "bg-gray-200"}`}></div>
              <div className={`my-1 px-3 text-xs font-semibold ${scrolled ? "text-gray-300" : "text-gray-500"}`}>
                Initiatives
              </div>
              {category.globalInitiatives.map((initiative) => (
                <Link
                  key={initiative._id || initiative.label}
                  href={initiative.href}
                  className={`flex items-center gap-2 px-3 py-2 text-sm ${scrolled ? "text-gray-200 hover:bg-[#004db3]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  onClick={onNavigate}
                >
                  {initiative.image && (
                    <div className="h-4 w-4 relative flex-shrink-0">
                      <Image
                        src={initiative.image || "/placeholder.svg"}
                        alt={initiative.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  {initiative.label}
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
