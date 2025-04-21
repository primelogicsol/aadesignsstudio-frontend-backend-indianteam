"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"

type SubNavItem = {
  label: string
  href: string
}

export function SubNavbar({
  categorySlug,
  itemSlug,
  itemLabel,
  subitems,
}: {
  categorySlug: string
  itemSlug: string
  itemLabel: string
  subitems: { _id?: string; label: string; href: string }[]
}) {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<string>("")
  const [isSticky, setIsSticky] = useState(false)
  const subnavRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const stickyTriggerRef = useRef<HTMLDivElement>(null)

  // Helper function to extract subitem slug from href
  const getSubitemSlug = (href: string) => {
    const parts = href.split("/")
    return parts[parts.length - 1]
  }

  // Format subitems for the navigation
  const formattedSubitems: SubNavItem[] = subitems.map((subitem) => ({
    label: subitem.label,
    href: `/${categorySlug}/${itemSlug}/${getSubitemSlug(subitem.href)}`,
  }))

  // Set active item based on current path
  useEffect(() => {
    const currentSubitem = formattedSubitems.find((item) => pathname === item.href)
    setActiveItem(currentSubitem?.href || "")
  }, [pathname, formattedSubitems])

  // Set up intersection observer to detect when subnavbar should become sticky
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // When the trigger element is not intersecting (out of view), make the subnavbar sticky
        setIsSticky(!entry.isIntersecting)
      },
      {
        // The threshold value of 0 means the callback will be executed as soon as the element is out of view
        threshold: 0,
        // The rootMargin value of "-64px 0px 0px 0px" accounts for the navbar height
        rootMargin: "-64px 0px 0px 0px", // Adjust based on navbar height
      },
    )

    // Start observing the trigger element
    if (stickyTriggerRef.current) {
      observerRef.current.observe(stickyTriggerRef.current)
    }

    // Clean up observer on component unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Don't render if no subitems
  if (formattedSubitems.length === 0) {
    return null
  }

  return (
    <>
      {/* Invisible element that triggers the sticky behavior */}
      <div ref={stickyTriggerRef} className="h-0 w-full" />

      {/* The actual subnavbar */}
      <div
        ref={subnavRef}
        className={`bg-[#003087] shadow-md z-40 transition-all duration-300 ${
          isSticky ? "fixed top-14 left-0 right-0" : "relative"
        }`}
        id="sub-navbar"
      >
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex justify-center items-center">
            {formattedSubitems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-4 text-white font-medium transition-all hover:bg-[#004db3] whitespace-nowrap ${
                  activeItem === item.href
                    ? "bg-[#004db3] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#ff5e14]"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer div to prevent content jump when subnavbar becomes fixed */}
      {isSticky && <div style={{ height: subnavRef.current?.offsetHeight || 56 }} />}
    </>
  )
}
