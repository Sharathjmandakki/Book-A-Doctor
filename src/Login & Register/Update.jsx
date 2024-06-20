import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Update() {
  const data = useLocation().state;
  const username = window.localStorage.getItem("username");
  const as = window.localStorage.getItem("role");
  const [email, SetEmail] = useState(data?.email);
  const [mobile, SetMobile] = useState(data?.mobileNo);
  const [role, SetRole] = useState(data?.role);
  const [spc, SetSpc] = useState(data?.spc);
  const [date, setDate] = useState(data?.avltime);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();
  const update = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/updateuser", {
        username: username,
        mobileNo: mobile,
        email: email,
        role: role,
        spc: spc,
        avltime: date + " | " + from + " to " + to,
      })
      if (response.data === "Updated") {
        alert("🥳")
        navigate("/login", { replace: true })
      } else {
        document.getElementById("error").innerHTML = response.data
        if (response.data === "Updated") {
          navigate("/login", { replace: true })
        }
      }
    } catch {
      document.getElementById("error").innerHTML = "server error"
    }
  }
  return (
    <div className='flex items-center justify-center m-5'>
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" onSubmit={update}>
          <h5 class="text-2xl text-center font-medium text-gray-900 dark:text-white">Update Info | {username}</h5>
          <p id='error' className='text-red-400'></p>
          {(as !== "Admin") ? <><div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" value={email} onChange={e => SetEmail(e.target.value)} />
          </div>
            <div>
              <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile number</label>
              <input type="mobile" name="mobile" id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="0000000000" value={mobile} onChange={e => SetMobile(e.target.value)} />
            </div>
          </> : <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" disabled name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="0000000000" value={data.username} />
          </div>
          }
          {(as === "Admin") ? <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Role</label>
            <ul class="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input type="radio" id="hosting-small" name="role" value="User" class="hidden peer" onChange={e => SetRole("User")} />
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
          </div> : <></>}
          {(as === "Doctor") ? <>
            <div>
              <label for="day" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Availability</label>
              <input type="text" name="day" id="day" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Everyday from / monday to saturday from" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className='flex justify-between'><span className='text-xl text-white'>Form : </span><input name="start" type="time" class="cursor-pointer mb-1 w-48  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" onChange={e => setFrom(e.target.value)} /></div>
            <div className='flex justify-between'><span className='text-xl text-white'>To : </span><input name="end" type="time" class="cursor-pointer w-48 mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" onChange={e => setTo(e.target.value)} /></div>
            <div>
              <label for="spc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Specialization</label>
              <textarea name="spc" id="spc" placeholder="Dentist" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={spc} onChange={e => SetSpc(e.target.value)} maxLength={100} />
            </div>
          </> : <></>}
          <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
        </form>
      </div>
    </div>

  )
}
