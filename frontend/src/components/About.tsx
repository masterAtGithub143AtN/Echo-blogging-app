import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../Config";

interface AboutProps {
  username: string;
}

const About = ({ username }: AboutProps) => {
  const [about, setAbout] = useState<string>("");
  const [isGetAbout, setIsGetAbout] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [aboutText, setAboutText] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BackendUrl}/user/${username}/about`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });

      setAbout(response.data);
      setIsGetAbout(false);
    })();
  }, [username]);

  const handleSave = async () => {
    try {
        if(aboutText.trim().length===0){
            setAbout("");
            alert('Please write something about yourself');
            return;
        }
      await axios.post(
        `${BackendUrl}/user/${username}/about/update`,
        { about: aboutText },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      setAbout(aboutText);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving about information", error);
    }
  };

  return (
    <div className="bg-stone-100 p-10">
      {isEditing ? (
        <div className="flex flex-col justify-center">
          <textarea
          placeholder="Write about yourself"
            className="w-full h-40 p-2 border border-blue-400 rounded-md"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
          />
          <div className=" w-full">
            <div className=" flex flex-row justify-center p-4">
            <button
            className="mt-2 p-3 bg-blue-500 text-white rounded-lg w-max "
            onClick={handleSave}
          >
            Save
          </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {about ? (
            <div>{about}</div>
          ) : (
            <div>
                {
                    isGetAbout===true?<></>:<div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-center text-lg font-semibold mt-2">Tell the world about yourself</div>
                    <div className="flex flex-row justify-center text-sm my-4">
                      Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.
                    </div>
                    <div className="flex flex-row justify-center">
                      <button
                        className="w-max bg-gray-200 p-5 rounded-xl text-lg"
                        onClick={() => setIsEditing(true)}
                      >
                        Write about yourself
                      </button>
                    </div>
                  </div>
                }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default About;
