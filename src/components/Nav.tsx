import { useTypewriter } from "react-simple-typewriter";
import { FaSearch } from "react-icons/fa";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Nav = () => {
  const user: boolean = false;
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
      <div className=" w-[50%]">
        <input
          placeholder={text}
          type="text"
          className="px-2 py-2 mt-3 w-full  text-white outline-none rounded-lg bg-gray-700"
        />
        <button
          onClick={handleclick}
          className="absolute right-[52%] top-[50%]"
        >
          <FaSearch className="text-white" />
        </button>
      </div>
      {user ? (
        <>
          <div className="flex items-center gap-5 mr-5">
            <h1 className=" text-white hidden sm:block uppercase font-bold">
              {/* {user.displayName} */} shaon
            </h1>
            <div className="">
              <img
                className="cursor-pointer h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white"
                // onClick={toggleDropdown}
                // src={user.photoURL}
              />
            </div>
          </div>
        </>
      ) : (
        <Box sx={{ "& button": { m: 1 } }}>
          <Button  variant="contained" size="medium">
            login
          </Button>
        </Box>
      )}
    </div>
  );
};
export default Nav;
