

import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks/GetBlogs";
import { ReadingComponent } from "../components/ReadingComponent";
import { Link, useLocation } from "react-router-dom";

export const ReadABlog = () => {
    const location=useLocation();
    const userData=location.state;
    if(userData===null){
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-slate-700">
          <div className="text-center p-10 bg-white rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome!</h1>
            <p className="text-lg mb-6 text-gray-600">Please choose an option to continue</p>
            <div className="space-x-4">
              <Link to="/">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
                  Home
                </button>
              </Link>
              <Link to="/signin">
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-200">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
          );
    }
    const {blogs}=useBlogs();
    return (
        <div>
            <ReadingComponent></ReadingComponent>
            <div className=" mt-10 shadow-2xl bg-slate-50">
                 <div className="flex justify-center">
                    <div className="flex w-full sm:w-2/3 xl:w-1/2  shadow-sm">
                    <div className=" mx-5 sm:p-5">
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