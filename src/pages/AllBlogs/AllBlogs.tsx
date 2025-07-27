import { useState, useEffect } from "react"
import { Clapperboard } from "lucide-react"

const Allblogs= () => {
 interface blog {
    _id: string;
    title: string;
    description: string;
    shortDescription: string;
    timeAgo: string;
    read: string;
    thumbnail: string;
  }

  const [blogs, setSeries] = useState<blog[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("http://localhost:5000/allBlogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()

        if (data && Array.isArray(data)) {
         setSeries(data.slice(0, 5))
        } else {
          throw new Error("Invalid data format received")
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch movies")
        // Use mock data as fallback
        setSeries(blogs)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return (
      <div className="w-full shadow-2xl text-white px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Clapperboard />
              <h2 className="text-xl font-bold">Top Trending Movies</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-700 aspect-video rounded-lg mb-2"></div>
                <div className="bg-gray-700 h-3 rounded mb-1"></div>
                <div className="bg-gray-700 h-4 rounded mb-1"></div>
                <div className="bg-gray-700 h-3 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full home min-h-screen shadow-2xl text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Clapperboard />
          <h2 className="text-xl font-bold">Top Trending Movies</h2>
        </div>

        {error && (
          <div className="bg-yellow-900/50 border border-yellow-600 text-yellow-200 px-4 py-3 rounded mb-4">
            <p className="text-sm">
              <strong>Note:</strong> Using sample data. API Error: {error}
            </p>
          </div>
        )}

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="video-card group cursor-pointer">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-200">
                <img
                  src={blog.thumbnail || "/placeholder.svg?height=200&width=300&text=Movie"}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">
                {blog.title}
              </h3>
              <h1>{blog.shortDescription}</h1>
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <span>{blog.read}</span>
                <span className="mx-2">•</span>
                <span>{blog.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Allblogs
