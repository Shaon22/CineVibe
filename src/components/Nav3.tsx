import { Bookmark, Clapperboard, Search } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../authProvider/AuthProvider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Nav3 = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("AuthContext must be used within an AuthProvider");

  const { logOut, user } = context;

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Movies", to: "/allMovies" },
    { name: "Series", to: "/allSeries" },
    { name: "Blogs", to: "/allblogs" },
    { name: "Live", to: "#" },
  ];

  return (
    <nav className="flex items-center justify-between p-4 shadow-2xl bg-[#243b55]">
      <Link to={"/"}>
        <div className="flex gap-2 items-center">
          <Clapperboard className="text-white" />
          <h1 className="text-xl text-white font-bold">CineVibe</h1>
        </div>
      </Link>
      <div>
        {navLinks.map((link) => (
          <Link
            to={link.to}
            key={link.name}
            className="text-white px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="relative flex items-center">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
        <input
          placeholder="Search..."
          className="pl-8 pr-3 py-1.5 h-9 w-[150px] lg:w-[200px] rounded-md border text-white border-white text-sm"
        />
      </div>
      {user ? (
        <div className="flex items-center gap-5 mr-5">
          <button className="mr-10">
            <Bookmark className="text-white" />
          </button>
          <h1 className="text-white hidden sm:block uppercase font-bold">
            {user.displayName}
          </h1>
          <div>
            <img
              className="cursor-pointer h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white"
              src={user.photoURL ?? undefined}
              alt="User avatar"
            />
          </div>
          <Box sx={{ "& button": { m: 1 } }}>
            <Button
              onClick={handleLogOut}
              style={{ fontWeight: "bold" }}
              variant="contained"
              size="medium"
              color="error"
            >
              Logout
            </Button>
          </Box>
        </div>
      ) : (
        <Box sx={{ "& button": { m: 1 } }}>
          <Link to={"/login"}>
            <Button variant="contained" size="medium">
              login
            </Button>
          </Link>
        </Box>
      )}
    </nav>
  );
};

export default Nav3;
