import { useState, useEffect } from "react";
import {Tv } from "lucide-react";
import { Link } from "react-router-dom";

const AllSeries = () => {
  interface Series {
    _id: string;
    title: string;
    channel: string;
    views: string;
    timeAgo: string;
    thumbnail: string;
  }

  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://cine-vibe-express-server.vercel.app/allSeries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data && Array.isArray(data)) {
          setSeries(data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Failed to fetch series:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch series");
        setSeries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  if (loading) {
    return (
      <div className="w-full shadow-2xl text-white px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Tv />
              <h2 className="text-xl font-bold">All Series</h2>
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
    );
  }

  return (
    <div className="w-full home min-h-screen shadow-2xl text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Tv />
          <h2 className="text-xl font-bold">All Series</h2>
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
          {series.map((video) => (
            <Link
              key={video._id}
              to={`/seriesDetails/${video._id}`}
              className="video-card group cursor-pointer block"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-200">
                <img
                  src={
                    video.thumbnail ||
                    "/placeholder.svg?height=200&width=300&text=Movie"
                  }
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-gray-400 mb-1">{video.channel}</div>
              <h3 className="font-medium mb-1 line-clamp-1 group-hover:text-purple-300 transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center text-xs text-gray-400">
                <span>{video.views}</span>
                <span className="mx-2">•</span>
                <span>{video.timeAgo}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllSeries;
