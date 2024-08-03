import { Link, useNavigate } from "react-router-dom"
import { AppBar } from "../components/AppBar"
import { jwtDecode } from "jwt-decode"
import BlogCard from "../components/BlogCard";
import { usePublicDetails } from "../hooks/GetPublicDetails";
import { SkeletonForAppBar } from "../components/SkeletonForAppBar";
import SkeletonScreen from "../components/SkeletonForBlogs";
import SkeletonElement from "../components/SkeletonElement";
import { useEffect } from "react";



export interface decodedTokenType{
    username:string,
    id:number,
    name:string,
}


export const PublicProfile = () => {
    const navigate=useNavigate();

    const token=localStorage.getItem("token");
    if(token===null){
      return <>
      <div>
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
      </div>
      </>
    }
    const userData:decodedTokenType=jwtDecode(token);
    useEffect(()=>{
        if(userData.username==null){
            alert('not username in token');
            navigate("/signin");
        }
    
    },[]);

    const {publicDetails,loading,error}=usePublicDetails();
    if(error){
        return <div>error occured</div>
    }
    if(loading){
        return <div>
            <div className=" w-full">
                <SkeletonForAppBar></SkeletonForAppBar>
            </div>
         <div className=" grid grid-cols-10 ">
         <div className=" col-span-7 bg-white">
                <div className=" flex flex-col justify-center">
                    <div className=" flex flex-row justify-center">
                        <div className="w-3/4 pt-8 h-32">
                             <SkeletonElement width="100%" height="100%"></SkeletonElement>
                            <div>
                               <SkeletonScreen></SkeletonScreen>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" col-span-3 shadow-sm bg-slate-50 h-screen">
                <SkeletonElement width="100%" height="100%"></SkeletonElement>
            </div>
         </div>
        </div>
    }
    const blogsWithAuthor = publicDetails.blogs.map(blog => ({
        ...blog,
        author: {
          username: publicDetails.username,
          name: publicDetails.name,
        },
        imageUrl: "",
      }));
      
        return (
        <div>
            <div className=" w-full">
                <AppBar userData={userData} imageUrl={""} public={false}></AppBar>
            </div>
         <div className=" grid grid-cols-10 ">
         <div className=" col-span-7 bg-white">
                <div className=" flex flex-col justify-center">
                    <div className=" flex flex-row justify-center">
                        <div className="w-3/4 pt-8">
                                <div className=" text-3xl font-semibold ">{publicDetails.name}</div>

                            <div>
                                <div className=" flex justify-center mt-12">
                                    <div className=" text-lg font-medium">Blogs written by {publicDetails.name}</div>
                                </div>
                               <div className=" justify-center mt-0">
                                    {blogsWithAuthor.map((blog)=>
                                        <BlogCard key={blog.id} blog={blog} state={userData}></BlogCard>
                                    )}
                                    {/* <div>
                                        {publicDetails.blogs?.map((blog)=>(
                                            <div>
                                                <BlogCard key={blog.id} blog={{blog,author}}></BlogCard>
                                            </div>
                                        ))}
                                    </div> */}
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" col-span-3 shadow-sm bg-slate-50">
                <div className=" flex flex-col justify-center pt-10">
                    
                <div className=" flex flex-row justify-center mt-24">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                </div>
                <div className=" flex justify-center mt-9">
                    <div className=" ml-5">{publicDetails.about || "Welcome to my profile"}</div>
                </div>
                </div>
            </div>
         </div>
        </div>
    )
}