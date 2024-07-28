import { useState, useEffect } from "react";
import { InputBox } from "../components/InputBox";
import { SignupInput } from "@saket_12/medium-common";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { jwtDecode } from "jwt-decode";
import { decodedTokenType } from "./PublicProfile";
import { BackendUrl } from "../Config";

export const EditProfile = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    if (!token) {
        // Redirect to signin if token is not present
        return <>
      <div>
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
      </>
    }
    const userData:decodedTokenType=jwtDecode(token);
    const { username } = useParams<{ username: string }>(); // Ensure `username` is a string
    const [input, setInput] = useState<SignupInput>({
        username: "",
        name: "",
        password: "12345678",
        email: "",
        collegename: "",
        course: "",
        semester: "",
        passingyear: "",
        branch: "",
    });

    useEffect(() => {
        if (username) {
            // Fetch user details when component mounts
            async function fetchUserDetails() {
                try {
                    const response = await axios.get(`${BackendUrl}/user/details/${username}`,{
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`,
                        },
                    });
                    setInput(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchUserDetails();
        }
    }, [username]);

    async function senRequest() {
        try {
            // Filter out the password field for validation
            const { password, ...filteredInput } = input;

            // const { success } = signupInput.safeParse(filteredInput);
            // if (!success) {
            //     alert("Invalid input");
            //     return;
            // }
            const response = await axios.post(`${BackendUrl}/user/${username}/update`, filteredInput, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                console.log("User updated successfully");
                navigate(`/blog/${input.username}`, { state: input });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="">
            <div>
                <AppBar userData={userData} imageUrl="" public={false}></AppBar>
            </div>
            <div className="flex  justify-center mt-7">
                <div className="flex flex-col justify-center">
                    <div className=" flex flex-row">
                        <div className=" pr-5">
                        <div>
                        <InputBox
                            type="text"
                            placeholder="username_12"
                            message="UserName *"
                            value={input.username}
                            onchange={(e) => setInput({ ...input, username: e.target.value })}
                            disabled={!!username} // Disable if editing existing user
                        />
                    </div>
                    <div>
                        <InputBox
                            type="email"
                            placeholder="Enter your email"
                            message="Email *"
                            value={input.email}
                            onchange={(e) => setInput({ ...input, email: e.target.value })}
                            disabled={!!username} // Disable if editing existing user
                        />
                    </div>
                    <div>
                        <InputBox
                            type="text"
                            placeholder="Saket Suman"
                            message="Full Name"
                            value={input.name}
                            onchange={(e) => setInput({ ...input, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <InputBox
                            type="text"
                            placeholder="IIT Bhubaneswar"
                            message="College"
                            value={input.collegename}
                            onchange={(e) => setInput({ ...input, collegename: e.target.value })}
                        />
                    </div>
                        </div>
                        <div className=" pl-5">
                        <div>
                        <InputBox
                            type="text"
                            placeholder="B.tech"
                            message="Course"
                            value={input.course}
                            onchange={(e) => setInput({ ...input, course: e.target.value })}
                        />
                    </div>
                    <div>
                        <InputBox
                            type="text"
                            placeholder="CIVIL"
                            message="Branch"
                            value={input.branch}
                            onchange={(e) => setInput({ ...input, branch: e.target.value })}
                        />
                    </div>
                    <div>
                        <InputBox
                            type="number"
                            placeholder="7"
                            message="Semester"
                            value={input.semester}
                            onchange={(e) => setInput({ ...input, semester: e.target.value })}
                        />
                    </div>
                    <div>
                        <InputBox
                            type="text"
                            placeholder="2025"
                            message="Passing Year"
                            value={input.passingyear}
                            onchange={(e) => setInput({ ...input, passingyear: e.target.value })}
                        />
                    </div>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="about" className=" text-xl font-semibold">About</label>
                    <textarea
                     id="about"
                        placeholder="Write about yourself"
                            className="w-full h-24 p-2 border border-blue-400 rounded-md"
                            value={input.about}
                            onChange={(e) => setInput({ ...input, about: e.target.value })}
                        />
                    </div>
                    <div className=" flex justify-center">
                    <div className="flex justify-center p-3">
                        <button
                            onClick={senRequest}
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            {username ? "Update" : "Sign Up"}
                        </button>
                    </div>
                    <div className=" flex flex-row justify-center pl-3 h-min">
                       <div className=" flex justify-center bg-blue-500 p-3 mt-1  rounded-full">
                            <Link to={`/blog/${userData.username}`} state={userData} >
                                 <div>Go To Home</div>
                            </Link>
                       </div>
                    </div>
                    </div>
                <div>
                </div>
                </div>
            </div>
        </div>
    );
};
