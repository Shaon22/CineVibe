import { Clapperboard, Home, ChevronRight, Tv, FileSpreadsheet, Radio } from "lucide-react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const commonClasses =
    "py-2 px-2 border border-gray-500 rounded text-white flex items-center justify-between gap-2 text-base font-bold hover:bg-gray-500 ";
  const commonClasses2 = "flex items-center gap-2";

  return (
    <div>
      <div className="flex justify-center mb-8 mt-5">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg">
            <Clapperboard className="w-6 h-6 text-purple-600 fill-current" />
          </div>
          <h2 className="text-3xl font-bold text-white">CineVibe</h2>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className={commonClasses}>
          <div className={commonClasses2}>
            <Home />
            <Link to={"u"}>Home</Link>
          </div>
          <ChevronRight />
        </div>
         <div className={commonClasses}>
          <div className={commonClasses2}>
            <Clapperboard />
            <Link to={"u"}>Movies</Link>
          </div>
          <ChevronRight />
        </div>
         <div className={commonClasses}>
          <div className={commonClasses2}>
            <Tv />
            <Link to={"u"}>TV Series</Link>
          </div>
          <ChevronRight />
        </div>
        <div className={commonClasses}>
          <div className={commonClasses2}>
            <FileSpreadsheet />
            <Link to={"u"}>Blogs</Link>
          </div>
          <ChevronRight />
        </div>
         <div className={commonClasses}>
          <div className={commonClasses2}>
            <Radio/>
            <Link to={"u"}>Live Shows</Link>
          </div>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
