import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function MyAppointment() {
  const username = window.localStorage.getItem("username")
  const [opt, setOpts] = useState([]);
  const [visit, setVisit] = useState([]);
  const navigate = useNavigate();
  useState(() => {
    async function data() {
      if (username !== null) {
        const response = await axios.get(`http://localhost:8080/myAppointment/${username}`)
        setOpts(response.data)
        const vst = await axios.get(`http://localhost:8080/visit/myAppointments/${username}`)
        setVisit(vst.data)
      } else {
        navigate('/login', { replace: true })
      }
    }
    data();
  }, [])
  const cancelAppointment = async (u) => {
    const response = await axios.delete(`http://localhost:8080/deleted/appointment/${u.id}`)
    alert(response.data)
    navigate("/")
  }
  return (
    <div class=" relative flex justify-center overflow-x-auto shadow-md sm:rounded-lg m-5 p-5">
      {(opt === null && visit===null) ?
        <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No result found</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">Please reload the site or book Opp</p>
        </div> : <div><table class="mb-6 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className='text-4xl font-bold italic m-2'>Booked Slot</caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Appointment Id
              </th>
              <th scope="col" class="px-6 py-3">
                Doctor Name
              </th>
              <th scope="col" class="px-6 py-3">
                Specialization
              </th>
              <th scope="col" class="px-6 py-3">
                Slot at
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {opt.map((u) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className='px-6 py-6'>
                  #{u.id}
                </td>
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img class="w-10 h-10 rounded-full" src={`http://localhost:8080/users/${u.doctor}/image`} alt={u.doctor} />
                  <div class="ps-3">
                    <div class="text-base font-semibold">Dr. {u.doctor}</div>
                  </div>
                </th>
                <td class="px-6 py-4">
                  {u.spc}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    {u.time}
                  </div>
                </td>
                <td class=" px-6 py-4">
                  <button onClick={() => { cancelAppointment(u) }} class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline-offset-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr/>
        <table class=" mt-6 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className='text-4xl font-bold italic m-2'>Visited</caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Appointment Id
                </th>
                <th scope="col" class="px-6 py-3">
                 Doctor  Name
                </th>
                <th scope="col" class="px-6 py-3">
                Symptoms
                </th>
                <th scope="col" class="px-6 py-3">
                  visited on
                </th>
                <th scope="col" class="px-6 py-3">
                  medicine given
                </th>
              </tr>
            </thead>
            <tbody>
              {visit.map((u) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="px-6 py-4">
                    {u.oid}
                  </td>
                  <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src={`http://localhost:8080/users/${u.doctor}/image`} alt={u.doctor} />
                    <div class="ps-3">
                      <div class="text-base font-semibold">{u.doctor}</div>
                    </div>
                  </th>
                  <td class="px-6 py-4">
                    {u.spc}
                  </td>
                  <td class="px-6 py-4">
                    {u.time}
                  </td>
                  <td class="px-6 py-4">
                    {u.tabs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}
