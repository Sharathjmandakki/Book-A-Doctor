import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function BookASlot() {
    const data = useLocation().state
    const username = window.localStorage.getItem("username")
    const navigate=useNavigate();
    const [doctor, setDoc] = useState(data.username)
    const [fev, setFev] = useState(false);
    const [date, setDate] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    useEffect(() => {
        async function data() {
            const response = await axios.get(`http://localhost:8080/isfev/${username}/doc/${doctor}`)
            setFev(response.data)
        }
        data()
    }, [])
    const likeIt = async(e) => {
        e.preventDefault();
        if(fev===false){
            const response = await axios.get(`http://localhost:8080/addfev/${username}/doc/${doctor}`)
            if(response.data==="Added"){
                alert(response.data)
            }
        }else{
            const response = await axios.get(`http://localhost:8080/removefev/${username}/doc/${doctor}`)
            if(response.data==="Removed"){
                alert(response.data)
            }
        }
        setFev(!fev)
    }
    const bookit =async (e) => {
        e.preventDefault()
        const response=await axios.post("http://localhost:8080/add/appointment",{
            users:username,
            doctor:doctor,
            time:date+" | "+from+" to "+to,
            spc:data.spc,
        });
        if(response.data===""){
        navigate(-1,{replace:true});
        alert(response.data)
        }
    }
    return (
        <div className='flex justify-center items-center m-5'>
            <div class="flex flex-col max-w-fit p-2 justify-center gap-10 items-center border rounded-lg shadow md:flex-row bg-gray-500 dark:border-gray-700 dark:bg-gray-800">
                <img draggable={false} class="max-w-sm m-2 rounded-lg" src={(data.img === true) ? `http://localhost:8080/users/${data.username}/image` : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'} alt={data.username} />
                <div className='flex flex-col max-w-sm justify-between p-4 leading-normal'>
                    <form className='flex justify-between' onSubmit={likeIt}>
                        <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Dr. {data.username}</h5>
                        <button type='submit'>
                            {(fev) ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="yellow">
                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.871 1.492 8.269L12 18.896l-7.428 4.55 1.492-8.269-6.064-5.871 8.332-1.151z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2">
                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.871 1.492 8.269L12 18.896l-7.428 4.55 1.492-8.269-6.064-5.871 8.332-1.151z" />
                                </svg>
                            }
                        </button>
                    </form>
                    <form onSubmit={bookit}>
                        <p class="mb-3 font-normal text-xl text-gray-700 dark:text-gray-400">{data.spc}</p>
                        <div className='flex justify-between'><span className='text-xl text-white'>Date : </span><input name="start" type="date" class="cursor-pointer mb-1 w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" onChange={e => setDate(e.target.value)} /></div>
                        <div className='flex justify-between'><span className='text-xl text-white'>Form : </span><input name="start" type="time" class="cursor-pointer mb-1 w-48  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" onChange={e => setFrom(e.target.value)} /></div>
                        <div className='flex justify-between'><span className='text-xl text-white'>To : </span><input name="end" type="time" class="cursor-pointer w-48 mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" onChange={e => setTo(e.target.value)} /></div>
                        <button type='submit' class="mt-3 mb-3 hover:border min-w-56 w-64 max-h-14 text-white bg-green-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-red-600 dark:focus:ring-red-700">Book a Slot</button>
                        <p class="flex gap-2 mb-3 font-normal text-gray-700 dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2">
                            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg> {data.loc}</p>
                        <p class="flex gap-2 mb-3 font-normal text-gray-700 dark:text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2">
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 10.5V7h-2v6h6v-2z" />
                        </svg>{data.avltime}</p>
                    </form>
                </div>

            </div>
        </div>
    )
}
