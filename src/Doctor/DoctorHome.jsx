import React, { useEffect, useState } from 'react'
import Appointments from './Appointment/Appointments'
import axios from 'axios';
import NumData from '../Admin/User Info/NumData';
import VisitAppointment from './Appointment/VisitAppointment';

export default function DoctorHome() {
  const username=window.localStorage.getItem("username")
  const [num,setNum]=useState([]);
  useEffect(()=>{
    async function data(){
      const response=await axios.get(`http://localhost:8080/visit/numDocAppointment/${username}`)
      setNum(response.data)
    }
    data();
  },[])
  return (
    <div className='m-5'>
      <div className='mb-5 flex flex-wrap justify-between'>
        <NumData txt="Number Of Appointments" no={num[0]}/>
        <NumData txt="Number Of Patients Visited" no={num[1]}/>
      </div>
      <hr/>
      <h2 className='mt-2 mb-2 text-white text-ellipsis text-4xl text-center font-semibold italic'>Appointments</h2>
      <Appointments/>
    </div>
  )
}
