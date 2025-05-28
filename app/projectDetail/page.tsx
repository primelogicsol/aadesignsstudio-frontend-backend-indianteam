"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function ProjectDetailPage() {
  const searchParams = useSearchParams()

  const title = searchParams.get("title")
  const category = searchParams.get("category")
  const description = searchParams.get("description")
  const image = searchParams.get("image")

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-[#003087] mb-4">{title}</h1>
      <p className="text-md text-gray-500 mb-2">{category}</p>
      <p className="text-lg text-gray-700 mb-8">{description}</p>
      {image && (
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-md">
          <Image src={image} alt={title || ""} fill className="object-cover" />
        </div>
      )}
    </div>
  )
}
