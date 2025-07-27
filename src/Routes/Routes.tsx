import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllMovies from "../pages/AllMovies/AllMovies";
import AllSeries from "../pages/AllSeries/AllSeries";
import AllBlogs from "../pages/AllBlogs/AllBlogs";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/register",
    element:<Register></Register>
  },
  {
    path:"/allMovies",
    element:<AllMovies></AllMovies>
  },
  {
    path:"/allSeries",
    element:<AllSeries></AllSeries>
  },
  {
    path:"/allBlogs",
    element:<AllBlogs></AllBlogs>
  }
]);
