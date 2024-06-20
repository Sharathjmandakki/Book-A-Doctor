import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const navgation = useNavigate();
  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:8080/allusers");
      setUsers(response.data);
    }
    getData();
  }, [])
  const deleteUser = async (u) => {
    if (u.role !== "Admin") {
      const response = await axios.delete(`http://localhost:8080/deleteUser/${u.uid}`)
      alert(response.data)
      window.location.href = "/Admin"
    } else {
      alert("You can't Delete")
    }
  }
  const Upgrade = (u) => {
    if (u.role !== "Admin") {
      navgation("upgrade", { state: u })
    } else {
      alert("You can't Update")
    }
  }
  const Search = async (e) => {
    e.preventDefault();
    if (name !== undefined || name !== null || name !== " ") {
      const response = await axios.get(`http://localhost:8080/serachUser/${name}`)
      if (response.data !== undefined && response.data.length !== 0) {
        setUsers(response.data)
      } else {
        window.location.reload();
      }
    }
  }
  return (
    <div className='m-5'>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className='p-5 text-red-50 font-bold text-5xl text-center'>
          Users
        </h2>
        <div class="p-4 flex flex-wrap justify-between">
          <Link to="addUser" className='text-red-50 hover:text-green-300 font-bold text-2xl'>
            Add User
          </Link>
          <>
            <label for="table-search" class="sr-only">Search</label>
            <form class="relative mt-1" onSubmit={Search}>
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for User" onChange={e => setName(e.target.value)} />
            </form>
          </>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                User id
              </th>
              <th scope="col" class="px-6 py-3">
                UserName
              </th>
              <th scope="col" class="px-6 py-3">
                Roal
              </th>
              <th scope="col" class="px-6 py-3">
                Update
              </th>
              <th scope="col" class="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {u.uid}
              </th>
              <td class="px-6 py-4">
                {u.username}
              </td>
              <td class="px-6 py-4">
                {u.role}
              </td>
              <td class="px-6 py-4">
                <button onClick={() => { Upgrade(u) }} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</button>
              </td>
              <td class="px-6 py-4">
                <Link onClick={() => deleteUser(u)} class="font-medium text-red-500 dark:text-red-400 hover:underline">Delete</Link>
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  )
}
