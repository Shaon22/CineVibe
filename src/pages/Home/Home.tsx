import Banner from "../../components/Banner";
import Nav from "../../components/Nav";
import Sidenav from "../../components/Sidenav";

const Home = () => {
  return <div className=" min-h-screen home ">
            <div className="flex">
              
              <div className="w-[20%] shadow-2xl min-h-screen  fixed">
                <Sidenav></Sidenav>
                
              </div>
              <div className="w-[80%] ml-[300px]">
                <Nav></Nav> 
                <Banner></Banner>
              </div>
            
            </div>
           
  </div>;
};

export default Home;
