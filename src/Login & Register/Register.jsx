import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [mobile, SetMobile] = useState("");
  const [password, SetPassword] = useState("");
  const [rpassword, SetRpassword] = useState("");
  const [role, SetRole] = useState("User");
  const [loc,setLoc]=useState("");
  const navigate=useNavigate();
  const register = async (e) => {
    e.preventDefault();
    try {
      if (password === rpassword) {
        const response = await axios.post("http://localhost:8080/register", {
          username: username,
          password: password,
          mobileNo: mobile,
          email: email,
          role: role,
          loc:loc,
        })
        if (response.data === "Success") {
          alert("🥳")
          navigate("/login",{replace:true})
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
    <div className='flex items-center justify-center m-5 p-5'>
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" onSubmit={register}>
          <h5 class="text-2xl text-center font-medium text-gray-900 dark:text-white">Register to Book a Doc</h5>
          <p id='error' className='text-red-400'></p>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required value={email} onChange={e => SetEmail(e.target.value)} />
          </div>
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
            <input type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" required value={username} onChange={e => SetUsername(e.target.value)} />
          </div>
          <div>
            <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile number</label>
            <input type="mobile" name="mobile" id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="0000000000" required value={mobile} onChange={e => SetMobile(e.target.value)} />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Role</label>
            <ul class="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input type="radio" id="hosting-small" name="role" value="User" class="hidden peer" required onChange={e => SetRole("User")} />
                <label for="hosting-small" class="text-center inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-100 dark:peer-checked:bg:blue-100 peer-checked:border-blue-100 peer-checked:text-gray-100 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  User 👤
                </label>
              </li>
              <li>
                <input type="radio" id="hosting-big" name="role" value="Doctor" class="hidden peer" onChange={e => SetRole("Doctor")} />
                <label for="hosting-big" class="text-center inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-100 dark:peer-checked:bg:blue-100 peer-checked:border-blue-100 peer-checked:text-gray-100 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700" >
                  Doctor 🩺
                </label>
              </li>
            </ul>

          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={password} onChange={e => SetPassword(e.target.value)} />
          </div>
          <div>
            <label for="rpassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
            <input type="password" name="rpassword" id="rpassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={rpassword} onChange={e => SetRpassword(e.target.value)} />
          </div>
          <div>
            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Address</label>
            <textarea name="address" id="address" placeholder="neer main road" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={loc} onChange={e => setLoc(e.target.value)} maxLength={100}/>
          </div>
          <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
        </form>
      </div>
    </div>

  )
}
