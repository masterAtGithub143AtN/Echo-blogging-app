import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { SkeletonForAppBar } from '../components/SkeletonForAppBar';
import SkeletonScreen from '../components/SkeletonForBlogs';
import { AppBar } from '../components/AppBar';
import { useBlogs } from '../hooks/GetBlogs';
import { BackendUrl } from '../Config';
import BlogCard from '../components/BlogCard';

interface DecodedTokenType {
  username: string;
  name: string;
  id: string;
}

const UserDesktop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const userData = location.state;
  const btoken = localStorage.getItem('token');
  const [user, setUser] = useState(userData);

  useEffect(() => {
    if (!btoken) {
      return;
    }

    const decodedTokenType: DecodedTokenType = jwtDecode(btoken);

    if (!user) {
      setUser({
        username: decodedTokenType.username,
        name: decodedTokenType.name,
        id: decodedTokenType.id,
      });
    }

    if (decodedTokenType.username !== username) {
      navigate('/');
    } else {
      (async () => {
        try {
          const response = await axios.post(`${BackendUrl}/user/verify/${username}`, {
            headers: {
              Authorization: btoken,
            },
          });

          if (response.data === false) {
            navigate('/signin');
          }
        } catch (error) {
          console.error('Verification error:', error);
          navigate('/signin');
        }
      })();
    }
  }, [username, btoken, navigate, user]);

  const { loading, blogs } = useBlogs();

  if (!btoken) {
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
