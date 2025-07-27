import { useLoaderData } from "react-router-dom";

const SeriesDetails = () => {
             const seriesInfo = useLoaderData();
             const {_id}=seriesInfo
            return (
                        <div>
                                {_id}    
                        </div>
            );
};

export default SeriesDetails;