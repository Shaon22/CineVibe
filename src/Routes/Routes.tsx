import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllMovies from "../pages/AllMovies/AllMovies";
import AllSeries from "../pages/AllSeries/AllSeries";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import MainLayout from "../layouts/MainLayout";
import BlogDetails from "../pages/Details/BlogsDetails/BlogDetails";
import MovieDetails from "../pages/Details/MoviesDetails/MovieDetails";
import SeriesDetails from "../pages/Details/SeriesDetails/SeriesDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  },
{
  element:<MainLayout>
  </MainLayout>,
  children:[
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
  },
  
  ]
  
},
{
    path:"/blogsDetails/:_id",
    element:<BlogDetails></BlogDetails>,
    loader:({params})=>fetch(`http://localhost:5000/allBlogs/${params._id}`)
  },
  {
    path:"/moviesDetails/:_id",
    element:<MovieDetails></MovieDetails>,
    loader:({params})=>fetch(`http://localhost:5000/allmovies/${params._id}`)
  },
  {
    path:"/seriesDetails/:_id",
    element:<SeriesDetails></SeriesDetails>,
    loader:({params})=>fetch(`http://localhost:5000/allSeries/${params._id}`)
  },
  
]);
