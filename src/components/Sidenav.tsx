import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const commonClasses = "px-20 py-2 border border-gray-500 rounded text-white hover:bg-gray-500";
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

      <div className="flex flex-col gap-5 p-5 text-center">
        <Link className={commonClasses} to={'u'}>Home</Link>
        <Link className={commonClasses} to={'/'}>Movies</Link>
        <Link className={commonClasses} to={'/'}>Series</Link>
        <Link className={commonClasses} to={'/'}>Blogs</Link>
        <Link className={commonClasses} to={'/'}>Home</Link>
        
       
    </div>
    </div>
  );
};

export default Sidenav;