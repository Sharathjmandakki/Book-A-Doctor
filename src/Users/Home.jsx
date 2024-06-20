import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
    const [doc, setDoc] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const username = window.localStorage.getItem("username")
    useEffect(() => {
        async function data() {
            if (username !== null) {
                try {
                    const response = await axios.get("http://localhost:8080/alldoc")
                    setDoc(response.data)
                } catch {
                    navigate('/login', { replace: true })
                }
            } else {
                navigate('/login', { replace: true })
            }
        }
        data()
    }, [])
    const Search = async (e) => {
        e.preventDefault();
        if (search === " " || search === "" || search === undefined || search === null) {
            window.location.reload();
        }
        try {
            const response = await axios.get(`http://localhost:8080/doc/${search}/spc`)
            setDoc(response.data)
        } catch (e) {
            setDoc(null);
        }
    }
    const bookit = async (d) => {
        navigate("/bookaslot", { state: d })
    }
    return (
        <>
            <div className='flex flex-wrap justify-between m-2 p-2'>
                <p className='text-xl text-white'>

                </p>
                <div class="pb-4">
                    <label for="table-search" class="sr-only">Search</label>
                    <form class="relative mt-1 -z-10" onSubmit={Search}>
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg min-w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Doc" value={search} onChange={e => setSearch(e.target.value)} />
                    </form>
                </div>
            </div>
            <div className='m-2 flex flex-wrap justify-center'>
                {(doc === null || doc.length === 0 || doc === undefined) ?
                    <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No result found</h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">Please reload the site and search for another name for doc</p>
                    </div> : <>
                        {
                            doc.map(d => (
                                <div class="flex flex-col m-2 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img draggable={false} class="w-52 h-60 m-2 rounded-sm" src={(d.img === true) ? `http://localhost:8080/users/${d.username}/image` : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'} alt={d.username} />
                                    <div class="flex flex-col justify-between p-4 leading-normal">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dr. {d.username}</h5>
                                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{d.spc}</p>
                                        <p class="flex gap-2 mb-3 font-normal text-gray-700 dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2">
                                            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                        </svg> {d.loc}</p>
                                        <p class="flex gap-2 mb-3 font-normal text-gray-700 dark:text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2">
                                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.5V7h-2v6h6v-2z" />
                                        </svg>{d.avltime}</p>
                                        <button onClick={() => bookit(d)} class="m-2 hover:border min-w-56 w-64 max-h-12 text-white bg-green-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-red-600 dark:focus:ring-red-700">Book a Slot</button>
                                    </div>
                                </div>

                            ))
                        }
                    </>
                }
            </div>
        </>
    )
}
