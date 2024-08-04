import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/GetBlogs";
import { AppBar } from "../components/AppBar";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { decodedTokenType } from "./PublicProfile";
import SkeletonScreen from "../components/SkeletonForBlogs";
import { SkeletonForAppBar } from "../components/SkeletonForAppBar";
import axios from "axios";
import { BackendUrl } from "../Config";



export const UserDesktop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData= location.state;
  const btoken=localStorage.getItem("token");
  if(btoken==null){
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-slate-700">
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
  }

  const decodedTokenType:decodedTokenType=jwtDecode(btoken);
  const {username}=useParams<{username:string}>();
  if(decodedTokenType.username!=username){
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-slate-700">
    <div className="text-center p-10 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome!</h1>
      <p className="text-lg mb-6 text-gray-600">You are not Authorized to vist this</p>
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
  }
  if(userData==null || userData==undefined){
    userData.username=decodedTokenType.username;
    userData.name=decodedTokenType.name;
    userData.id=decodedTokenType.id;
  }
  
  useEffect(() => {
    
    ;(async()=>{
      const {username}=useParams<{username:string}>();
      const response=await axios.post(`${BackendUrl}/user/verify/${username}`,{
        headers:{
          Authorization:localStorage.getItem("token")
        }
      })
      if(response.data==false){
        navigate("/signin");
      }
    })();
  }, [userData]);

  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>
      <SkeletonForAppBar></SkeletonForAppBar>
      <SkeletonScreen></SkeletonScreen>
    </div>;
  }

  return (
    <div>
      <AppBar userData={userData} imageUrl="/image/saket" fromwhere="userDesktop" public={false} />
      <div className="flex justify-center">
        <div className="flex w-3/4">
          <div className="p-5">
            {blogs?.map((blog) => (
              <div className=" bg-slate-50" key={blog.id}>
              <BlogCard  blog={blog} state={userData}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDesktop;
