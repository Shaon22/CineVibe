import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Footer from "../../../components/Footer";
import { Bookmark } from "lucide-react";
import Nav3 from "../../../components/Nav3";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const moviesInfo = useLoaderData();
  const { url, title, channel, timeAgo, views } = moviesInfo;

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
  

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const res = await fetch("http://localhost:5000/allMovies", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //         console.log(error);
  //       }

  //       const data = await res.json();

  //       if (data && Array.isArray(data)) {
  //         setMovies(data);
  //       } else {
  //         throw new Error("Invalid data format received");
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch movies:", err);
  //       setError(err instanceof Error ? err.message : "Failed to fetch movies");
  //       setMovies([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMovies();
  // }, []);
useEffect(() => {
  fetch("https://cine-vibe-express-server.vercel.app/api/allMovies")
    .then((res) => res.json())
    .then((data: Movie[]) => {
     
      setMovies(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      setLoading(false);
    });
}, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-56">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  return (
    <div>
      <Nav3></Nav3>
      <div className="home min-h-screen bg-white p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr]">
          {/* Left Column: Video Player and Details */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-32px)] lg:max-h-[calc(100vh-64px)] pr-2">
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
              {/* Placeholder video. In a real app, this would be dynamically loaded from your MongoDB/storage. */}
              <video controls className="w-full h-full object-cover">
                <source src={url} type="video/mp4" />
                {"Your browser does not support the video tag."}
              </video>
            </div>
            <div className="space-y-2 text-white">
              <h1 className="text-2xl text font-bold">{title}</h1>
              <div className="flex items-center gap-2 text-sm ">
                <span>{channel}</span>
                <span>•</span>
                <span>{views}</span>
                <span>•</span>
                <span>{timeAgo}</span>
                <button className="mr-10">
                  <Bookmark className="text-white" />
                </button>
              </div>
              <p className="text-sm text-white">
                {
                  "Dive deep into the heart of the Amazon rainforest and discover its incredible biodiversity. From vibrant flora to elusive wildlife, this documentary captures the essence of one of Earth's most vital ecosystems."
                }
              </p>
            </div>
          </div>
          {/* Right Column: Suggested Videos */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-32px)] lg:max-h-[calc(100vh-64px)] pl-2">
            <h2 className="text-xl font-bold text-white">Suggested Movies</h2>
            <div className="grid gap-4">
              {movies.map((video) => (
                <Link
                  key={video._id}
                  to={`/moviesDetails/${video._id}`}
                  className="block"
                >
                  <div className="flex items-center gap-4 p-2 rounded-md border border-gray-500 hover:bg-gray-700 hover:text-gray-500  transition-colors">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      width={160}
                      height={90}
                      alt={video.title}
                      className="rounded-md object-cover aspect-video"
                    />
                    <div className="flex-1 text-white">
                      <h3 className="text-sm font-semibold line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs ">{video.channel}</p>
                      <p className="text-xs ">{video.views}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default MovieDetails;
