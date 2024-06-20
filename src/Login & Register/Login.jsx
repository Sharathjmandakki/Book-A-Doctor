import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navgate=useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      })
      if (response.data[0] === "Error") {
        document.getElementById("error").innerHTML = response.data[1]
      } else {
        window.localStorage.setItem("username",response.data[0])
        window.localStorage.setItem("role",response.data[1])
        if(response.data[1]==="User"){
          navgate("/",{replace:true})
        }else{
            navgate("/"+response.data[1],{replace:true})
          }
      }
    } catch {
      document.getElementById("error").innerHTML = "server error"
    }
  }
  return (
    <div className='flex items-center justify-center h-screen '>
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" onSubmit={login}>
          <h5 class="text-2xl text-center font-medium text-gray-900 dark:text-white">Login to Book a Doc</h5>
          <p id='error' className='text-red-400'></p>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email / username / mobile no</label>
            <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required value={email} onChange={e => SetEmail(e.target.value)} />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={password} onChange={e => SetPassword(e.target.value)} />
          </div>

          <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          <div class="flex justify-between flex-wrap">
            <Link to="/updatepass" class="text-blue-700 hover:underline dark:text-blue-500 hover:text-red-100">Lost Password?</Link>
            <Link to="/register" class="text-blue-700 hover:underline dark:text-blue-500 hover:text-red-100">Create account</Link>
          </div>
        </form>
      </div>
    </div>

  )
}
