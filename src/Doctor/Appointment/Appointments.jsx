import axios from 'axios';
import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Appointments() {
  const username = window.localStorage.getItem("username")
  const [opt, setOpts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useState(() => {
    async function data() {
      if (username !== null) {
        const response = await axios.get(`http://localhost:8080/appointment/${username}`)
        setOpts(response.data)
      } else {
        navigate('/login', { replace: true })
      }
    }
    data();
  }, [])
  // const doneAppointment = async (u) => {
  //   const response = await axios.get(`http://localhost:8080/visit/appointment/${u.id}/spc/${spc}/tab/${tab}`)
  //   alert(response.data)
  //   navigate("/Admin")
  // }
  const visited = async (u) => {
    navigate("save", { state: u })
  }
  const Search = async (e) => {
    e.preventDefault();
    if (search !== undefined || search !== null || search !== " ") {
      const response = await axios.get(`http://localhost:8080/search/appointments/${search}`)
      if (response.data !== undefined && response.data.length !== 0) {
        setOpts(response.data)
      } else {
        window.location.reload();
      }
    }
  }
  return (
    <>
      {/* <div className='flex flex-wrap justify-between mt-2 ml-2 mr-2 p-2'>
        <p className='text-xl text-white'>

        </p>
        <div class="pb-4">
          <label for="table-search" class="sr-only">Search</label>
          <form class="relative mt-1" onSubmit={Search}>
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg min-w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Doc" value={search} onChange={e => setSearch(e.target.value)} />
          </form>
        </div>
      </div> */}
      <div class=" relative flex justify-center overflow-x-auto shadow-md sm:rounded-lg mb-5 p-5">
        {(opt === null || opt.length === 0 || opt === undefined) ?
          <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No result found</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Please reload the site or book Opp</p>
          </div> : <table class=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  User Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Slot at
                </th>
                <th scope="col" class="px-6 py-3">
                  Mobile Number
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {opt.map((u) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src={`http://localhost:8080/users/${u.users}/image`} alt={u.users} />
                    <div class="ps-3">
                      <div class="text-base font-semibold">{u.users}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      {u.time}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    {u.mobile}
                  </td>
                  <td class=" px-6 py-4">
                    {/* <button onClick={() => { doneAppointment(u) }} class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline-offset-1">Visited</button> */}
                    <button onClick={() => { visited(u) }} class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline-offset-1">Visited</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
      <div id='appo' class="appo">
        <Outlet />
      </div>
    </>
  )
}
