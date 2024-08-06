import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { SkeletonForAppBar } from '../components/SkeletonForAppBar';
import SkeletonScreen from '../components/SkeletonForBlogs';
import { AppBar } from '../components/AppBar';
import { useBlogs } from '../hooks/GetBlogs';
import BlogCard from '../components/BlogCard';

interface DecodedTokenType {
  username: string;
  name: string;
  id: string;
}

const UserDesktop = () => {
  const BackendUrl=process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const userData = location.state;
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(userData);

  useEffect(() => {
    if (!token) {
      // console.log('No token found');
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
      // console.log('User not authorized');
      navigate('/');
    }

    ;(async()=>{
      const response=await axios.get(`${BackendUrl}/user/veryfy/${username}`,{
        headers:{
          Authorization:token
        }
      });
      if(response.status!==200){
        navigate('/');
      }
      if(response.data.message==false){
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
            {blogs?.map((blog) => (
              <div className=" bg-slate-50 mx-3 sm:mx-0" key={blog.id}>
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
