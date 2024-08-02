import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Blog } from "../hooks/GetBlogs";

interface BlogCardProps {
  blog: Blog;
  state?:{
    username?:string,
    name?:string,
    id?:number,
  };
  editable?:boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog,state,editable }) => {
  const length_of_reading = Math.ceil(blog.content.length / 100);
  // console.log("blog ",blog);
  return (
    <div className="shadow-sm rounded-md p-3 my-10">
      <div className="flex justify-center w-max my-2">
        <Avatar size="small" username={blog.author.username} public={true} />
        <Link to={`/public/${blog.author.username}`}>
          <div className="flex pl-3">
            <div>{blog.author.name}</div>
          </div>
        </Link>
      </div>
      <Link to={`/public/blog/${blog.id}`}  state={state}>
        <div className="font-bold text-2xl">{blog.title.slice(0, 500) + (blog.title.length > 499 ? "..." : "")}</div>
        <div>{blog.content.slice(0, 170) + (blog.content.length + length_of_reading.toString().length + 7 >= 100 ? "..." : "")} ({length_of_reading} mins)</div>
      </Link>
      <div className="flex w-full items-center">
        <div className="text-sm font-thin">Published on {blog.date.slice(0, 10)}</div>
        {(editable === undefined || editable === false) ? null : (
          <Link to={`/${state?.username}/blog/${blog.id}/edit`} state={state} className="ml-auto text-base font-semibold">
            Edit...
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
