import React, { useEffect, useState } from 'react'
import Display from './Display'
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function About() {
    const username = window.localStorage.getItem("username")
    const role=window.localStorage.getItem("role")
    const [user, setUser] = useState([]);
    const navgate = useNavigate();
    useEffect(() => {
        async function data() {
            const response = await axios.get(`http://localhost:8080/serachUser/${username}`);
            setUser(response.data[0])
        }
        data();
    }, [])
    const sinout=()=>{
        window.localStorage.clear();
        navgate("/login", { replace: true });
    }
    const updateInfo=()=>{
        navgate("update",{state:{email:user.email,mobileNo:user.mobileNo,spc:user.spc}})
    }
    return (
        <span className='min-w-fit '>
            <div className='m-4 flex justify-center ' >
                <div className='flex gap-5 flex-wrap justify-center w-full max-w-fit p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
                    <div className='align-middle text-center'>
                        <img draggable={false} class="w-52 h-52  rounded-full" src={(user.img === true) ? `http://localhost:8080/users/${username}/image` : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'} alt={username} />
                        <h1 className='text-4xl font-semibold text-white'>{(user.role==="Doctor")?"Dr. "+username:username}</h1>
                        <p className='text-white'>{user.email} | {user.mobileNo}</p>
                    </div>
                    <div className='gap-2 flex flex-wrap max-w-60'>
                        <Link to="editimg" class="m-2 min-w-56 w-64 max-h-12 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit Image</Link>
                        {(role==="Admin")?<></>:<button type="submit" onClick={updateInfo} class="m-2 min-w-56 w-64 max-h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Info</button>
                        }
                        <Link to="updatepass" class="m-2 hover:border min-w-56 w-64 max-h-12 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gary-700 dark:focus:ring-gray-800">Update Password</Link>
                        <button type='submit' onClick={sinout} class="m-2 min-w-56 w-64 max-h-12 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Logout</button>
                    </div>
                </div>
            </div>
            <Outlet />
        </span>
    )
}
