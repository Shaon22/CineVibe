import Banner from "./Banner";
import Nav from "../../components/Nav";
import Sidenav from "../../components/Sidenav";
import TrendingMovies from "./TrendingMovies";
import TrendingSeries from "./TrendingSeries";
import Blogs from "./Blogs";
import Footer from "../../components/Footer";
import Live from "./Live";

const Home = () => {
  return <div className=" min-h-screen home ">
            <div className="flex">
              
              <div className="w-[20%] shadow-2xl min-h-screen  fixed">
                <Sidenav></Sidenav>
                
              </div>
              <div className="w-[80%] ml-[300px]">
                <Nav></Nav> 
                <Banner></Banner>
                <TrendingMovies></TrendingMovies>
                <TrendingSeries></TrendingSeries>
                <Blogs></Blogs>
                <Live></Live>
                <Footer></Footer>
              </div>
            
            </div>
           
  </div>;
};

export default Home;
