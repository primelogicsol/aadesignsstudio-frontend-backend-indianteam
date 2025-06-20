// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useEffect, useRef, useState } from "react"

// type SubNavItem = {
//   label: string
//   href: string
// }

// export function SubNavbar({
//   categorySlug,
//   itemSlug,
//   itemLabel,
//   subitems,
// }: {
//   categorySlug: string
//   itemSlug: string
//   itemLabel: string
//   subitems: { _id?: string; label: string; href: string }[]
// }) {
//   const pathname = usePathname()
//   const [activeItem, setActiveItem] = useState<string>("")
//   const [isSticky, setIsSticky] = useState(false)
//   const subnavRef = useRef<HTMLDivElement>(null)
//   const observerRef = useRef<IntersectionObserver | null>(null)
//   const stickyTriggerRef = useRef<HTMLDivElement>(null)

//   const getSubitemSlug = (href: string) => {
//     const parts = href.split("/")
//     return parts[parts.length - 1]
//   }

//   const formattedSubitems: SubNavItem[] = subitems.map((subitem) => ({
//     label: subitem.label,
//     href: `/${categorySlug}/${itemSlug}/${getSubitemSlug(subitem.href)}`,
//   }))

//   useEffect(() => {
//     const currentSubitem = formattedSubitems.find((item) => pathname === item.href)
//     setActiveItem(currentSubitem?.href || "")
//   }, [pathname, formattedSubitems])

//   useEffect(() => {
//     if (observerRef.current) {
//       observerRef.current.disconnect()
//     }
//     observerRef.current = new IntersectionObserver(
//       ([entry]) => {
//         setIsSticky(!entry.isIntersecting)
//       },
//       {
//         threshold: 0,
//         rootMargin: "-64px 0px 0px 0px",
//       },
//     )
//     if (stickyTriggerRef.current) {
//       observerRef.current.observe(stickyTriggerRef.current)
//     }
//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect()
//       }
//     }
//   }, [])

//   if (formattedSubitems.length === 0) {
//     return null
//   }

//   return (
//     <>
//       <div ref={stickyTriggerRef} className="h-0 w-full" />
//       <div
//         ref={subnavRef}
//         className={`bg-[#003087] shadow-md z-40 transition-all duration-300 ${
//           isSticky ? "fixed top-14 left-0 right-0" : "relative"
//         }`}
//         id="sub-navbar"
//       >
//         <div className="container mx-auto px-2 sm:px-4">
//           <div className="flex justify-start sm:justify-center items-center overflow-x-auto scrollbar-thin scrollbar-thumb-[#004db3] scrollbar-track-transparent">
//             {formattedSubitems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`px-4 py-3 sm:px-6 sm:py-4 text-white font-medium text-sm sm:text-base transition-all hover:bg-[#004db3] whitespace-nowrap ${
//                   activeItem === item.href
//                     ? "bg-[#004db3] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#ff5e14]"
//                     : ""
//                 }`}
//                 style={{ position: "relative" }}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//       {isSticky && <div style={{ height: subnavRef.current?.offsetHeight || 56 }} />}
//       <style jsx global>{`
//         /* Optional: Hide scrollbar on mobile for cleaner look */
//         @media (max-width: 640px) {
//           #sub-navbar .scrollbar-thin {
//             scrollbar-width: none;
//             -ms-overflow-style: none;
//           }
//           #sub-navbar .scrollbar-thin::-webkit-scrollbar {
//             display: none;
//           }
//         }
//       `}</style>
//     </>
//   )
// }

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

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

  const getSubitemSlug = (href: string) => href.split("/").pop() || ""

  const formattedSubitems: SubNavItem[] = subitems.map((subitem) => ({
    label: subitem.label,
    href: `/${categorySlug}/${itemSlug}/${getSubitemSlug(subitem.href)}`,
  }))

  useEffect(() => {
    const currentSubitem = formattedSubitems.find((item) => pathname === item.href)
    setActiveItem(currentSubitem?.href || "")
  }, [pathname, formattedSubitems])

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    )

    if (stickyTriggerRef.current) {
      observerRef.current.observe(stickyTriggerRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [])

  if (formattedSubitems.length === 0) return null

  return (
    <>
      <div ref={stickyTriggerRef} className="h-0 w-full" />

      <div
        ref={subnavRef}
        className={`bg-[#003087] shadow-md z-40 transition-all duration-300 ${
          isSticky ? "fixed top-14 left-0 right-0" : "relative"
        }`}
        id="sub-navbar"
      >
        <div className="container mx-auto px-4">
          <div
            className="flex gap-2 sm:gap-4 items-center overflow-x-auto scroll-smooth scrollbar-hide py-2 sm:py-4"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {formattedSubitems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-white font-medium rounded-md transition-all whitespace-nowrap scroll-snap-align-start ${
                  activeItem === item.href
                    ? "bg-[#004db3] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#ff5e14]"
                    : "hover:bg-[#004db3]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isSticky && <div style={{ height: subnavRef.current?.offsetHeight || 56 }} />}
    </>
  )
}
