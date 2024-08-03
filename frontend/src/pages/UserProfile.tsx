import { jwtDecode } from "jwt-decode";
import { Link, useLocation, useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { decodedTokenType } from "./PublicProfile";
import { AppBar } from "../components/AppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Blog } from "../hooks/GetBlogs";
import About from "../components/About";
import { BackendUrl } from "../Config";
import { PersonalBlogs } from "../components/PersonalBlogs";

export const UserProfile = () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    return (
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
    );
  }

  const userData: decodedTokenType = jwtDecode(token);
  const {username}=useParams<{username:string}>();
  if(userData.username===null){
    return (
      <div className="flex flex-col justify-center h-screen">
        <div className="flex flex-row justify-center text-green-200">
          <div className="text-2xl font-semibold">
            <div>
              <div>Please sign in to view this page</div>
              <Link to="/signin">
                <div className="text-2xl">Click</div>
              </Link>
              <div>Here to sign in</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if(username!==userData.username){
    return (
      <div className="flex flex-col justify-center h-screen">
        <div className="flex flex-row justify-center text-green-200">
          <div className="text-2xl font-semibold">
            <div>
              <div>Please sign in to view this page</div>
              <Link to="/signin">
                <div className="text-2xl">Click</div>
              </Link>
              <div>Here to sign in</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const [activePage, setActivePage] = useState('home');
  const location=useLocation();
  // console.log(userData);
  useEffect(()=>{
    const state=location.state;
    if(state=="PersonalBlog"){
      setActivePage("PersonalBlog");
    }
  },[])
  const renderContent = () => {
    if (activePage === 'home') {
      return <Home username={userData.username} id={userData.id} name={userData.name} />;
    } else if (activePage === 'about') {
      return <About username={userData.username}/>;
    }
    else if (activePage === 'PersonalBlog') {
      return <>
      <div>
        <PersonalBlogs></PersonalBlogs>
      </div>
      </>
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div>
          <AppBar userData={userData} imageUrl="" />
        </div>
        <div className="grid grid-cols-12 h-screen">
          <div className="col-span-7 bg-slate-50">
            <div className="flex flex-col justify-center h-max shadow-md">
              <div className="flex flex-col ml-20">
                <div className="flex flex-col justify-center">
                  <div className="text-3xl font-medium my-16">{userData.name}</div>
                </div>
                <div className="flex">
                  <div className="text-xl pr-3 pb-2">
                    <div
                      className={`cursor-pointer border-b-2 ${activePage === 'home' ? 'border-black' : 'border-transparent'}`}
                      onClick={() => setActivePage('home')}
                    >
                      Home
                    </div>
                  </div>
                  <div className="text-xl pb-2 pl-2">
                    <div
                      className={`cursor-pointer border-b-2 ${activePage === 'about' ? 'border-black' : 'border-transparent'}`}
                      onClick={() => setActivePage('about')}
                    >
                      About
                    </div>
                  </div>
                  <div className="text-xl pb-2 pl-5">
                    <div
                      className={`cursor-pointer border-b-2 ${activePage === 'PersonalBlog' ? 'border-black' : 'border-transparent'}`}
                      onClick={() => setActivePage('PersonalBlog')}
                    >
                      Your Blogs
                    </div>
                  </div>
                </div>
              </div>
            </div>
                <div className="mt-4 ml-20 mr-1">
                  {renderContent()}
                </div>
          </div>
          <div className="col-span-5 bg-slate-100">
            <div className="flex flex-col justify-center mt-32">
              <div className="flex flex-row justify-center">
                <Avatar username={userData.username} public={false} size="large" link={false} />
              </div>
              <div className="flex flex-row justify-center mt-5">
                <Link to={`/profile/${userData.username}/edit`}>
                  <div>Edit Profile</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// const About = (props:any) => {
//   const [about, setAbout] = useState();

//   useEffect(()=>{
//     (async()=>{
//       const response=await axios.get(`http://127.0.0.1:8787/api/v1/user/${props.username}/about`,{
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       });
      
//       setAbout(response.data);
//     })();
//   },[])

//   if(about==null || about===undefined){
//     return <div className=" bg-stone-100 p-10">
//     <div className=" flex flex-col justify-center">
//       <div className=" flex flex-row justify-center text-lg font-semibold mt-2">Tell the world about yourself</div>
//     </div>
//     <div>
//       <div className=" flex flex-row justify-center text-sm my-4">Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.</div>
//     </div>
//     <div className="flex flex-row justify-center">
//       <Link to={`/${props.username}/about/write`}>
//          <div className=" w-max bg-gray-200 p-5 rounded-xl text-lg">Write about yourself</div>
//       </Link>
//     </div>
//   </div>
//   }

//   return <div>{about}</div>;
// };





export interface favoriteBlog{
  id:number;
  blog:Blog;
}


const Home = (props:any) => {
  const [favoriteBlogs, setFavoriteBlogs] = useState<favoriteBlog[]>();
  useEffect(()=>{
    ;(async()=>{
      try {
        const response=await axios.get(`${BackendUrl}/blog/get/favorite/${props.username}`,{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        })
        setFavoriteBlogs(response.data);
        // console.log(response.data);
      } catch (error) {
       alert('msg: Error fetching favorite blogs');
    }
    })();
  },[])
  if(favoriteBlogs==null || favoriteBlogs===undefined){
    return <div className="bg-slate-100 p-10">
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-center text-lg font-semibold mt-2">Welcome to your profile</div>
    </div>
    <div>
      <div className="flex flex-row justify-center text-sm my-4">wait</div>
    </div>
  </div>
}


//@ts-ignore
else if(favoriteBlogs.length===0){
  // console.log("length is 0");
  return <div className="bg-slate-100 p-10">
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-center text-lg font-semibold mt-2">Welcome to your profile</div>
    </div>
    <div>
      <div className="flex flex-row justify-center text-sm my-4">You have not saved any blog as a favorite</div>
    </div>
  </div>
 }



  return <div className=" flex justify-center">
    {favoriteBlogs?.map((blogwithuser=>{
      return <div>
        <BlogCard key={blogwithuser.id} blog={blogwithuser.blog} state={props}></BlogCard>
      </div>
    }))}
  </div>
};
