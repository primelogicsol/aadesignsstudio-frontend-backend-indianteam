// "use client"

// import Link from "next/link"
// import Image from "next/image"

// export default function Footer() {
//   return (
//     <footer className="bg-[#003087] border-t">
//       <div className="container mx-auto px-6 py-8">
//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row md:justify-between mb-8">
//           {/* Left Column: Logo & Contact Info */}
//           <div className="w-full md:w-1/4 mb-8 md:mb-0">
//             <Image
//               src="/LogoNew.png"
//               alt="AA Design Studio Logo"
//               width={120}
//               height={60}
//               className="h-12 w-auto"
//             />
//             <p className="text-sm leading-6">
//               Phone: 1-866-XXXX-XXXX
//               <br />
//               Media Inquiries: media@aadesignstudio.com
//             </p>
//           </div>

//           {/* Right Columns */}
//           <div className="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-6 gap-6 text-sm">
//             {/* Expertise */}
//             <div>
//               <h3 className="mb-3 uppercase font-semibold tracking-wide" style={{ color: "#003087" }}>
//                 expertise
//               </h3>
//               <ul className="space-y-1 leading-6">
//                 <li>Buildings</li>
//                 <li>Community Development</li>
//                 <li>Energy</li>
//                 <li>Environment</li>
//                 <li>Federal Government</li>
//                 <li>Mining, Minerals &amp; Metals</li>
//                 <li>Transportation</li>
//                 <li>Water</li>
//                 <li>View All Markets</li>
//                 <li>View All Services</li>
//               </ul>
//             </div>

//             {/* Initiatives */}
//             <div>
//               <h3 className="mb-3 uppercase font-semibold tracking-wide" style={{ color: "#003087" }}>
//                 initiatives
//               </h3>
//               <ul className="space-y-1 leading-6">
//                 <li>Climate Solutions</li>
//                 <li>Digital (Stantec.io)</li>
//                 <li>Coastal Resilience</li>
//                 <li>Ecosystem Restoration</li>
//                 <li>Energy Transition</li>
//                 <li>Smart Cities</li>
//                 <li>Sustainability</li>
//                 <li>International Development</li>
//               </ul>
//             </div>

//             {/* Ideas */}
//             <div>
//               <h3 className="mb-3 uppercase font-semibold tracking-wide" style={{ color: "#003087" }}>
//                 ideas
//               </h3>
//               <ul className="space-y-1 leading-6">
//                 <li>Visit Our Hub</li>
//               </ul>
//             </div>

//             {/* Careers */}
//             <div>
//               <h3 className="mb-3 uppercase font-semibold tracking-wide" style={{ color: "#003087" }}>
//                 careers
//               </h3>
//               <ul className="space-y-1 leading-6">
//                 <li>Jobs</li>
//                 <li>Students &amp; Graduates</li>
//                 <li>Search &amp; Apply</li>
//               </ul>
//             </div>

//             {/* About */}
//             <div>
//               <h3 className="mb-3 uppercase font-semibold tracking-wide" style={{ color: "#003087" }}>
//                 about
//               </h3>
//               <ul className="space-y-1 leading-6">
//                 <li>Company Overview</li>
//                 <li>Board of Directors</li>
//                 <li>Corporate Governance</li>
//                 <li>History</li>
//                 <li>Indigenous Relations</li>
//                 <li>Innovation</li>
//                 <li>Inclusion, Diversity &amp; Equity</li>
//                 <li>Community Engagement</li>
//                 <li>Find an Office</li>
//                 <li>More Info</li>
//               </ul>
//             </div>

//             {/* Investors */}
//             <div>
//               <h3 className="mb-3 uppercase font-semibold tracking-wide" style={{ color: "#003087" }}>
//                 investors
//               </h3>
//               <ul className="space-y-1 leading-6">
//                 <li>Why Invest</li>
//                 <li>Financial Reports &amp; Filings</li>
//                 <li>Presentations &amp; Events</li>
//                 <li>Corporate Governance</li>
//                 <li>Dividend &amp; Stock Info</li>
//                 <li>Contact Investors</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t pt-4 flex flex-col md:flex-row md:justify-between items-center text-sm">
//           <p className="mb-4 md:mb-0">&copy; 2025 AA Design Studio. All rights reserved.</p>
//           <div className="space-x-4">
//             <Link href="/privacy-policy">Privacy Policy</Link>
//             <Link href="/sitemap">Sitemap</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }


"use client"

import Link from "next/link"
import Image from "next/image"
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa"
import { useState, useEffect } from "react"

// Change the export from default to named export
export const Footer = () => {
  // State for image URLs and loading status
  const [footerImageUrl, setFooterImageUrl] = useState<string | null>(null)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)
  const [logoError, setLogoError] = useState(false)

  // Fetch the image URLs from environment variables
  useEffect(() => {
    // Try to get the footer image URL from environment variables
    const envImageUrl = process.env.NEXT_PUBLIC_FOOTER_IMAGE_URL || null
    setFooterImageUrl(envImageUrl)

    // Try to get the logo URL from environment variables
    const envLogoUrl =
      process.env.NEXT_PUBLIC_FOOTER_LOGO_URL ||
      (process.env.NEXT_PUBLIC_IMAGE_PATH
        ? `${process.env.NEXT_PUBLIC_IMAGE_PATH}/logo-white.png`
        : "/assets/logo-white.png")
    setLogoUrl(envLogoUrl)
  }, [])

  // Handle image errors
  const handleImageError = () => {
    console.error("Failed to load footer image")
    setImageError(true)
  }

  const handleLogoError = () => {
    console.error("Failed to load logo image")
    setLogoError(true)
    // Fall back to a text-based logo
    setLogoUrl(null)
  }

  return (
    <footer className="bg-[#003087] text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Display the dynamic footer image if available */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section: Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            
              <Image
                src="/inverseWhiteLogo.png"
                alt="AA Design Studio"
                width={150}
                height={50}
                onError={handleLogoError}
                priority
              />
            
            
            <p className="mt-4 text-sm leading-relaxed max-w-md">
              A non-commercial platform and the world largest website for the freelance platform. We empower you with
              knowledge and tools to make informed, independent choices.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4 text-xl">
              <FaTwitter className="cursor-pointer hover:text-gray-300" />
              <FaFacebookF className="cursor-pointer hover:text-gray-300" />
              <FaLinkedinIn className="cursor-pointer hover:text-gray-300" />
              <FaInstagram className="cursor-pointer hover:text-gray-300" />
            </div>
          </div>

          {/* Right Section: Navigation Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 mt-20 gap-6">
            {/* Craft Registry */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/services/software-development/web-development"
                    className="text-white hover:text-[#FF6B35]"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/software-development/mobile-development"
                    className="text-white hover:text-[#FF6B35]"
                  >
                    Mobile Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/software-development/game-development"
                    className="text-white hover:text-[#FF6B35]"
                  >
                    Game Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white hover:text-[#FF6B35]">
                    <span className="text-[#FF6B35]">View More</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Craft Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Industries</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/industries/healthcare-and-life/regulatory-compliance"
                    className="text-white hover:text-[#FF6B35]"
                  >
                    Regulatory Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industries/healthcare-and-life/regulatory-compliance"
                    className="text-white hover:text-[#FF6B35]"
                  >
                    Data-Driven Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industries/healthcare-and-life/regulatory-compliance"
                    className="text-white hover:text-[#FF6B35]"
                  >
                    Clous & DevOps
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white hover:text-[#FF6B35]">
                    <span className="text-[#FF6B35]">View More</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* About & Connect */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/technologies/web-tech/react" className="text-white hover:text-[#FF6B35]">
                    React
                  </Link>
                </li>
                <li>
                  <Link href="/technologies/web-tech/react" className="text-white hover:text-[#FF6B35]">
                    Angular
                  </Link>
                </li>
                <li>
                  <Link href="/technologies/web-tech/react" className="text-white hover:text-[#FF6B35]">
                    Node.Js
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white hover:text-[#FF6B35]">
                    <span className="text-[#FF6B35]">View More</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-10 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Left Section - Text */}
          <div className="md:w-2/5 text-center md:text-left">
            <h3 className="text-lg text-white font-semibold">Stay Updated</h3>
            <p className="text-sm max-w-md">
              Subscribe to our newsletter for the latest updates on Prime Logic Solutions.
            </p>
          </div>

          {/* Right Section - Email Input & Button */}
          <div className="md:w-3/5 w-full">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full md:w-3/4 px-4 py-2 bg-white text-black rounded-md focus:outline-none"
              />
              <button className="w-full md:w-1/4 bg-orange-500 px-4 py-2 text-white hover:text-white font-semibold rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Left - Copyright */}
          <p className="text-sm">© 2025 PrimeLogic. All rights reserved.</p>

          {/* Center - Powered By */}
          <p className="text-sm">Powered and Maintained by Prime Logic Solutions USA</p>

          {/* Right - Terms & Privacy */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            <Link href="/terms-and-conditions" className="hover:text-white text-white">
              Terms
            </Link>
            <Link href="/refund-policy" className="hover:text-white text-white">
              Refund Policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-white text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Also keep the default export for backward compatibility
export default Footer