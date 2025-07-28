import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Nav3 from "../components/Nav3";
const MainLayout = () => {
  return (
    <div>
      <Nav3></Nav3>
      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
