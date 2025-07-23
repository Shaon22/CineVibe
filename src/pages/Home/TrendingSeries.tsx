"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import {Tv } from "lucide-react"

const TrendingSeries=()=> {
            const videos = [
    {
      id: 1,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "16M views",
      timeAgo: "49 minutes ago",
      thumbnail: "https://i.ibb.co/VpwMpGgz/medium.jpg",
      alt: "Action scene",
    },
    {
      id: 2,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "16M views",
      timeAgo: "49 minutes ago",
      thumbnail: "https://i.ibb.co/zTWrWzkz/large.jpg",
      alt: "People with red background",
    },
    {
      id: 3,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "16M views",
      timeAgo: "49 minutes ago",
      thumbnail: "https://i.ibb.co/VWHjYx4L/small.jpg",
      alt: "Profile portrait",
    },
    {
      id: 4,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "16M views",
      timeAgo: "49 minutes ago",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Snacks+Scene",
      alt: "Person with snacks",
    },
    {
      id: 5,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "14M views",
      timeAgo: "1 hour ago",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Music+Video",
      alt: "Music video",
    },
    {
      id: 6,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "12M views",
      timeAgo: "2 hours ago",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Comedy+Scene",
      alt: "Comedy scene",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState(0)
  const [startIndex, setStartIndex] = useState(0)

  const sliderRef = useRef<HTMLDivElement>(null)
  const itemsPerView = 4
  const maxIndex = Math.max(0, videos.length - itemsPerView)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      setStartX(e.clientX)
      setStartIndex(currentIndex)
      setDragOffset(0)

      // Prevent text selection during drag
      e.preventDefault()
    },
    [currentIndex],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - startX
      setDragOffset(deltaX)
    },
    [isDragging, startX],
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)

    // Calculate how many slides to move based on drag distance
    const slideWidth = sliderRef.current ? sliderRef.current.offsetWidth / itemsPerView : 300
    const threshold = slideWidth * 0.3 // 30% of slide width to trigger move

    let newIndex = startIndex

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Dragged right, go to previous slide
        newIndex = Math.max(0, startIndex - 1)
      } else {
        // Dragged left, go to next slide
        newIndex = Math.min(maxIndex, startIndex + 1)
      }
    }

    setCurrentIndex(newIndex)
    setDragOffset(0)
  }, [isDragging, dragOffset, startIndex, maxIndex])

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleMouseUp()
    }
  }, [isDragging, handleMouseUp])

  // Calculate transform based on current index and drag offset
  const getTransform = () => {
    const baseTransform = -(currentIndex * (100 / itemsPerView))
    if (isDragging && sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / itemsPerView
      const dragPercent = (dragOffset / slideWidth) * (100 / itemsPerView)
      return baseTransform + dragPercent
    }
    return baseTransform
  }
  return (
    <div className="w-full  text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
           <Tv/>
            <h2 className="text-xl font-bold">Top Trending TV series</h2>
          </div>
          <a href="#" className="text-sm px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition">
            View All
          </a>
        </div>

        <div className="relative">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`flex ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
              style={{
                transform: `translateX(${getTransform()}%)`,
                userSelect: "none",
              }}
            >
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="min-w-[25%] px-2"
                  style={{ pointerEvents: isDragging ? "none" : "auto" }}
                >
                  <div className="video-card">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.alt}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{video.channel}</div>
                    <h3 className="font-medium mb-1 line-clamp-1">{video.title}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>{video.views}</span>
                      <span className="mx-2">•</span>
                      <span>{video.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-purple-600" : "bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TrendingSeries