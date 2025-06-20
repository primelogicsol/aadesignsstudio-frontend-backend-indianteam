import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import ProjectDetailPage from "@/components/ProjectDetailPage"

const featuredProjects = [
  {
    title: "Modern Luxury Villa",
    category: "Residential",
    description: "A contemporary luxury villa with sustainable features and panoramic views",
    image: "https://images.pexels.com/photos/30613494/pexels-photo-30613494/free-photo-of-scenic-coastal-houses-in-catalonia-spain.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/residential/modern-luxury-villa",
  },
  {
    title: "Corporate Headquarters",
    category: "Commercial",
    description: "An innovative office space designed for collaboration and productivity",
    image: "https://images.pexels.com/photos/13965387/pexels-photo-13965387.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/commercial/corporate-headquarters",
  },
  {
    title: "Boutique Hotel",
    category: "Hospitality",
    description: "A unique boutique hotel that blends local culture with modern amenities",
    image: "https://images.pexels.com/photos/17926439/pexels-photo-17926439/free-photo-of-follow-me-on-insta-for-more-https-www-instagram-com-mikita-yo.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/hospitality/boutique-hotel",
  },
]

const portfolioCategories = [
  {
    title: "Residential Projects",
    description: "Luxury homes, apartments, and residential developments",
    image: "https://images.pexels.com/photos/11567360/pexels-photo-11567360.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/residential",
  },
  {
    title: "Commercial Projects",
    description: "Office spaces, retail environments, and commercial buildings",
    image: "https://images.pexels.com/photos/31959652/pexels-photo-31959652/free-photo-of-modern-dockland-office-building-in-hamburg-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/commercial",
  },
  {
    title: "Hospitality Projects",
    description: "Hotels, resorts, restaurants, and entertainment venues",
    image: "https://images.pexels.com/photos/15010963/pexels-photo-15010963/free-photo-of-the-interior-of-the-vinero-winery-and-hotel-in-canakkale-turkey.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/hospitality",
  },
  {
    title: "Institutional Projects",
    description: "Educational facilities, healthcare buildings, and public institutions",
    image: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/institutional",
  },
  {
    title: "Urban Design",
    description: "Master planning, urban spaces, and community developments",
    image: "https://images.pexels.com/photos/16533461/pexels-photo-16533461/free-photo-of-a-man-on-a-ladder-cleaning-the-outside-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/urban-design",
  },
  {
    title: "Interior Design",
    description: "Residential and commercial interior design projects",
    image: "https://images.pexels.com/photos/18781441/pexels-photo-18781441/free-photo-of-a-restaurant-with-a-large-bar-and-tables.jpeg?auto=compress&cs=tinysrgb&w=600",
    href: "/portfolio/interior-design",
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#003087] text-white py-24">
        <div className="container mx-auto px-4">
          <div >

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl mb-8">
              Explore our diverse collection of award-winning projects spanning residential, commercial, hospitality,
              and institutional sectors.
            </p>

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
              <Image src={project.image} alt={project.title} fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-[#003087] text-white px-3 py-1 rounded-full text-sm">
                {project.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-[#003087]">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <Link
                href={{
                  pathname: "/projectDetail",
                  query: {
                    title: project.title,
                    description: project.description,
                    image: project.image,
                    category: project.category,
                  },
                }}
                className="inline-flex items-center text-[#003087] font-medium hover:underline"
              >
                View Project
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
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
            {portfolioCategories.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2"
          >
            <div className="relative h-64">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-[#003087] text-white px-3 py-1 rounded-full text-sm">
                {project.title}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-[#003087]">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <Link
                href={{
                  pathname: "/projectDetail",
                  query: {
                    title: project.title,
                    description: project.description,
                    image: project.image,
                    
                  },
                }}
                className="inline-flex items-center text-[#003087] font-medium hover:underline"
              >
                View Project
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
            href="/consultation"
            className="inline-block px-8 py-4 bg-white text-[#003087] rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  )
}
// // import Link from "next/link"
// // import Image from "next/image"
// // import { ArrowRight } from "lucide-react"
// // import { useRouter } from "next/router"

// // const featuredProjects = [
// //   {
// //     title: "Modern Luxury Villa",
// //     category: "Residential",
// //     description:
// //       "A contemporary luxury villa with sustainable features and panoramic views",
// //     image:
// //       "https://images.pexels.com/photos/30613494/pexels-photo-30613494/free-photo-of-scenic-coastal-houses-in-catalonia-spain.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/residential/modern-luxury-villa",
// //   },
// //   {
// //     title: "Corporate Headquarters",
// //     category: "Commercial",
// //     description:
// //       "An innovative office space designed for collaboration and productivity",
// //     image:
// //       "https://images.pexels.com/photos/13965387/pexels-photo-13965387.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/commercial/corporate-headquarters",
// //   },
// //   {
// //     title: "Boutique Hotel",
// //     category: "Hospitality",
// //     description:
// //       "A unique boutique hotel that blends local culture with modern amenities",
// //     image:
// //       "https://images.pexels.com/photos/17926439/pexels-photo-17926439/free-photo-of-follow-me-on-insta-for-more-https-www-instagram-com-mikita-yo.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/hospitality/boutique-hotel",
// //   },
// // ]

// // const portfolioCategories = [
// //   {
// //     title: "Residential Projects",
// //     description: "Luxury homes, apartments, and residential developments",
// //     image:
// //       "https://images.pexels.com/photos/11567360/pexels-photo-11567360.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/residential",
// //   },
// //   {
// //     title: "Commercial Projects",
// //     description: "Office spaces, retail environments, and commercial buildings",
// //     image:
// //       "https://images.pexels.com/photos/31959652/pexels-photo-31959652/free-photo-of-modern-dockland-office-building-in-hamburg-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/commercial",
// //   },
// //   {
// //     title: "Hospitality Projects",
// //     description: "Hotels, resorts, restaurants, and entertainment venues",
// //     image:
// //       "https://images.pexels.com/photos/15010963/pexels-photo-15010963/free-photo-of-the-interior-of-the-vinero-winery-and-hotel-in-canakkale-turkey.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/hospitality",
// //   },
// //   {
// //     title: "Institutional Projects",
// //     description: "Educational facilities, healthcare buildings, and public institutions",
// //     image:
// //       "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/institutional",
// //   },
// //   {
// //     title: "Urban Design",
// //     description: "Master planning, urban spaces, and community developments",
// //     image:
// //       "https://images.pexels.com/photos/16533461/pexels-photo-16533461/free-photo-of-a-man-on-a-ladder-cleaning-the-outside-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/urban-design",
// //   },
// //   {
// //     title: "Interior Design",
// //     description: "Residential and commercial interior design projects",
// //     image:
// //       "https://images.pexels.com/photos/18781441/pexels-photo-18781441/free-photo-of-a-restaurant-with-a-large-bar-and-tables.jpeg?auto=compress&cs=tinysrgb&w=600",
// //     href: "/portfolio/interior-design",
// //   },
// // ]

// // export default function PortfolioPage() {
// //   const router = useRouter()

// //   return (
// //     <div className="min-h-screen">
// //       {/* Hero Section */}
// //       <div className="relative bg-[#003087] text-white py-24">
// //         <div className="container mx-auto px-4">
// //           <div className="max-w-3xl">
// //             <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
// //             <p className="text-xl mb-8">
// //               Explore our diverse collection of award-winning projects spanning
// //               residential, commercial, hospitality, and institutional sectors.
// //             </p>
// //           </div>
// //         </div>
// //         <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
// //           <div className="relative h-full w-full">
// //             <Image
// //               src="/inverseWhiteLogo.png"
// //               alt="Portfolio showcase"
// //               fill
// //               className="object-contain object-right-bottom"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Featured Projects */}
// //       <div id="featured" className="py-20 bg-gray-50">
// //         <div className="container mx-auto px-4">
// //           <div className="max-w-4xl mx-auto mb-12 text-center">
// //             <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
// //             <p className="text-gray-600 text-lg">
// //               Highlighting our most innovative and impactful design solutions across
// //               various sectors
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
// //             {featuredProjects.map((project, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2"
// //               >
// //                 <div className="relative h-64">
// //                   <Image
// //                     src={project.image || "/placeholder.svg"}
// //                     alt={project.title}
// //                     fill
// //                     className="object-cover"
// //                   />
// //                   <div className="absolute top-4 left-4 bg-[#003087] text-white px-3 py-1 rounded-full text-sm">
// //                     {project.category}
// //                   </div>
// //                 </div>
// //                 <div className="p-6">
// //                   <h3 className="text-xl font-bold mb-2 text-[#003087]">
// //                     {project.title}
// //                   </h3>
// //                   <p className="text-gray-600 mb-4">{project.description}</p>
// //                   <Link
// //                     href={{ pathname: "/project-detail", query: { ...project } }}
// //                     className="inline-flex items-center text-[#003087] font-medium hover:underline"
// //                   >
// //                     View Project
// //                     <ArrowRight size={16} className="ml-2" />
// //                   </Link>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Categories */}
// //       <div id="categories" className="py-20">
// //         <div className="container mx-auto px-4">
// //           <div className="max-w-4xl mx-auto mb-12 text-center">
// //             <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
// //             <p className="text-gray-600 text-lg">
// //               Explore our projects by sector to discover our specialized expertise in
// //               different areas
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {portfolioCategories.map((category, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2"
// //               >
// //                 <div className="relative h-48">
// //                   <Image
// //                     src={category.image || "/placeholder.svg"}
// //                     alt={category.title}
// //                     fill
// //                     className="object-cover"
// //                   />
// //                 </div>
// //                 <div className="p-6">
// //                   <h3 className="text-xl font-bold mb-3 text-[#003087]">
// //                     {category.title}
// //                   </h3>
// //                   <p className="text-gray-600 mb-4">{category.description}</p>
// //                   <Link
// //                     href={category.href}
// //                     className="inline-flex items-center text-[#003087] font-medium hover:underline"
// //                   >
// //                     View Projects
// //                     <ArrowRight size={16} className="ml-2" />
// //                   </Link>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Call to Action */}
// //       <div className="bg-[#003087] text-white py-16">
// //         <div className="container mx-auto px-4 text-center">
// //           <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
// //           <p className="text-xl mb-8 max-w-2xl mx-auto">
// //             Let's collaborate to bring your vision to life with our expertise in
// //             design and architecture
// //           </p>
// //           <Link
// //             href="/consultation"
// //             className="inline-block px-8 py-4 bg-white text-[#003087] rounded-full font-medium hover:bg-gray-100 transition-colors"
// //           >
// //             Contact Us Today
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// import Link from "next/link"
// import Image from "next/image"
// import { ArrowRight } from "lucide-react"

// const featuredProjects = [
//   {
//     title: "Modern Luxury Villa",
//     category: "Residential",
//     description: "A contemporary luxury villa with sustainable features and panoramic views",
//     image: "https://images.pexels.com/photos/30613494/pexels-photo-30613494/free-photo-of-scenic-coastal-houses-in-catalonia-spain.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/residential/modern-luxury-villa",
//   },
//   {
//     title: "Corporate Headquarters",
//     category: "Commercial",
//     description:
//       "An innovative office space designed for collaboration and productivity",
//     image:
//       "https://images.pexels.com/photos/13965387/pexels-photo-13965387.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/commercial/corporate-headquarters",
//   },
//   {
//     title: "Boutique Hotel",
//     category: "Hospitality",
//     description:
//       "A unique boutique hotel that blends local culture with modern amenities",
//     image:
//       "https://images.pexels.com/photos/17926439/pexels-photo-17926439/free-photo-of-follow-me-on-insta-for-more-https-www-instagram-com-mikita-yo.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/hospitality/boutique-hotel",
//   },
// ]

// const portfolioCategories = [
//   {
//     title: "Residential Projects",
//     description: "Luxury homes, apartments, and residential developments",
//     image:
//       "https://images.pexels.com/photos/11567360/pexels-photo-11567360.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/residential",
//   },
//   {
//     title: "Commercial Projects",
//     description: "Office spaces, retail environments, and commercial buildings",
//     image:
//       "https://images.pexels.com/photos/31959652/pexels-photo-31959652/free-photo-of-modern-dockland-office-building-in-hamburg-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/commercial",
//   },
//   {
//     title: "Hospitality Projects",
//     description: "Hotels, resorts, restaurants, and entertainment venues",
//     image:
//       "https://images.pexels.com/photos/15010963/pexels-photo-15010963/free-photo-of-the-interior-of-the-vinero-winery-and-hotel-in-canakkale-turkey.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/hospitality",
//   },
//   {
//     title: "Institutional Projects",
//     description: "Educational facilities, healthcare buildings, and public institutions",
//     image:
//       "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/institutional",
//   },
//   {
//     title: "Urban Design",
//     description: "Master planning, urban spaces, and community developments",
//     image:
//       "https://images.pexels.com/photos/16533461/pexels-photo-16533461/free-photo-of-a-man-on-a-ladder-cleaning-the-outside-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/urban-design",
//   },
//   {
//     title: "Interior Design",
//     description: "Residential and commercial interior design projects",
//     image:
//       "https://images.pexels.com/photos/18781441/pexels-photo-18781441/free-photo-of-a-restaurant-with-a-large-bar-and-tables.jpeg?auto=compress&cs=tinysrgb&w=600",
//     href: "/portfolio/interior-design",
//   },
// ]
// export default function PortfolioPage() {
//   return (
//    <div className="min-h-screen">
//        {/* Hero Section */}
//        <div className="relative bg-[#003087] text-white py-24">
//          <div className="container mx-auto px-4">
//            <div className="max-w-3xl">
//              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
//              <p className="text-xl mb-8">
//                Explore our diverse collection of award-winning projects spanning residential, commercial, hospitality,
//                and institutional sectors.
//              </p>

//            </div>
//          </div>
//          <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
//            <div className="relative h-full w-full">
//              <Image
//               src="/inverseWhiteLogo.png"
//               alt="Portfolio showcase"
//               fill
//               className="object-contain object-right-bottom"
//             />
//           </div>
//         </div>
//       </div>
      
        
//       </div>

    
//        <div id="categories" className="py-20">
//          <div className="container mx-auto px-4">
//            <div className="max-w-4xl mx-auto mb-12 text-center">
//              <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
//              <p className="text-gray-600 text-lg">
//                Explore our projects by sector to discover our specialized expertise in
//                different areas
//              </p>
//            </div>

//            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//              {portfolioCategories.map((category, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2"
//               >
//                 <div className="relative h-48">
//                   <Image
//                     src={category.image || "/placeholder.svg"}
//                     alt={category.title}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-3 text-[#003087]">
//                     {category.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4">{category.description}</p>
//                   <Link
//                     href={category.href}
//                     className="inline-flex items-center text-[#003087] font-medium hover:underline"
//                   >
//                     View Projects
//                     <ArrowRight size={16} className="ml-2" />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       {/* Call to Action */ }
//   <div className="bg-[#003087] text-white py-16">
//     <div className="container mx-auto px-4 text-center">
//       <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
//       <p className="text-xl mb-8 max-w-2xl mx-auto">
//         Let's collaborate to bring your vision to life with our expertise in
//         design and architecture
//       </p>
//       <Link
//         href="/consultation"
//         className="inline-block px-8 py-4 bg-white text-[#003087] rounded-full font-medium hover:bg-gray-100 transition-colors"
//       >
//         Contact Us Today
//       </Link>
//     </div>
//   </div>
//     </div >


//   )
// }