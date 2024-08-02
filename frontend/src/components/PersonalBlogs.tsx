import { useEffect, useState } from "react";
import { Blog } from "../hooks/GetBlogs";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import { decodedTokenType } from "../pages/PublicProfile";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BackendUrl } from "../Config";
import SkeletonScreen from "./SkeletonForBlogs";


export const PersonalBlogs = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return (
            <div className="flex flex-col justify-center h-screen">
                <div className="flex flex-row justify-center text-green-200">
                    <div className="text-2xl font-semibold">
                        <div>
                            <div>Please sign in to view this page</div>
                            <Link to="/signin">
                                <div className="text-2xl">Click</div>
                            </Link>
                            <div>Here to sign in</div>
                        </div>
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