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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginTop: "108px" }}>
            {/* Craft Registry */}
            <div>
              <Link href={'/'}>
                <h3 className="text-lg font-semibold text-white mb-3">General Services</h3>
              </Link>
              <Link href={'/'}>
                <h3 className="text-lg font-semibold text-white mb-3">Single Services</h3>
              </Link>


            </div>

            {/* Craft Resources */}
            <div>
              <Link href={'/'}>
                <h3 className="text-lg font-semibold text-white mb-3">Tech Services</h3>
              </Link>
              <Link href={'/'}>
                <h3 className="text-lg font-semibold text-white mb-3">Industries</h3>
              </Link>

            </div>

            {/* About & Connect */}
            <div>
              <Link href={'/'}>
                <h3 className="text-lg font-semibold text-white mb-3">Collabrative Network</h3>
              </Link>
              <Link href={'/'}>
                <h3 className="text-lg font-semibold text-white mb-3">Design Trends</h3>
              </Link>
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
          <p className="text-sm">© 2025 AA Design Studio. All rights reserved.</p>

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