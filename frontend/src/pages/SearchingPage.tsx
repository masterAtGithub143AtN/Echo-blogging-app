import { Link, useNavigate } from "react-router-dom";
import { decodedTokenType } from "./PublicProfile";
import { jwtDecode } from "jwt-decode";
import { useSearching } from "../hooks/Searching";
import { AppBar } from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import SkeletonScreen from "../components/SkeletonForBlogs";


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
    const length:number=blogs?.length;
    return (
        <div className=" bg-gray-50">
            <div>
                <AppBar userData={userData} imageUrl="" public={false}></AppBar>
            </div>
            <div className="flex justify-center w-full">
                <div className="flex w-full">
                <div className=" w-full">
                    {loading ? <div className=" w-full ">
                        <SkeletonScreen></SkeletonScreen>
                    </div> :<div className=" justify-center">
                    <div className="flex justify-center bg-white">
                <div className="flex w-full sm:w-3/4">
                 <div className="sm:p-5">
                    {(length>0) ?blogs?.map((blog) => (
                        <div className=" bg-slate-100 rounded-md mx-3 sm:mx-0" key={blog.id}>  
                    <BlogCard blog={blog} state={userData} key={blog.id}/>
                    </div>)):<></>}
                  </div>
                </div>
                </div>
                {length==0 ? 
                   <div>
                    <div className="flex items-center justify-center h-96 ">
                    <div className="text-center bg-slate-50 rounded-md shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-700 mb-3 pt-3 pr-3 pl-3">No Blogs Found</h2>
                      <p className="text-gray-600 pb-3 pl-3 pr-3">Try searching with different keywords.</p>
                    </div>
                  </div>
                  <div className=" w-full h-56 bg-gray-50"></div>
                  </div> : <></>}
                   </div> }
                </div>
                </div>
            </div>
        </div>
    );
}
