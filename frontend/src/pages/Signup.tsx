
import { useState } from "react"
import { InputBox } from "../components/InputBox"
import { Qoute } from "../components/Quote"
import { SignupInput,signupInput } from "@saket_12/medium-common"
import { Heading } from "../components/Heading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BackendUrl } from "../Config"


export const Signup = () => {
    const navigate=useNavigate();
    const [input, setInput] = useState<SignupInput>({
        username: "",
        name: "",
        password: "",
        email: "",
        collegename: "",
        course: "",
        semester: "",
        passingyear: "",
        branch: "",
    })

    async function senRequest(){
        console.log(signupInput);
        try {
            const {success}=signupInput.safeParse(input);
            if(!success){
                alert("Invalid input");
                return;
            }
            const response = await axios.post(`${BackendUrl}/user/signup`,input);
            localStorage.setItem("token",response.data.token);
            console.log("User created successfully");
            navigate(`/blog/${input.username}`,{state:input});
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
        <div className=" grid grid-cols-2">
           <div className="flex justify-center">
            
               <div className=" flex flex-col justify-center">
                   
                    <div className=" flex justify-center shadow-md bg-slate-400 rounded-md">
                    <div className=" flex flex-col justify-center w-max h-max m-4">
                    <div>
                        <InputBox type="text" placeholder="username_12" message="UserName *" onchange={(e)=>{
                            setInput({...input,username:e.target.value})
                        }}/>
                    </div>
                    <div>
                    <InputBox type="password" placeholder="Enter your password" message="Password *" onchange={(e)=>{
                        setInput({...input,password:e.target.value})
                    }}/> 
                </div>
                    <div>
                        <InputBox type="email" placeholder="Enter your email" message="Email *" onchange={(e)=>{
                            setInput({...input,email:e.target.value})
                        }} />
                    </div>
                <div>
                      <InputBox type="text" placeholder="Saket Suman" message="Full Name" onchange={(e)=>{
                        setInput({...input,name:e.target.value})
                     }}></InputBox>
                </div>
                <div>
                    <InputBox type="text" placeholder="IIT Bhubaneswar" message="College" onchange={(e)=>{
                        setInput({...input,collegename:e.target.value})
                    }}></InputBox>
                </div>
                {/* <div>
                    <InputBox type="text" placeholder="B.tech" message="Course" onchange={(e)=>{
                        setInput({...input,course:e.target.value})
                    }}></InputBox>
                </div>
                <div>
                    <InputBox type="text" placeholder="CIVIL" message="Branch" onchange={(e)=>{
                        setInput({...input,branch:e.target.value})
                    }}></InputBox>
                </div> */}
                {/* <div>
                    <InputBox type="number" placeholder="7" message="Semester" onchange={(e)=>{
                        setInput({...input,semester:e.target.value})
                    }}></InputBox>
                </div>
                <div>
                    <InputBox type="text" placeholder="2025" message="Passing Year" onchange={(e)=>{
                        setInput({...input,passingyear:e.target.value})
                    }}></InputBox>
                </div> */}
                <div className=" flex justify-center pt-3">

                <button onClick={senRequest} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Signup</button>

                </div>
          
                <div className=" flex justify-center p-3 bg-slate-50 rounded-md">
                    <Heading message="Already have an account ?" functionality="signin"></Heading>
                </div>
                    </div>
                    </div>
                </div>
           </div>
            <div>
                <Qoute />
            </div>
        </div>
    )
}








// import { Qoute } from "../components/Quote"
// import { Auth, GoogleSignButton } from "../components/SignInUp"

// export const Signup = () => {
//   return <div>
//     <div className="grid grid-cols-1 md:grid-cols-2 ">
//       <div className="flex justify-center">
//         <Auth type="signup" />
//         <GoogleSignButton></GoogleSignButton>
//       </div>
//       <div className="hidden md:block">
//         <Qoute />
//       </div>
//     </div>
//   </div>
// }