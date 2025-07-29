import { useState, useEffect, useRef, useCallback } from "react";
import type React from "react";
import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

const TrendingMovies = () => {
  interface Movie {
    _id: string;
    title: string;
    channel: string;
    views: string;
    timeAgo: string;
    thumbnail: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [didMove, setDidMove] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, movies.length - itemsPerView);

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
      setStartIndex(currentIndex);
      setDragOffset(0);
      setDidMove(false);
      e.preventDefault();
    },
    [currentIndex]
  );

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      setDragOffset(deltaX);
      if (Math.abs(deltaX) > 5) {
        setDidMove(true);
      }
    },
    [isDragging, startX]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (didMove) {
      const slideWidth = sliderRef.current
        ? sliderRef.current.offsetWidth / itemsPerView
        : 300;
      const threshold = slideWidth * 0.3;
      let newIndex = startIndex;

      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
          newIndex = Math.max(0, startIndex - 1);
        } else {
          newIndex = Math.min(maxIndex, startIndex + 1);
        }
      }

      setCurrentIndex(newIndex);
    }

    setDragOffset(0);
    setDidMove(false);
  }, [isDragging, dragOffset, startIndex, maxIndex, didMove]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleMouseUp();
    }
  }, [isDragging, handleMouseUp]);

  // Calculate transform
  const getTransform = () => {
    const baseTransform = -(currentIndex * (100 / itemsPerView));
    if (isDragging && sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / itemsPerView;
      const dragPercent = (dragOffset / slideWidth) * (100 / itemsPerView);
      return baseTransform + dragPercent;
    }
    return baseTransform;
  };

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://cine-vibe-express-server.vercel.app/allMovies");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMovies(data.slice(0, 5));
        } else {
          console.error("Invalid data format");
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="text-center text-white py-10">
        <h1>Loading Videos...</h1>
      </div>
    );
  }

  // No data
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
              to="/allMovies"
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
    );
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
            to="/allMovies"
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
              className={`flex ${
                isDragging ? "" : "transition-transform duration-300 ease-out"
              }`}
              style={{
                transform: `translateX(${getTransform()}%)`,
                userSelect: "none",
              }}
            >
              {movies.map((movie) => (
                <div
                  key={movie._id}
                  className="min-w-[25%] px-2"
                >
                  {/* ✅ Entire card is clickable */}
                  <Link
                    to={`/moviesDetails/${movie._id}`}
                    className={`block h-full ${
                      didMove ? "pointer-events-none" : ""
                    }`}
                  >
                    <div className="video-card group cursor-pointer">
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={
                            movie.thumbnail ||
                            "/placeholder.svg?height=200&width=300&text=Movie"
                          }
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        {movie.channel}
                      </div>
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
          {maxIndex > 0 && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-purple-600" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
