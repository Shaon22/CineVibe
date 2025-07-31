import { BanknoteArrowDown } from "lucide-react"
import Sidenav from "../../components/Sidenav"
import Nav from "./Banner"
import TrendingMovies from "./TrendingMovies"
import TrendingSeries from "./TrendingSeries"
import Blogs from "./Blogs"
import Footer from "../../components/Footer"
import Live from "./Live"


const Home = () => {
  return (
    <div className="min-h-screen home">
      <div className="flex flex-col md:flex-row">
        {" "}
        {/* Stacks vertically on small screens, horizontally on medium and up */}
        {/* Sidenav container: hidden on small screens, fixed 300px width on medium and up */}
        <div className="w-full md:w-[300px] shadow-2xl min-h-screen fixed hidden md:block">
          <Sidenav />
        </div>
        {/* Main content area: full width on small screens, pushed by sidebar on medium and up */}
        <div className="w-full md:ml-[300px] flex-1">
          <Nav />
          <BanknoteArrowDown />
          <TrendingMovies />
          <TrendingSeries />
          <Blogs />
          <Live />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home
