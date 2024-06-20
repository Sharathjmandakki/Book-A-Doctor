import React, { useEffect, useState } from 'react'
import UpdateImage from '../Login & Register/UpdateImage';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Admin() {
  const navigate = useNavigate();
  const username = window.localStorage.getItem("username")
  const [tab, setTab] = useState(true)
  const [pg, setPg] = useState(0);
  const [drop, setDrop] = useState(true);
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function data() {
      if (username !== null || username !== undefined || username !== "") {
        try {
          const response = await axios.get(`http://localhost:8080/serachUser/${username}`);
          setUser(response.data[0])
        } catch {
          navigate('/login', { replace: true })
        }
      } else {
        navigate('/login', { replace: true })
      }
    }
    data();
  }, [])
  const sinout = () => {
    window.localStorage.clear();
    navigate("/login", { replace: true });
  }
  return (
    <div className='min-w-72'>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/Admin" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Book A Doc 🩺 | 👨‍🎓</span>
          </Link>
          <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button onClick={() => { setDrop(!drop) }} type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <span class="sr-only">Open user menu</span>
              <img draggable={false} class="w-8 h-8 rounded-full" src={(user?.img === true) ? `http://localhost:8080/users/${username}/image` : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'} alt={username} />
            </button>
            <div class="z-20 origin-top-right absolute right-0 mt-56 mr-5 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
              {(drop) ? <></> : <><div class="px-4 py-3 ">
                <span class="block text-sm text-gray-900 dark:text-white">{user.username}</span>
                <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
              </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link to={username} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{username}</Link>
                  </li>
                  <li>
                    <Link to="/updatepass" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Update Password</Link>
                  </li>
                  <li>
                    <button onClick={sinout} class="text-left block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                  </li>
                </ul></>}
            </div>
            <button onClick={() => { setTab(!tab) }} data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div class={(tab) ? "items-center justify-between hidden w-full md:flex md:w-auto md:order-1" : "items-center justify-between w-full md:flex md:w-auto md:order-1"} id="navbar-user">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/Admin" onClick={() => { setPg(0) }} class={(pg === 0) ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"} aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="allusers" onClick={() => { setPg(1) }} class={(pg === 1) ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Users</Link>
              </li>
              <li>
                <Link to="allmessage" onClick={() => { setPg(2) }} class={(pg === 2) ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Message</Link>
              </li>
              {/* <li>
                <Link to="allappointment" onClick={() => { setPg(4) }} class={(pg === 4) ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>All Appointments</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  )
}
