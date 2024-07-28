

import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks/GetBlogs";
import { ReadingComponent } from "../components/ReadingComponent";
import { useLocation } from "react-router-dom";

export const ReadABlog = () => {
    const location=useLocation();
    const userData=location.state;
    const {blogs}=useBlogs();
    return (
        <div>
            <ReadingComponent></ReadingComponent>
            <div className=" mt-10 shadow-2xl bg-slate-50">
                 <div className="flex justify-center">
                    <div className="flex w-1/2  shadow-sm">
                    <div className="p-5">
                    <div className="flex justify-center my-4">
                            <div className="text-center text-2xl font-semibold text-gray-700">
                             <span className="text-blue-500">Read few more interesting blogs ...</span> 
                            </div>
                            </div>

                        {blogs?.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} state={userData}/>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}