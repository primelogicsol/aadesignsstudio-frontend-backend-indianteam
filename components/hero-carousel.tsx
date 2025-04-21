"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroCarouselProps {
  title?: string
  subtitle?: string
  description?: string
}

const carouselImages = [
  {
    src: "/collaborative-workspace.png",
    alt: "Business professionals collaborating in a modern office environment",
  },
  {
    src: "/interconnected-future.png",
    alt: "Technology innovation showcasing digital transformation",
  },
  {
    src: "/collaborative-planning-session.png",
    alt: "Diverse team working together on strategic project planning",
  },
]

export function HeroCarousel({
  title = "Transform Your Business",
  subtitle = "Innovative Solutions for Modern Challenges",
  description = "Discover how our comprehensive suite of services can help your organization thrive in today's competitive landscape.",
}: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTextVisible, setIsTextVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
    // Reset text animation
    setIsTextVisible(false)
    setTimeout(() => setIsTextVisible(true), 100)
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))
    // Reset text animation
    setIsTextVisible(false)
    setTimeout(() => setIsTextVisible(true), 100)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    // Reset text animation
    setIsTextVisible(false)
    setTimeout(() => setIsTextVisible(true), 100)
  }

  // Initialize text visibility on component mount and setup auto-rotation
  useEffect(() => {
    setIsTextVisible(true)

    // Auto-rotate slides every 6 seconds
    const interval = setInterval(() => {
      if (!isPaused) {
        nextSlide()
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel */}
      <div className="relative h-[500px] md:h-[600px] w-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              currentSlide === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}

        {/* Text content that fades in from left */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div
              className={cn(
                "max-w-lg text-white transition-all duration-1000 transform",
                isTextVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20",
              )}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-200">{subtitle}</h2>
              <p className="text-gray-200 mb-8">{description}</p>
              <Button size="lg" className="bg-[#ff5e14] hover:bg-[#e04e00] text-white border-none">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons below carousel */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full border-gray-300 hover:border-gray-400"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <div className="flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  currentSlide === index ? "bg-[#003087] w-6" : "bg-gray-300 hover:bg-gray-400",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full border-gray-300 hover:border-gray-400"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
