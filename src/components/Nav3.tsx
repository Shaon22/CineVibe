import { Clapperboard, Search } from "lucide-react";
import { Link } from "react-router-dom";
const Nav3 = () => {
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Movies", to: "/allMovies" },
    { name: "Series", to: "/allSeries" },
    { name: "Blogs", to: "/allblogs" },
    { name: "Live", to: "#" },
  ];
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
      <Link to={"/"}>
        <div className="flex items-center">
          <Clapperboard className="text-purple-600"></Clapperboard>
          <h1 className="text-xl font-bold">CineVibe</h1>
        </div>
      </Link>
      <div>
        {navLinks.map((link) => (
          <Link
            to={link.to}
            key={link.name}
            className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="relative flex items-center">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search..."
          className="pl-8 pr-3 py-1.5 h-9 w-[150px] lg:w-[200px] rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
        />
      </div>
    </nav>
  );
};

export default Nav3;
