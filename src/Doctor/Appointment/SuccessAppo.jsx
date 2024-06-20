import React, { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuccessAppo() {
    const data=useLocation().state;
    const username = data.users; 
    const id = data.id;
    const [tab, setTab] = useState("");
    const [spc, setSpc] = useState("");
    const navigate = useNavigate();
    const doneAppointment = async (u) => {
    const response = await axios.get(`http://localhost:8080/visit/appointment/${id}/spc/${spc}/tab/${tab}`)
    alert(response.data)
    navigate("/Doctor")
  }
    return (
        <div className='flex flex-wrap justify-center m-5 mt-20 mb-20 p-2' style={{ minWidth: "250px" }}>
            <div style={{ minWidth: "250px" }} class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="space-y-6">
                    <h5 class="text-xl font-medium overflow-clip text-gray-900 dark:text-white">Send a massage</h5>
                    <h4 id='error' className='text-red-400'></h4>
                    <div>
                        <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient Id</label>
                        <input type="text" name="id" id="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white cursor-not-allowed" placeholder="id" disabled required value={id} />
                    </div>
                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white cursor-not-allowed" placeholder="username" disabled required value={username} />
                    </div>
                    <div>
                        <label for="spc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Symptoms</label>
                        <textarea type="text" name="spc" id="spc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="symptoms" required value={spc} onChange={e => { setSpc(e.target.value) }}></textarea>
                    </div>
                    <div>
                        <label for="tab" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medicine</label>
                        <textarea type="text" name="tab" id="tab" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="medicine" required value={tab} onChange={e => { setTab(e.target.value) }}></textarea>
                    </div>
                    <button onClick={() => { doneAppointment(data) }}  class=" min-w-56 w-full max-h-12 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
                    </div>
            </div>
        </div>
    )
}