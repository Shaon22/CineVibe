import { useLoaderData } from 'react-router-dom';

const BlogDetails = () => {
             const blogsInfo = useLoaderData();
             const {_id}=blogsInfo
            return (
                        <div>
                                {_id}    
                        </div>
            );
};

export default BlogDetails;