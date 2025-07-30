import React, { useContext } from "react";
import { useTypewriter } from "react-simple-typewriter";
import { FaSearch } from "react-icons/fa";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MyContext, } from "../authProvider/AuthProvider";
import { Bookmark } from "lucide-react";

const Nav: React.FC = () => {
  // get context and assert it's not null
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("MyContext is null. Make sure AuthProvider is wrapping this component.");
  }

  const { user, logOut } = context;

  // Explicitly type the result param as void for logOut promise
  const handleLogOut = () => {
    logOut()
      .then((result: void) => {
        console.log("Logged out successfully", result);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleclick = () => {
    console.log("clicked");
  };

  const [text] = useTypewriter({
    words: ["Search movies", "Search series", "Search TV shows"],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="relative flex justify-between items-center mt-5">
      <div className="w-[50%]">
        <input
          placeholder={text}
          type="text"
          className="px-2 py-2 mt-3 w-full text-white outline-none rounded-lg bg-gray-700"
        />
        <button onClick={handleclick} className="absolute right-[52%] top-[50%]">
          <FaSearch className="text-white" />
        </button>
      </div>

      {user ? (
        <div className="flex items-center gap-5 mr-5">
          <button className="mr-10">
            <Bookmark className="text-white" />
          </button>
          <h1 className="text-white hidden sm:block uppercase font-bold">{user.displayName}</h1>
          <div>
            <img
              className="cursor-pointer h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white"
              src={user.photoURL ?? undefined}
              alt="User Avatar"
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
    </div>
  );
};

export default Nav;
