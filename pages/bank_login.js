import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Toaster,toast } from "react-hot-toast"


export default function Login() {
    const [errorMessage,setErrorMessage]=useState("");
    let router=useRouter();
  return (
    <div class="bg-gray-100 pb-8">
      <div id="alert" class="alert">
            {errorMessage}
        </div>
    <div class="flex items-center justify-center h-screen  p-32">
      <div class="w-1/3 bg-white rounded-lg shadow-lg p-8 ">

        <img class="mx-auto mb-4 " src="bank.avif" alt="Bank Logo"/>
        <h1 class="text-3xl font-bold mb-4">Login</h1>
        <div >
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" required/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" required/>
          </div>
          <div class="flex items-center justify-between">
            <button onClick={showErrorMessage} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
          </div>
        </div>
        
      </div>
    </div>

    <Toaster
			position="top-center"
			reverseOrder={false}
			/>
  </div>
    )

    function showErrorMessage() {
      let email=document.getElementById("email").value
      let password=document.getElementById("password").value
      
      axios.post("api/bank_login",{email,password}).then(res=>{
        let user=res.data
        console.log(user)
        if(user.error)
        {
          const alertElement = document.getElementById("alert");
          //alertElement.style.display = "block";
          toast.error("Wrong email or password!")
          setErrorMessage(user.error)
        }
        else
        {
          localStorage.setItem("user",JSON.stringify(user))
          if(user.type=="admin")
            router.push("/admin_dashboard")
          else
            router.push("/bank_user")
        }
      })
      }
}

