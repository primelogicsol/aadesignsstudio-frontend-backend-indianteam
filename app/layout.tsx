import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar/navbar"
import { unstable_noStore } from "next/cache"
import Footer from "@/components/Footer/Footer"
import { MultiLineSlideHero } from "@/components/multi-line-slide-hero"


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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <MultiLineSlideHero />
        <div className="min-h-screen bg-gray-50">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
