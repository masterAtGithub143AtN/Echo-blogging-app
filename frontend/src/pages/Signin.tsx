
import axios from 'axios'
import { InputBox } from '../components/InputBox'
import {  useState } from 'react'
import { useNavigate} from 'react-router-dom'

import { Heading } from '../components/Heading'
import { signinInput } from '@saket_12/medium-common'
import { jwtDecode } from 'jwt-decode'

export const Signin = () => {
    
    const navigate=useNavigate();
    const [input, setInput] =useState({
        username: '',
        password: ''
    })
    const sendRequest=async ()=>{
        try {
            const {success}=signinInput.safeParse(input);
            if(!success){
                alert("Invalid input");
                return;
            }
            console.log(success);
            const response=await axios.post("http://127.0.0.1:8787/api/v1/user/signin",input);
            localStorage.setItem("token",response.data.token);
            const userData=jwtDecode(response.data.token);
            // const userData={username: "saket_12"};
            navigate(`/blog/${input.username}`,{state:userData});
        } catch (error) {
            console.log(error);
            alert("Invalid username or password");
        }
    }
  return (
    <div className='flex flex-col h-screen justify-center bg-stone-300 bg-hero-pattern'>
           <div className=' flex justify-center'>
           <div className=' w-2/3 flex flex-col justify-center rounded-md p-5 bg-blue-300 md:w-1/2 lg:w-1/3'>

                    <div className=''>
                        <InputBox type="text" placeholder="username_12" message="UserName *" onchange={(e)=>{
                            setInput({...input,username:e.target.value})
                        }} />
                    </div>
                    <div className=''>
                        <InputBox type="password" placeholder="Enter your password" message="Password *" onchange={(e)=>{
                            setInput({...input,password:e.target.value})
                        }}/>
                    </div>
                    <div className=' pt-5'>
                        <button className="bg-blue-500 text-white p-2 rounded-md w-full" onClick={sendRequest}>Signin</button>
                    </div>
                    <div className=' flex justify-center pt-5 text-red-200 '>
                        <Heading message="Don't have an account ?" functionality="Signup"/>
                    </div>
            </div>
           </div>
    </div>
  )
}