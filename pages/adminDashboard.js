import axios from "axios";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
    const [users,setUsers]=useState([])
    const [errorMessage,setErrorMessage]=useState("");
    useEffect(()=>{
        setUsers([])
    },[])

    let createUser=(e)=>{
        e.preventDefault();
        let email=e.target.email.value
        let name=e.target.name.value
        let password=e.target.password.value
        let user={email,name,password}
        let i=0
        for(i=0;i<users.length;i++)
          if(user.email===users[i].email)
            break
        if(i!=users.length)
          {
            showErrorMessage()
            return
          }
        hideErrorMessage()
        axios.post('/api/bank_user',{user}).then(res=>{
            let newusers=[]
            users.forEach(user=>{
              newusers.push(user)
            })
            newusers.push(res.data)
            setUsers(newusers)
            console.log(users)
        })
    }

    let deleteUser=(user)=>{
      
      axios.delete('/api/bank_user?email='+user.email).then(res=>{
        let email=res.body.email
        console.log(email)
      })
    }

    let hideErrorMessage=()=>{
      const alertElement = document.getElementById("alert");
          alertElement.style.display = "none";
          setErrorMessage("Email address already in use!")
    }
    let showErrorMessage=()=>{
      const alertElement = document.getElementById("alert");
          alertElement.style.display = "block";
          setErrorMessage("Email address already in use!")
    }
    return(
    <div>
        <div class="flex h-screen">
    
    <div class="bg-gray-900 text-white w-1/4 flex flex-col justify-between">
      <div>
        <h1 class="text-2xl font-bold p-4">Admin Dashboard</h1>
        <form class="p-4" onSubmit={createUser}>
          <h2 class="text-lg font-bold mb-4">Create User</h2>
          <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="name">Name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter name" required/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="email">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email" required/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="password">Password</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter password" required/>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create</button>
          </div>
          <div id="alert" class="alert mt-4">
            {errorMessage}
        </div>
        </form>
      </div>
      
      <form class="p-4" action="logout.php" method="post">
       <a class="sidebar-link " type="submit" href="">Transactions</a>
        <a class="sidebar-link p-4 font-bold mb-4" type="submit" href="">Logout</a>
      </form>
      
    </div>

   
    <div class="bg-gray-100 flex-grow p-4">
      <h2 class="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-bold mb-4">Users</h3>
        <table class="table">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Name</th>
              <th class="py-2 px-4 border-b">Email</th>
              <th class="py-2 px-4 border-b">Password</th>
              <th class="py-2 px-4 border-b">Account Balance (taka)</th>
              <th class="py-2 px-4 border-b">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {
                users.map((user)=>(<tr>
                    <td class="border-b"><input class="py-2 px-2" placeholder={user.name} /></td>
                    <td class="border-b"><input class="py-2 px-2" placeholder={user.email} /></td>
                    <td class="border-b"><input class="py-2 px-2" placeholder={user.password} /></td>
                    <td class="border-b"><input class="py-2 px-2" placeholder={user.balance} value={user.balance}/></td>
                    <td class="py-2 px-4 border-b">
                      <button class="update-btn hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Update</button>
                      <button class="delete-btn hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={e=>{deleteUser(user)}}>Delete</button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
</div>
    )
}