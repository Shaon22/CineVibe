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
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <div className="hidden md:block md:w-64 fixed top-0 left-0 h-full bg-[#1e1e1e] z-50">
        <Sidenav />
      </div>

      {/* Main Content */}
      <div className="w-full md:ml-64 flex flex-col">
       
        <div className="px-4">
           <Nav />
          <BanknoteArrowDown className="my-4" />
          <TrendingMovies />
          <TrendingSeries />
          <Blogs />
          <Live />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
