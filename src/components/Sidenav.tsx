import { Clapperboard, Home, ChevronRight, Tv, FileSpreadsheet, Radio } from "lucide-react"
import { Link } from "react-router-dom"

const Sidenav = () => {
  const commonClasses =
    "py-2 px-2 border border-gray-500 rounded text-white flex items-center justify-between gap-2 text-base font-bold hover:bg-gray-500 "
  const commonClasses2 = "flex items-center gap-2"

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center mb-8 mt-5">
        <div className="flex items-center space-x-2">
          <Clapperboard className="w-6 h-6 text-white" />
          <h2 className="text-3xl font-bold text-white">CineVibe</h2>
        </div>
      </div>
      <nav className="flex flex-col gap-5 p-5 flex-1">
        <Link to={"/"}>
          <div className={commonClasses}>
            <div className={commonClasses2}>
              <Home />
              <h1>Home</h1>
            </div>
            <ChevronRight />
          </div>
        </Link>
        <Link to={"/allMovies"}>
          <div className={commonClasses}>
            <div className={commonClasses2}>
              <Clapperboard />
              <h1>Movies</h1>
            </div>
            <ChevronRight />
          </div>
        </Link>
        <Link to={"/allSeries"}>
          <div className={commonClasses}>
            <div className={commonClasses2}>
              <Tv />
              <h1>TV Series</h1>
            </div>
            <ChevronRight />
          </div>
        </Link>
        <Link to={"/allBlogs"}>
          <div className={commonClasses}>
            <div className={commonClasses2}>
              <FileSpreadsheet />
              <h1>Blogs</h1>
            </div>
            <ChevronRight />
          </div>
        </Link>
        <Link to={"#"}>
          <div className={commonClasses}>
            <div className={commonClasses2}>
              <Radio />
              <h1>Live Shows</h1>
            </div>
            <ChevronRight />
          </div>
        </Link>
      </nav>
    </div>
  )
}

export default Sidenav
