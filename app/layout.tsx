import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar/navbar"
import { unstable_noStore } from "next/cache"
import Footer from "@/components/Footer/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AA Design Studio",
  description: "A simple task management application built with Next.js and MongoDB",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Prevent caching
  unstable_noStore()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="min-h-screen bg-gray-50">{children}</div>
        <Footer/>
      </body>
    </html>
  )
}
