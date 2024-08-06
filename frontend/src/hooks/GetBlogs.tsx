import axios from "axios";
import { useEffect, useState } from "react"
export interface Blog{
    id:number;
    title:string;
    content:string;
    author:{
        username:string;
        name:string;
    }
    imageUrl:string | "gvgh";
    date:string | "23/07/2024";
}

export const useBlogs=()=>{
    const BackendUrl=process.env.REACT_APP_BACKEND_URL;
    const [loading,setLading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>();

    useEffect(()=>{
        ;(async()=>{
            const response=await axios.get(`${BackendUrl}/blog/bulk`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            });
            // console.log(" response ",response.data);
            setBlogs(response.data);
            setLading(false);
        })()
    },[])

    return {loading,blogs};
}