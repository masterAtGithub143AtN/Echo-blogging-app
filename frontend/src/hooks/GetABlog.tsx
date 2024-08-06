import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

interface Blog{
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

export const useGetABlog=()=>{
    const BackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    const {blogid}=useParams<{blogid:string}>();
    const [loading,setLading]=useState(true);
    const [blog,setBlog]=useState<Blog>({
        id:-1,
        title:"",
        content:"",
        author:{
            username:"",
            name:""
        },
        imageUrl:"",
        date:"23/07/2024"
    });
    const [error,setError]=useState(false);
    // console.log("id ",blogid);
    useEffect(()=>{
        const scrollToTop = () => {
            const position = document.documentElement.scrollTop || document.body.scrollTop;
            if (position > 0) {
              window.scrollTo(0, position - position / 10); // Change the divisor to control speed
              requestAnimationFrame(scrollToTop);
            }
          };
          requestAnimationFrame(scrollToTop);
        // const hasReloaded = localStorage.getItem('hasReloaded');
        // if (!hasReloaded) {
        //  localStorage.setItem('hasReloaded', 'true');
        // window.location.reload();
        // }
  
        try {
            ;(async()=>{
                const response=await axios.get(`${BackendUrl}/blog/read/${blogid}`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
                // console.log(" response ",response.data);
                setBlog(response.data);
                setLading(false);
            })();
        } catch (err) {
            setLading(false);
            setError(true);
            // console.log("error ",error);
            // console.log("loading ",loading);
        }
    },[blogid])
    return {loading,blog,error};
}