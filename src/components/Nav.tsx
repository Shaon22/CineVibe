
import type React from "react"
import { useContext } from "react"
import { useTypewriter } from "react-simple-typewriter"
import { FaSearch } from "react-icons/fa"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { MyContext } from "../authProvider/AuthProvider"
import { Bookmark } from "lucide-react"

const Nav: React.FC = () => {
  // get context and assert it's not null
  const context = useContext(MyContext) // [^1]
  if (!context) {
    throw new Error("MyContext is null. Make sure AuthProvider is wrapping this component.")
  }
  const { user, logOut } = context

  // Explicitly type the result param as void for logOut promise
  const handleLogOut = () => {
    logOut()
      .then((result: void) => {
        console.log("Logged out successfully", result)
      })
      .catch((error) => {
        console.error("Logout error:", error)
      })
  }

  const handleclick = () => {
    console.log("clicked")
  }

  const [text] = useTypewriter({
    words: ["Search movies", "Search series", "Search TV shows"],
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-4 sm:gap-0 px-4">
      {/* Search Bar */}
      <div className="relative w-full sm:w-1/2 lg:w-1/3">
        <input
          placeholder={text}
          type="text"
          className="px-4 py-2 w-full text-white outline-none rounded-lg bg-gray-700 pr-10" // Added pr-10 for icon space
        />
        <button onClick={handleclick} className="absolute inset-y-0 right-0 flex items-center pr-3">
          <FaSearch className="text-white" />
        </button>
      </div>

      {/* User Info / Login */}
      {user ? (
        <div className="flex items-center gap-4 sm:gap-5">
          {" "}
          {/* Adjusted gap for smaller screens */}
          <button className="mr-2 sm:mr-10">
            {" "}
            {/* Adjusted margin */}
            <Bookmark className="text-white h-5 w-5 sm:h-6 sm:w-6" /> {/* Added responsive sizing for bookmark */}
          </button>
          <h1 className="text-white hidden sm:block uppercase font-bold text-sm sm:text-base">{user.displayName}</h1>{" "}
          {/* Adjusted text size */}
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
  )
}

export default Nav
