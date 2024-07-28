import { Link, useLocation  } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useGetABlog } from "../hooks/GetABlog"
import { AppBar } from "./AppBar";



export const ReadingComponent = () => {
    const location=useLocation();
    const {blog,loading,error}=useGetABlog();
    if(error){
        return <div>error occured</div>
    }
    
   
    {console.log(error)}
    if(loading){
        return <div>loading...
            <div >

            </div>
        </div>
    }
    const userData=location.state;
    return(
        <div>
        <div>
            <AppBar userData={userData} imageUrl="/s" fromwhere="userDesktop" public={false}></AppBar>
        </div>
        <div className=" flex justify-center">
        <div className="felx justify-center w-1/2">
            <div className=" flex flex-col justify-center">
                    <div className="flex  flex-col w-full h-max p-3 py-5 shadow-sm rounded-md my-5 ">
                        <div className=" text-2xl font-semibold">{blog.title}</div>
                        <div className=" flex flex-row pt-2 pl-3">
                            <div className=" h-12">
                                <Avatar username={blog.author.username} size="medium" public={true}></Avatar>
                            </div>
                            <div className=" h-10 pl-3">
                                <Link to={`/public/${blog.author.username}`}>
                                    <div>{blog.author.name}</div>
                                </Link>
                                <div className=" text-sm font-thin">Published on {blog.date.slice(0,10)}</div>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row w-full h-max p-3 shadow-sm rounded-md mb-10">
                        <div className=" text-lg">{blog.content}</div>
                    </div>
            </div>
        </div>
    </div>
    </div>
    )
}