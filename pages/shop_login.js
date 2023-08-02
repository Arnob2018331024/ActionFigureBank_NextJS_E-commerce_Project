import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { Toaster,toast } from "react-hot-toast"

export default function App({ Component, pageProps }) {
    const [message,setMessage]=useState({})
    let route=useRouter()
    const Submit=(e=>{
        e.preventDefault()
        let password=e.target.password.value
        let email=e.target.email.value
        axios.post("/api/shop_login",{email,password}).then(res=>{
            let user=res.data
            if(user.type==="buyer"){
                localStorage.setItem("shop_user",JSON.stringify(user))
                route.push("/shop")
            }
            else if(user.type==="seller")
            {
                localStorage.setItem("shop_user",JSON.stringify(user))
                route.push("/seller_dashboard")
            }
            else{
                //showMessage({head:"Sorry! ",body:"Incorrect email password"})
                toast.error("Incorrect email password!")
            }

        }).catch(e=>{
            toast.error("Incorrect email password!")
            //showMessage({head:"Sorry! ",body:"Incorrect email password"})
            
        })    
    })


    let showMessage=(message)=>{
        setMessage(message)
        let alert=document.querySelector("#message")
        alert.classList.add("px-2")
        alert.classList.add("py-2")
        setTimeout(()=>{
        setMessage({})
        alert.classList.remove("px-2")
        alert.classList.remove("py-2")
        },2000)
    }


    return(
        <div>
        <div class="header">
            <h1 class="text-3xl font-semibold text-center">Login Page</h1>
        </div>

        <div class="content">
            
            <div class="bg-white p-8 rounded shadow-lg login-form">
            <h2 class="text-2xl font-semibold mb-6">Login</h2>
            <form id="loginForm" class="space-y-6" onSubmit={Submit}>
                <div>
                <label for="email" class="block font-medium text-lg">Email</label>
                <input type="email" id="email" name="email" class="form-input mt-2 block w-full px-4 py-3 text-lg rounded rounded border border-gray-300" placeholder="Your email" required/>
                <p id="emailError" class="form-error"></p>
                </div>
                <div>
                <label for="password" class="block font-medium text-lg">Password</label>
                <input type="password" id="password" name="password" class="form-input mt-2 block w-full px-4 py-3 text-lg rounded border border-gray-300" placeholder="Your password" required/>
                <p id="passwordError" class="form-error"></p>
                </div>
                <div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-lg rounded">Login</button>
                
                    <a href="/shop_register" class="text-gray-400 hover:text-green-600 pl-32	">Register</a>
                </div>
            </form>
            </div>
        <img src="zoro.jpeg" alt="Vector Zoro - One Piece Zoro Chibi@seekpng.com" class="zoro-image"/>
            
        </div>
        <div class="bg-blue-200 border border-blue-400 text-blue-700  rounded fixed bottom-0 left-0 " id="message" role="alert">
                <strong class="font-bold">{message.head} </strong>
                <span class="block sm:inline">{message.body}</span>
        </div>
        <Toaster
			position="top-center"
			reverseOrder={false}
			/>

        <div class="footer">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>

        </div>
    )
}