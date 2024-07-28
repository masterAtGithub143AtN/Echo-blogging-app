import { useLocation, useNavigate } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/GetBlogs";
import { AppBar } from "../components/AppBar";
import { useEffect } from "react";



export const UserDesktop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData= location.state;

  useEffect(() => {
    if (!userData) {
      navigate("/signin");
    }
  }, [userData, navigate]);

  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar userData={userData} imageUrl="/image/saket" fromwhere="userDesktop" public={false} />
      <div className="flex justify-center">
        <div className="flex w-3/4">
          <div className="p-5">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} state={userData}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDesktop;
