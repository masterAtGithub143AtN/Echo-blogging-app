import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { decodedTokenType } from "./PublicProfile";
import { jwtDecode } from "jwt-decode";
import { useBlogs } from "../hooks/GetBlogs";
import { AppBar } from "../components/AppBar";
import BlogCard from "../components/BlogCard";


export const Home =()=>{
    const navigate=useNavigate();
    const {blogs,loading}=useBlogs();
    useEffect(()=>{
        ;(async()=>{
            const token=localStorage.getItem("token");
            if(token){
                const decodeMessage:decodedTokenType=jwtDecode(token);
                if(decodeMessage.username){
                    navigate(`/blog/${decodeMessage.username}`,{state:decodeMessage});
                }
            }
        })();
    },[])
    return(
        <div>
            <div>
                <AppBar loggedIn={false}></AppBar>
            </div>
            <div className="flex justify-center">
        <div className="flex w-3/4">
          <div className="p-5">
            {blogs?.map((blog) => (
             
              <BlogCard key={blog.id} blog={blog}/>
            ))}
          </div>
        </div>
      </div>
        </div>
    )

}