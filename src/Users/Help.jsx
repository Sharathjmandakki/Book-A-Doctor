import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Help() {
  const username=window.localStorage.getItem("username")
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const navigate=useNavigate();
  const sedMessage = async (e) => {
    e.preventDefault();
    if(username===null){
      navigate('/login',{replace:true})
    }
    try{
      const response=await axios.post("http://localhost:8080/addmsg",{
        user:username,
        message:message,
        subject:subject
      })
      if(response.data==="Sent"){
        alert(response.data)
        setMessage("")
        setSubject("")
      }else{
        document.getElementById("error").innerHTML=response.data;
      }
    }catch{
      document.getElementById("error").innerHTML="Server Error / check your internet";
    }
  }
  return (
    <div className='flex flex-wrap justify-center m-5 mt-20 mb-20 p-2' style={{ minWidth: "250px" }}>
      <div style={{ minWidth: "250px" }} class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" onSubmit={sedMessage}>
          <h5 class="text-xl font-medium overflow-clip text-gray-900 dark:text-white">Send a massage</h5>
          <h4 id='error' className='text-red-400'></h4>
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white cursor-not-allowed" placeholder="username" disabled required value={username} />
          </div>
          <div>
            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
            <input type="text" name="subject" id="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="subject" required value={subject} onChange={e => { setSubject(e.target.value) }} />
          </div>
          <div>
            <label for="msg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
            <textarea type="text" name="msg" id="msg" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="message" required value={message} onChange={e => { setMessage(e.target.value) }}></textarea>
          </div>
          <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
        </form>
      </div>
    </div>
  )
}