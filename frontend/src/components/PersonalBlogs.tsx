import { useEffect, useState } from "react";
import { Blog } from "../hooks/GetBlogs";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import { decodedTokenType } from "../pages/PublicProfile";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SkeletonScreen from "./SkeletonForBlogs";


export const PersonalBlogs = () => {
    const BackendUrl=process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem("token");
    if (token === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
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
    const userData: decodedTokenType = jwtDecode(token);
    const [loading, setLading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(()=>{
        ;(async()=>{
            const response=await axios.get(`${BackendUrl}/blog/read`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            });
            setBlogs(response.data);
            setLading(false);
        })();
    },[])
    if(loading){
        return (
            <div className="flex justify-center w-full">
                <div className="flex w-full">
                <div className=" w-full">
                   <div className=" w-full ">
                        <SkeletonScreen></SkeletonScreen>
                    </div>
                    </div>
                </div>
            </div>

        );
    }
    if(blogs.length===0){
        return (
            <div>
                <div className="flex flex-row justify-center">
                    <div className="text-2xl font-semibold">
                        <div>
                            <div>No blogs to show</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            {blogs.map((blog)=>{
                return <BlogCard key={blog.id} blog={blog} state={userData} editable={true}></BlogCard>
            })}
        </div>
    );
    };