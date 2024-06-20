import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function UpdatePass() {
  const username = window.localStorage.getItem("username")
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [rpassword, SetRpassword] = useState("");
  const navigate = useNavigate();
  const update = async (e) => {
    e.preventDefault();
    try {
      if (password === rpassword) {
        var response;
        if (username === undefined || username === null || username===" ") {
          response = await axios.post("http://localhost:8080/updatepass", {
            username: email,
            password: password,
          })
        } else {
          response = await axios.post("http://localhost:8080/updatepass", {
            username: username,
            password: password,
          })
        }
        if (response.data === "Updated") {
          alert("🥳")
          navigate("/login", { replace: true })
        } else {
          document.getElementById("error").innerHTML = response.data
        }
      } else {
        document.getElementById("error").innerHTML = "Password Missmatch"
      }
    } catch {
      document.getElementById("error").innerHTML = "server error"
    }
  }
  return (
    <div className='flex items-center justify-center m-5'>
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" onSubmit={update}>
          <h5 class="text-2xl text-center font-medium text-gray-900 dark:text-white">Update Password | {username}</h5>
          <p id='error' className='text-red-400'></p>
          {(username === undefined || username === null) ? <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username </label>
            <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required value={email} onChange={e => SetEmail(e.target.value)} />
          </div> : <></>}
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={password} onChange={e => SetPassword(e.target.value)} />
          </div>
          <div>
            <label for="rpassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
            <input type="password" name="rpassword" id="rpassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={rpassword} onChange={e => SetRpassword(e.target.value)} />
          </div>

          <button type="submit" class="w-full border hover:border-red-500  text-white bg-gray-700 hover:bg-gary-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Update</button>
        </form>
      </div>
    </div>

  )
}
