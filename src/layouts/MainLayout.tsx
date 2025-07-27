import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Outlet></Outlet>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
