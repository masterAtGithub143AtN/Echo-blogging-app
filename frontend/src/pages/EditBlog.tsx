import { useEffect, useState } from "react";
import AutoResizingTextarea from "../components/Pragraph";
import { blogCreateInput } from "@saket_12/medium-common";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { decodedTokenType } from "./PublicProfile";
import { jwtDecode } from "jwt-decode";
import { SkeletonForAppBar } from "../components/SkeletonForAppBar";
import SkeletonElement from "../components/SkeletonElement";

export const EditBlog = () => {
  const BackendUrl=process.env.REACT_APP_BACKEND_URL;
    const location=useLocation();
    const userData=location.state;
    const token = localStorage.getItem("token");
    const {username,blogid} =useParams();
    if(!token){
        return <div>
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
      </div>
    };
    const userData1:decodedTokenType=jwtDecode(token);
    if(userData1?.username!=username){
        return <div>
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
    }
    if(!userData){
        return <div>
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
    }
  const navigate = useNavigate();
  
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [startingloading, setStartingLoading] = useState<boolean>(true);

  useEffect(()=>{
    ;(async()=>{
        try {
            const response = await axios.get(`${BackendUrl}/blog/read/${blogid}`,{
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
            });
            setTitle(response.data.title);
            setContent(response.data.content);
            setStartingLoading(false);
        } catch (error) {
            alert('msg: error while updating try again ', );
            // console.error(error);
        }
    })();
  },[]);


  const handleRequest = async () => {
    // console.log("Request Sent");
    if(title.trim()==="" || content.trim()===""){
        alert("Title and content can't be empty");
        return;
    }
    // Validate input
    const { success } = blogCreateInput.safeParse({ title, content });
    if (!success) {
      alert("Invalid input");
      setTitle("");
      setContent("");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${BackendUrl}/blog/update/${blogid}`,
        { title, content },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log("Blog created successfully");
      if(response){
        
        // Reset the input fields
        setLoading(false);
        alert('msg: Blog updated successfully');
        navigate(`/${username}/profile`, { state: "PersonalBlog" });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response.status === 501) {
        navigate("/signin");
      } else {
        // console.error(error);
        alert('Error while updating blog');
      }
    }
  };

  const handleTextChange = (text: string, type: string) => {
    if (type === "title") {
      setTitle(text);
    } else if (type === "content") {
      setContent(text);
    }
  };
  if(loading){
    return <div>
      <div className=" w-full h-screen bg-gray-100">
        <div className=" flex flex-col justify-center h-screen">
          <div className=" flex flex-row justify-center">
          <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
            <svg aria-hidden="true" role="status" className="inline w-3 h-11 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Updating...
            </button>
          </div>
        </div>
      </div>
    </div>
  }

  if(startingloading==true){
    return <div>
        <SkeletonForAppBar></SkeletonForAppBar>
        <div className="flex justify-center h-36 mx-5 mt-20">
        <div className="flex w-3/4 h-screen">
          <SkeletonElement width="100%" height="100%" />
        </div>
      </div>
    </div>
  }

  return (
    <div>
        <div>
            <AppBar userData={userData} imageUrl="/image/saket" public={false} fromwhere="Blogwriting"></AppBar>
        </div>
      {loading==false?<div className="flex justify-center">
        <div className="flex flex-col justify-center w-1/2">
          <div className="flex justify-center shadow p-3 my-5 rounded-lg">
            <AutoResizingTextarea
              message="Title"
              placeholder="Give title to your story"
              text_message="lg"
              text_placeholder="lg"
              onTextChange={handleTextChange}
              type="title"
              value={title}
              height={30}
            />
          </div>
          <div className="flex justify-center shadow p-3 my-5 rounded-lg">
            <AutoResizingTextarea
              message="Story"
              placeholder="Write your beautiful story"
              text_message="base"
              text_placeholder="md"
              onTextChange={handleTextChange}
              type="content"
              value={content}
                height={100}
            />
          </div>
          <div className="flex justify-center h-14">
            <div className=" flex flex-col justify-center">
              <div className=" flex flex-row justify-center">
              <button onClick={handleRequest} className="flex justify-center bg-blue-500 text-white rounded-lg w-36 h-14 pt-4">
              Update
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>:<div>
      <div className=" w-full h-screen bg-gray-100">
        <div className=" flex flex-col justify-center h-screen">
          <div className=" flex flex-row justify-center">
          <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
            <svg aria-hidden="true" role="status" className="inline w-3 h-11 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Publishing...
            </button>
          </div>
        </div>
      </div>
    </div>}
    </div>
  );
};

