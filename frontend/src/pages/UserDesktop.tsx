// import { useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { SkeletonForAppBar } from '../components/SkeletonForAppBar';
// import SkeletonScreen from '../components/SkeletonForBlogs';
// import { AppBar } from '../components/AppBar';
// import { useBlogs } from '../hooks/GetBlogs';
// import BlogCard from '../components/BlogCard';

// interface DecodedTokenType {
//   username: string;
//   name: string;
//   id: string;
// }

// const UserDesktop = () => {
//   const BackendUrl=process.env.REACT_APP_BACKEND_URL;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { username } = useParams<{ username: string }>();
//   const userData = location.state;
//   const token = localStorage.getItem('token');
//   const [user, setUser] = useState(userData);

//   useEffect(() => {
//     if (!token) {
//       // console.log('No token found');
//       return;
//     }

//     const decodedTokenType: DecodedTokenType = jwtDecode(token);

//     if (!user) {
//       setUser({
//         username: decodedTokenType.username,
//         name: decodedTokenType.name,
//         id: decodedTokenType.id,
//       });
//     }

//     if (decodedTokenType.username !== username) {
//       // console.log('User not authorized');
//       navigate('/');
//     }

//     ;(async()=>{
//       const response=await axios.get(`${BackendUrl}/user/veryfy/${username}`,{
//         headers:{
//           Authorization:token
//         }
//       });
//       if(response.status!==200){
//         navigate('/');
//       }
//       if(response.data.message==false){
//         navigate('/');
//       }
//     })();
//   }, [username, token, navigate, user]);

//   const { loading, blogs } = useBlogs();

//   if (!token) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-slate-700">
//         <div className="text-center p-10 bg-white rounded-xl shadow-lg">
//           <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome!</h1>
//           <p className="text-lg mb-6 text-gray-600">Please choose an option to continue</p>
//           <div className="space-x-4">
//             <Link to="/">
//               <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
//                 Home
//               </button>
//             </Link>
//             <Link to="/signin">
//               <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-200">
//                 Sign In
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (user && user.username !== username) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-slate-700">
//         <div className="text-center p-10 bg-white rounded-xl shadow-lg">
//           <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome!</h1>
//           <p className="text-lg mb-6 text-gray-600">You are not authorized to visit this</p>
//           <p className="text-lg mb-6 text-gray-600">Please choose an option to continue</p>
//           <div className="space-x-4">
//             <Link to="/">
//               <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200">
//                 Home
//               </button>
//             </Link>
//             <Link to="/signin">
//               <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-200">
//                 Sign In
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div>
//         <SkeletonForAppBar />
//         <SkeletonScreen />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <AppBar userData={userData} imageUrl="/image/saket" fromwhere="userDesktop" public={false} />
//       <div className="flex justify-center">
//         <div className="flex w-full sm:w-3/4">
//           <div className="sm:p-5">
//             {blogs?.map((blog) => (
//               <div className=" bg-slate-50 mx-3 sm:mx-0" key={blog.id}>
//               <BlogCard  blog={blog} state={userData}/>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDesktop;








// import { useState } from "react";
// import { InputBox } from "../components/InputBox";
// import { Qoute } from "../components/Quote";
// import { SignupInput, signupInput } from "@saket_12/medium-common";
// import { Heading } from "../components/Heading";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Signup = () => {
//     const BackendUrl = process.env.REACT_APP_BACKEND_URL;
//     const navigate = useNavigate();
//     const [input, setInput] = useState<SignupInput>({
//         username: "",
//         name: "",
//         password: "",
//         email: "",
//         collegename: "",
//         course: "",
//         semester: "",
//         passingyear: "",
//         branch: "",
//     });

//     async function senRequest() {
//         try {
//             const { success } = signupInput.safeParse(input);
//             if (!success) {
//                 alert("Invalid input");
//                 return;
//             }
//             console.log('Sending request with input:', input);
//             const response = await axios.post(`${BackendUrl}/user/signup`, input);
//             console.log('Response from backend:', response);
//             localStorage.setItem("token", response.data.token);
//             navigate(`/blog/${input.username}`, { state: input });
//         } catch (error) {
//             console.error('Error creating user:', error);
//             alert('Error creating user, please try again');
//         }
//     }

//     return (
//         <div className="grid grid-cols-2">
//             <div className="flex justify-center">
//                 <div className="flex flex-col justify-center">
//                     <div className="flex justify-center shadow-md bg-slate-400 rounded-md">
//                         <div className="flex flex-col justify-center w-4/5 md:w-max h-max m-4">
//                             <div>
//                                 <InputBox
//                                     type="text"
//                                     placeholder="username_12"
//                                     message="UserName *"
//                                     onchange={(e) => {
//                                         setInput({ ...input, username: e.target.value });
//                                     }}
//                                 />
//                             </div>
//                             <div>
//                                 <InputBox
//                                     type="password"
//                                     placeholder="Enter your password"
//                                     message="Password *"
//                                     onchange={(e) => {
//                                         setInput({ ...input, password: e.target.value });
//                                     }}
//                                 />
//                             </div>
//                             <div>
//                                 <InputBox
//                                     type="email"
//                                     placeholder="Enter your email"
//                                     message="Email *"
//                                     onchange={(e) => {
//                                         setInput({ ...input, email: e.target.value });
//                                     }}
//                                 />
//                             </div>
//                             <div>
//                                 <InputBox
//                                     type="text"
//                                     placeholder="Saket Suman"
//                                     message="Full Name"
//                                     onchange={(e) => {
//                                         setInput({ ...input, name: e.target.value });
//                                     }}
//                                 />
//                             </div>
//                             <div>
//                                 <InputBox
//                                     type="text"
//                                     placeholder="IIT Bhubaneswar"
//                                     message="College"
//                                     onchange={(e) => {
//                                         setInput({ ...input, collegename: e.target.value });
//                                     }}
//                                 />
//                             </div>
//                             <div className="flex justify-center pt-3">
//                                 <button
//                                     onClick={senRequest}
//                                     className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                                 >
//                                     Signup
//                                 </button>
//                             </div>
//                             <div className="flex justify-center p-3 bg-slate-50 rounded-md">
//                                 <Heading message="Already have an account ?" functionality="signin"></Heading>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <Qoute />
//             </div>
//         </div>
//     );
// };











import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { SkeletonForAppBar } from '../components/SkeletonForAppBar';
import SkeletonScreen from '../components/SkeletonForBlogs';
import { AppBar } from '../components/AppBar';
import { useBlogs } from '../hooks/GetBlogs';
import BlogCard from '../components/BlogCard';
import { jwtDecode } from 'jwt-decode';

interface DecodedTokenType {
  username: string;
  name: string;
  id: string;
}

const UserDesktop = () => {
  const BackendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const userData = location.state;
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(userData);

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      return;
    }

    const decodedTokenType: DecodedTokenType = jwtDecode(token);

    if (!user) {
      setUser({
        username: decodedTokenType.username,
        name: decodedTokenType.name,
        id: decodedTokenType.id,
      });
    }

    if (decodedTokenType.username !== username) {
      console.log('User not authorized');
      navigate('/');
    }

    (async () => {
      try {
        const response = await axios.get(`${BackendUrl}/user/verify/${username}`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status !== 200 || response.data.message === false) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        navigate('/');
      }
    })();
  }, [username, token, navigate, user]);

  const { loading, blogs } = useBlogs();

  if (!token) {
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

  if (user && user.username !== username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-slate-700">
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome!</h1>
          <p className="text-lg mb-6 text-gray-600">You are not authorized to visit this</p>
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

  if (loading) {
    return (
      <div>
        <SkeletonForAppBar />
        <SkeletonScreen />
      </div>
    );
  }

  return (
    <div>
      <AppBar userData={userData} imageUrl="/image/saket" fromwhere="userDesktop" public={false} />
      <div className="flex justify-center">
        <div className="flex w-full sm:w-3/4">
          <div className="sm:p-5">
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog) => (
                <div className="bg-slate-50 mx-3 sm:mx-0" key={blog.id}>
                  <BlogCard blog={blog} state={userData} />
                </div>
              ))
            ) : (
              <div>No blogs available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDesktop;
