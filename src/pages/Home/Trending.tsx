"use client"

import { Play } from "lucide-react"

const Trending=()=> {
            const videos = [
    {
      id: 1,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "16M views",
      timeAgo: "49 minutes ago",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Action+Scene",
      alt: "Action scene",
    },
    {
      id: 2,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "16M views",
      timeAgo: "49 minutes ago",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Red+Background",
      alt: "People with red background",
    },
    {
      id: 3,
      title: "What is Lorem Ipsum?",
      channel: "T-Series",
      views: "16M views",
      timeAgo: "49 minutes ago",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Profile+Portrait",
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
  ]
  return (
    <div className="w-full  text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Play className="h-6 w-6 text-purple-600 fill-purple-600" />
            <h2 className="text-xl font-bold">Top Trending Videos</h2>
          </div>
          <a href="#" className="text-sm px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="video-card cursor-pointer">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.alt}
                  className="w-full h-full object-cover"
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
          ))}
        </div>
      </div>
    </div>
  )
}
export default Trending