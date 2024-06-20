import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NumData from './NumData';

export default function AdminHome() {
  const username=window.localStorage.getItem("username")
  const [num,setNum]=useState([]);
  useEffect(()=>{
    async function data(){
      const response=await axios.get("http://localhost:8080/admin/numdata")
      setNum(response.data)
    }
    data();
  },[])
  return (
    <div className='m-5'>
      <div className='mb-5 flex flex-wrap justify-between'>
        <NumData txt="Number Of Users" no={num.total}/>
        <NumData txt="Number Of Docs" no={num.docs}/>
        <NumData txt="Number Of Users" no={num.users}/>
        <NumData txt="Number Of Admins" no={num.admins}/>
        <NumData txt="Number Of Messages" no={num.msgs}/>
      </div>
      <hr/>
      <h2 className='mt-2 mb-2 text-white text-ellipsis text-4xl text-center font-semibold italic'>All Admin names</h2>
      <div className='mt-3 mb-5 flex flex-wrap justify-center'>  
        {
          num?.admNames?.map((name)=>(
            (name==username)?<div class="min-h-12 w-fit m-2 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-700 dark:text-green-400 text-xl font-semibold uppercase">{name} *</div>
          :<div class="min-h-12 w-fit m-2 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">{name}</div>
          ))
        }
      </div>
    </div>
  )
}

