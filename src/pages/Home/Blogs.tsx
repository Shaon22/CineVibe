"use client";

import type React from "react";

import { useState, useRef, useCallback, useEffect } from "react";
import { FileSpreadsheet } from "lucide-react";

const Blogs = () => {
  interface blog {
    _id: string;
    title: string;
    description: string;
    shortDescription: string;
    timeAgo: string;
    read: string;
    thumbnail: string;
  }
  const [blogs, setBlogs] = useState<blog[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/allBlogs");
        const data = await res.json();
        // Take only 5 movies
        setBlogs(data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, blogs.length - itemsPerView);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartX(e.clientX);
      setStartIndex(currentIndex);
      setDragOffset(0);

      // Prevent text selection during drag
      e.preventDefault();
    },
    [currentIndex]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      setDragOffset(deltaX);
    },
    [isDragging, startX]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    // Calculate how many slides to move based on drag distance
    const slideWidth = sliderRef.current
      ? sliderRef.current.offsetWidth / itemsPerView
      : 300;
    const threshold = slideWidth * 0.3; // 30% of slide width to trigger move

    let newIndex = startIndex;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Dragged right, go to previous slide
        newIndex = Math.max(0, startIndex - 1);
      } else {
        // Dragged left, go to next slide
        newIndex = Math.min(maxIndex, startIndex + 1);
      }
    }

    setCurrentIndex(newIndex);
    setDragOffset(0);
  }, [isDragging, dragOffset, startIndex, maxIndex]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleMouseUp();
    }
  }, [isDragging, handleMouseUp]);

  // Calculate transform based on current index and drag offset
  const getTransform = () => {
    const baseTransform = -(currentIndex * (100 / itemsPerView));
    if (isDragging && sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / itemsPerView;
      const dragPercent = (dragOffset / slideWidth) * (100 / itemsPerView);
      return baseTransform + dragPercent;
    }
    return baseTransform;
  };
  return (
    <div className="w-full shadow-2xl  text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <FileSpreadsheet />
            <h2 className="text-xl font-bold">Blogs</h2>
          </div>
          <a
            href="#"
            className="text-sm px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
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
              className={`flex ${
                isDragging ? "" : "transition-transform duration-300 ease-out"
              }`}
              style={{
                transform: `translateX(${getTransform()}%)`,
                userSelect: "none",
              }}
            >
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="min-w-[25%] px-2"
                  style={{ pointerEvents: isDragging ? "none" : "auto" }}
                >
                  <div className="video-card">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                      <img
                        src={blog.thumbnail || "/placeholder.svg"}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                    <h3 className="font-medium mb-1 line-clamp-1">
                      {blog.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-400 mb-3">
                      <span>{blog.read}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.timeAgo}</span>
                    </div>
                    <h1>{blog.shortDescription}</h1>
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
  );
};
export default Blogs;
