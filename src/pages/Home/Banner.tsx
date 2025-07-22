"use client"

import { useState, useEffect } from "react"
import { Play, ChevronUp, ChevronDown } from "lucide-react"

// Carousel slide data
const slides = [
  {
    id: 1,
    title: "Discover The Latest From TicsTube",
    description:
      "ScreenPal's intuitive tools help you capture, create, and share videos and images for authentic and effective visual communication.",
  },
  {
    id: 2,
    title: "Create Engaging Content Easily",
    description:
      "Our powerful editing suite gives you everything you need to produce professional-quality videos in minutes.",
  },
  {
    id: 3,
    title: "Share Your Vision With The World",
    description:
      "Instantly publish your videos to TicsTube and reach your audience across all platforms with one click.",
  },
  {
    id: 4,
    title: "Analytics That Drive Growth",
    description:
      "Understand your audience with comprehensive analytics and insights to optimize your content strategy.",
  },
]


const Nav=()=> {
   const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl mt-5">
      {/* Carousel container */}
      <div className="relative h-[300px] md:h-[350px] overflow-hidden">
        {/* Fixed background image */}
        <div className="absolute inset-0 z-0">
          {/* Blue gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 z-0" />

          {/* Fixed background image */}
          <img
            src="https://i.ibb.co/35FHYZ4Q/27x40-Black-Movie-Poster-Light-Boxes-1.jpg"
            alt="Medieval knights in battle"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent z-10" />
        </div>

        {/* Sliding text content */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateY(${(index - currentSlide) * 100}%)`,
              zIndex: 20,
            }}
          >
            {/* Content container */}
            <div className="relative flex flex-col justify-center px-6 md:px-8 lg:px-12 w-full md:w-3/5 lg:w-1/2 h-full">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 md:mb-2">{slide.title}</h1>
              <p className="text-xs md:text-sm text-white/90 mb-3 md:mb-4 max-w-sm leading-relaxed">
                {slide.description}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <button className="bg-white text-blue-600 hover:bg-white/90 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-md font-medium transition-colors">
                  Watch Now
                </button>
                <button className="bg-transparent border border-white text-white hover:bg-white/10 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-md font-medium transition-colors flex items-center">
                  <Play className="w-3 h-3 mr-1 md:mr-1.5" />
                  Play Trailer
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Right side navigation */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30">
          {/* Up button */}
          <button
            onClick={goToPrevSlide}
            className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 md:p-2"
            aria-label="Previous slide"
          >
            <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>

          {/* Navigation dots */}
          <div className="flex flex-col gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full bg-white transition-opacity ${
                  currentSlide === index ? "opacity-100" : "opacity-50 hover:opacity-75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Down button */}
          <button
            onClick={goToNextSlide}
            className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 md:p-2"
            aria-label="Next slide"
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Nav