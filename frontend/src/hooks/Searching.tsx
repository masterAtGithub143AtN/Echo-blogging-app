import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BackendUrl } from "../Config";

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


export const useSearching = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('query') || '';
    const [loading,setLading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);
    console.log("query ",query);

    useEffect(()=>{
        ;(async()=>{
            const response=await axios.get(`${BackendUrl}/blog/search`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                },
                params:{
                    query
                }
            }
        );
            // console.log(" response ",response.data);
            setBlogs(response.data);
            setLading(false);
        })()
    },[query])

    return {loading,blogs};

}