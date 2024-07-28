import { useState } from "react";
import AutoResizingTextarea from "../components/Pragraph";
import { blogCreateInput } from "@saket_12/medium-common";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BackendUrl } from "../Config";

export const BlogWriting = () => {
    const location=useLocation();
    const userData=location.state;
  const navigate = useNavigate();
  
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleRequest = async () => {
    console.log("Request Sent");
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
      const response = await axios.post(
        `${BackendUrl}/blog/create`,
        { title, content },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log("Blog created successfully");
      if(response){
        alert('msg: Blog created successfully');

      // Reset the input fields
      setTitle("");
      setContent("");
      }
    } catch (error: any) {
        setTitle("");
        setContent("");
      if (error.response.status === 501) {
        navigate("/signin");
      } else {
        console.error(error);
        alert('Error creating blog');
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

  return (
    <div>
        <div>
            <AppBar userData={userData} imageUrl="/image/saket" public={false} fromwhere="Blogwriting"></AppBar>
        </div>
      <div className="flex justify-center">
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
          <div className="flex justify-center">
            <button onClick={handleRequest} className="flex justify-center bg-blue-500 text-white p-2 rounded-lg">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogWriting;
