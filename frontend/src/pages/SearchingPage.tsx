import { Link, useNavigate } from "react-router-dom";
import { decodedTokenType } from "./PublicProfile";
import { jwtDecode } from "jwt-decode";
import { useSearching } from "../hooks/Searching";
import { AppBar } from "../components/AppBar";
import BlogCard from "../components/BlogCard";



export const SearchingPage = () => {
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    if(token===null){
      return <>
      <div>
        <div className=" flex flex-col justify-center  h-screen">
            <div className=" flex flex-row justify-center text-green-200">
                <div className=" text-2xl font-semibold ">
    
                <div>
                    <div>Please sign in to view this page</div>
                    <Link to={"/signin"}>
                    <div className=" text-2xl">Click</div>
                    </Link>
                    <div>Here to signin</div>
                </div>
                </div>
            </div>
        </div>
      </div>
      </>
    }
    const userData:decodedTokenType=jwtDecode(token);
    if(userData.username==null){
        alert('not username in token');
        navigate("/signin");
    }
    const {blogs,loading}=useSearching();
    // if(error){
    //     return <div>error occured</div>
    // }
    if(loading){
        return <div>loading...</div>
    }
    const length:number=blogs?.length;

    return (
        <div>
            <div>
                <AppBar userData={userData} imageUrl="" public={false}></AppBar>
            </div>
            <div className="flex justify-center">
                <div className="flex ">
                <div className="">
                    {(length>0) ?blogs?.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} state={userData}/>
                    )):<div className="flex items-center justify-center min-h-screen">
                    <div className="text-center p-6 bg-slate-50 rounded-md shadow-sm">
                      <h2 className="text-2xl font-bold text-gray-700 mb-4">No Blogs Found</h2>
                      <p className="text-gray-600">Try searching with different keywords.</p>
                    </div>
                  </div>}
                </div>
                </div>
            </div>
        </div>
    );
}

