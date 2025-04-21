"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Slide = {
  id: number
  heading: string
  description: string
  linkText: string
  linkHref: string
  bgImage: string
}

interface MultiLineSlideHeroProps {
  slides?: Slide[]
}

export function MultiLineSlideHero() {
  const slides: Slide[] = [
    {
      id: 0,
      heading: "Enterprise Business Solutions",
      description:
        "The competitive scenario of business has called for efficient operational activities, leveraging investment cost and overall high profitability. Our experts will guide you to achieve all with a perfect enterprise business solution.",
      linkText: "Learn More",
      linkHref: "#",
      bgImage: "/forest-pine.jpg",
    },
    {
      id: 1,
      heading: "Enterprise Application Services",
      description:
        "The customer base is retained by complete and appropriate application maintenance and support service. Partner with us to get accurate service and retain the trust and usability factor of your user base.",
      linkText: "Learn More",
      linkHref: "#",
      bgImage: "/landingpage3.jpg",
    },
    {
      id: 2,
      heading: "Digital Marketing Services",
      description:
        "Nowadays people are busy and it has drastically changed the purchasing scenario. They rely on the digital world for most things, which calls for businesses to step into this realm and enhance their market presence.",
      linkText: "Learn More",
      linkHref: "#",
      bgImage: "/sydney-harbour-bridge.jpg",
    },
  ]

  
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const slideCount = slides.length
  const autoSlideDelay = 7000
  const [animateState, setAnimateState] = useState({
    showBlueBox: false,
    showText: false,
  })

  useEffect(() => {
    setAnimateState({ showBlueBox: false, showText: false })

    const blueBoxTimer = setTimeout(() => {
      setAnimateState((prev) => ({ ...prev, showBlueBox: true }))
    }, 500)

    const textTimer = setTimeout(() => {
      setAnimateState((prev) => ({ ...prev, showText: true }))
    }, 1000)

    const autoSlideTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount)
    }, autoSlideDelay)

    return () => {
      clearTimeout(blueBoxTimer)
      clearTimeout(textTimer)
      clearTimeout(autoSlideTimeout)
    }
  }, [currentSlide, slideCount])

  return (
    <div className="bg-[#f2efec]">
      <div
        className="relative h-[500px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden"
        style={{ borderRadius: "0 0 100px 0" }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentSlide
          return (
            <div
              key={slide.id}
              className={`absolute top-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute top-0 w-full h-full bg-cover bg-center transition-all duration-1000"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(20%)",
                  borderRadius: "0 0 100px 0",
                }}
              ></div>

              {/* Blue Panel (Fades in after delay) */}
              <div
                className="absolute top-0 h-full text-white p-6 sm:p-8 flex flex-col justify-center transition-all duration-1000"
                style={{
                  backgroundColor: "#003087",
                  width: "100%",
                  maxWidth: "450px",
                  transform: animateState.showBlueBox ? "translateX(0)" : "translateX(-20%)",
                  opacity: animateState.showBlueBox ? 1 : 0,
                }}
              >
                {/* Text (Fades in after delay) */}
                <div
                  style={{
                    opacity: animateState.showText ? 1 : 0,
                    transform: animateState.showText ? "translateX(0)" : "translateX(-10%)",
                    transition: "opacity 1s ease, transform 1s ease",
                  }}
                >
                  <h2 className="font-bold mb-3 text-xl sm:text-2xl md:text-3xl">{slide.heading}</h2>
                  <p className="mb-3 text-sm sm:text-base">{slide.description}</p>
                  <Link
                    href={slide.linkHref}
                    className="underline text-base sm:text-lg hover:text-gray-200 transition-colors"
                  >
                    {slide.linkText}
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6">
        {/* Slide Counter & Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg sm:text-xl text-[#003087]">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <div className="w-28 sm:w-36 h-1 bg-gray-300 rounded-full">
            <div
              className="h-full rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${((currentSlide + 1) / slideCount) * 100}%`,
                backgroundColor: "#003087",
              }}
            ></div>
          </div>
          <span className="font-bold text-lg sm:text-xl text-[#003087]">{String(slideCount).padStart(2, "0")}</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)}
            className="text-lg w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-gray-400 flex items-center justify-center bg-white shadow-md hover:bg-[#003087] hover:text-white transition-all duration-300 ease-in-out"
            aria-label="Previous slide"
          >
            &#60;
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slideCount)}
            className="text-lg w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-gray-400 flex items-center justify-center bg-white shadow-md hover:bg-[#003087] hover:text-white transition-all duration-300 ease-in-out"
            aria-label="Next slide"
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  )
}
