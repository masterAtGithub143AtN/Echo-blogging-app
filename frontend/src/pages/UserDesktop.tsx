import { useLocation, useNavigate } from "react-router-dom";
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
  
  let userData1:decodedTokenType;
  useEffect(() => {


    if(btoken==null){
      navigate("/signin");
      return;
    }
    if(userData && btoken){
      const decodedToken:decodedTokenType=jwtDecode(btoken);
      if(userData.username !== decodedToken.username){
        navigate("/signin");
        return;
      }
    }



    if (!userData) {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      if(token){
      userData1= jwtDecode(token);
      userData.username=userData1.username;
      userData.name=userData1.name;
      userData.id=userData1.id;
      }
    }
    ;(async()=>{
      const response=await axios.post(`${BackendUrl}/user/verify/${userData.username || userData1.username}`)
      if(response.data==false){
        navigate("/signin");
      }
    })();
  }, [userData, navigate]);

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
              <div className=" bg-slate-50">
              <BlogCard key={blog.id} blog={blog} state={userData}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDesktop;
