import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AllMessages() {
  const [msg,setMsg]=useState([]);
  const [m,setM]=useState("");
  useEffect(()=>{
    async function data(){
      try{
        const response=await axios.get("http://localhost:8080/allmsg");
        setMsg(response.data);
      }catch{
        alert("somting went wrong")
      }
    }
    data()
  },[])

  const getMessage=async(e)=>{
    e.preventDefault();
     try{
      const response=await axios.post("http://localhost:8080/getmsg",{
        user:m,
      });
      if(response.data.length===0){
        alert("no result found")
      }
      else if(response.data!==undefined||response.data!==null){
        setMsg(response.data);
      }else if(m===undefined||m===null){
        window.location.reload();
      }
      }catch(e){
        window.location.reload();
      }
  }
  const deletemsg=async(m)=>{
    const response=await axios.post("http://localhost:8080/deletemsg",{
      mid:m.mid,
      user:m.user,
    })
    alert(response.data)
    if(response.data==="deleted"){
      window.location.href="/admin"
    }
  }
  return (
    <div className='m-5'>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="p-4 flex flex-wrap justify-between">
          <h2 className='text-red-50 font-bold text-2xl'>
            Messages
          </h2>
          <form onSubmit={getMessage}>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative mt-1">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Messages" value={m} onChange={e=>setM(e.target.value)} onSubmit={getMessage} />
            </div>
          </form>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Message Id
              </th>
              <th scope="col" class="px-6 py-3">
                UserName
              </th>
              <th scope="col" class="px-6 py-3">
                Subject
              </th>
              <th scope="col" class="px-6 py-3">
                Message
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              msg.map(m => (
                <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4">
                    {m.mid}
                  </td>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {m.user}
                  </th>
                  <td class="px-6 py-4">
                    {m.subject}
                  </td>
                  <td class="px-6 py-4">
                    {m.message}
                  </td>
                  <td class="px-6 py-4">
                    <button onClick={()=>deletemsg(m)} class="font-medium text-red-500 dark:text-red-400">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
