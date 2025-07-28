
import Nav3 from "../../../components/Nav3";
import Footer from "../../../components/Footer";

const BlogDetails = () => {
  return (
    <div>
      <Nav3></Nav3>
      <div className="w-full shadow-2xl text-white px-4 py-6 min-h-screen home">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6"></div>
          <div className="text-center py-8 text-gray-400">
            <p>No blogs ailable at the moment.</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default BlogDetails;
