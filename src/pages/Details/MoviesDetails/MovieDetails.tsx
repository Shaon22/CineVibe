import { useLoaderData } from "react-router-dom";

const MovieDetails = () => {
  const moviesInfo = useLoaderData();
  const { _id } = moviesInfo;

  return (
    <div className="flex">
      <h1></h1>
      <video className="min-h-screen p-10 fixed" width="1000" controls>
        <source type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* other data */}
      <div className="flex flex-col">
            <h1>shaon</h1>
            <h1>shaon</h1>
            <h1>shaon</h1>
            <h1>shaon</h1>
            <h1>shaon</h1>
            <h1>shaon</h1>
            <h1>shaon</h1>
            <h1>shaon</h1>
           
      </div>
    </div>
  );
};

export default MovieDetails;
