import { BanknoteArrowDown } from "lucide-react";
import Sidenav from "../../components/Sidenav";
import Nav from "./Banner";
import TrendingMovies from "./TrendingMovies";
import TrendingSeries from "./TrendingSeries";
import Blogs from "./Blogs";
import Footer from "../../components/Footer";
import Live from "./Live";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-auto md:min-w-[180px] lg:min-w-[220px] xl:min-w-[250px] shadow-md bg-white">
        <Sidenav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-8">
        <Nav />
        <div className="flex justify-center">
          <BanknoteArrowDown size={32} className="text-primary" />
        </div>
        <TrendingMovies />
        <TrendingSeries />
        <Blogs />
        <Live />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
