import { useState, useEffect, useRef, useCallback } from "react"
import type React from "react"
import { Clapperboard } from "lucide-react"
import { Link } from "react-router-dom"

const TrendingMovies = () => {
  interface Movie {
    _id: string
    title: string
    channel: string
    views: string
    timeAgo: string
    thumbnail: string
  }

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const [didMove, setDidMove] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // State for dynamic itemsPerView based on screen size
  const [itemsPerView, setItemsPerView] = useState(4) // Default for large screens

  // Calculate maxIndex based on current itemsPerView
  const maxIndex = Math.max(0, movies.length - itemsPerView)

  // Function to calculate items per view based on window width
  const calculateItemsPerView = useCallback(() => {
    if (typeof window === "undefined") return 4 // Default for SSR or initial render

    if (window.innerWidth >= 1024) {
      // lg breakpoint
      return 4
    } else if (window.innerWidth >= 768) {
      // md breakpoint
      return 3
    } else if (window.innerWidth >= 640) {
      // sm breakpoint
      return 2
    } else {
      // xs (default)
      return 1
    }
  }, [])

  // Effect to set initial itemsPerView and handle resize events
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = calculateItemsPerView()
      if (newItemsPerView !== itemsPerView) {
        setItemsPerView(newItemsPerView)
        // Adjust currentIndex if it goes out of bounds after resize
        setCurrentIndex((prevIndex) => Math.min(prevIndex, Math.max(0, movies.length - newItemsPerView)))
      }
    }

    // Set initial value on component mount
    handleResize()

    // Add event listener for window resize
    window.addEventListener("resize", handleResize)
    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize)
  }, [calculateItemsPerView, itemsPerView, movies.length]) // Dependencies for useEffect

  // Handle mouse down event for dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      setStartX(e.clientX)
      setStartIndex(currentIndex)
      setDragOffset(0)
      setDidMove(false)
      e.preventDefault() // Prevent default browser drag behavior
    },
    [currentIndex],
  )

  // Handle mouse move event for dragging
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - startX
      setDragOffset(deltaX)
      if (Math.abs(deltaX) > 5) {
        setDidMove(true) // Mark that a significant move has occurred
      }
    },
    [isDragging, startX],
  )

  // Handle mouse up event to finalize drag or click
  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    if (didMove) {
      const slideWidth = sliderRef.current
        ? sliderRef.current.offsetWidth / itemsPerView // Use dynamic itemsPerView
        : 300 // Fallback value if ref is not available
      const threshold = slideWidth * 0.3 // Threshold for determining a slide
      let newIndex = startIndex
      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
          newIndex = Math.max(0, startIndex - 1) // Slide left
        } else {
          newIndex = Math.min(maxIndex, startIndex + 1) // Slide right
        }
      }
      setCurrentIndex(newIndex)
    }
    setDragOffset(0) // Reset drag offset
    setDidMove(false) // Reset didMove flag
  }, [isDragging, dragOffset, startIndex, maxIndex, didMove, itemsPerView]) // Added itemsPerView to dependencies

  // Handle mouse leave event to stop dragging if mouse leaves slider area
  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleMouseUp() // Treat as mouse up if dragging
    }
  }, [isDragging, handleMouseUp])

  // Calculate the CSS transform value for the slider
  const getTransform = () => {
    const baseTransform = -(currentIndex * (100 / itemsPerView)) // Base transform based on current index and dynamic itemsPerView
    if (isDragging && sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / itemsPerView // Width of a single slide item
      const dragPercent = (dragOffset / slideWidth) * (100 / itemsPerView) // Percentage of drag relative to slide width
      return baseTransform + dragPercent // Apply drag offset during dragging
    }
    return baseTransform
  }

  // Fetch movies data from the API
  useEffect(() => {
    fetch("https://cine-vibe-express-server.vercel.app/api/allMovies")
      .then((res) => res.json())
      .then((data: Movie[]) => {
        setMovies(data.slice(0, 5)) // Limit to first 5 movies
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching movies:", error)
        setLoading(false)
      })
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="text-center text-white py-10">
        <h1>Loading Videos...</h1>
      </div>
    )
  }

  // Show no data message if no movies are available
  if (movies.length === 0) {
    return (
      <div className="w-full shadow-2xl text-white px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Clapperboard />
              <h2 className="text-xl font-bold">Top Trending Movies</h2>
            </div>
            <Link
              to="/allMovies" // Use href for next/link
              className="text-sm px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              View All
            </Link>
          </div>
          <div className="text-center py-8 text-gray-400">
            <p>No movies available at the moment.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full shadow-2xl text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Clapperboard />
            <h2 className="text-xl font-bold">Top Trending Movies</h2>
          </div>
          <Link
            to="/allMovies" // Use href for next/link
            className="text-sm px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            View All
          </Link>
        </div>
        <div className="relative">
          {/* Slider container */}
          <div
            ref={sliderRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`flex ${isDragging ?  "" : "transition-transform duration-300 ease-out"}`}
              style={{
                transform: `translateX(${getTransform()}%)`,
                userSelect: "none",
              }}
            >
              {movies.map((movie) => (
                <div
                  key={movie._id}
                  // Apply responsive min-width classes for different screen sizes
                  className="min-w-full  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-2"
                >
                  {/* Entire card is clickable */}
                  <Link
                    to={`/moviesDetails/${movie._id}`} // Use href for next/link
                    className={`block h-full ${didMove ? "pointer-events-none" : ""}`}
                  >
                    <div className="video-card group cursor-pointer">
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={
                            movie.thumbnail
                          }
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mb-1">{movie.channel}</div>
                      <h3 className="font-medium mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">
                        {movie.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-400">
                        <span>{movie.views}</span>
                        <span className="mx-2">•</span>
                        <span>{movie.timeAgo}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Indicators */}
          {maxIndex >= 0 && ( // Show indicators if there's at least one possible slide
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
          )}
        </div>
      </div>
    </div>
  )
}

export default TrendingMovies
