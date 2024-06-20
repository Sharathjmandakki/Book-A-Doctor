import React from 'react'
import Login from './Login & Register/Login'
import Register from './Login & Register/Register'
import Update from './Login & Register/Update'
import UpdateImage from './Login & Register/UpdateImage'
import About from './Login & Register/About'
import UpdatePass from './Login & Register/UpdatePass'
import User from './Users/User'
import MyAppointment from './Users/MyAppointment'
import MyDoctor from './Users/MyDoctor'
import Help from './Users/Help'
import Admin from './Admin/Admin'
import Doctor from './Doctor/Doctor'
import { Route, Routes } from 'react-router-dom'
import './index.css';
import Home from './Users/Home'
import BookASlot from './Doctor/BookASlot'
import DoctorHome from './Doctor/DoctorHome'
import VisitAppointment from './Doctor/Appointment/VisitAppointment'
import AllUsers from './Admin/User Info/AllUsers'
import AllMessages from './Admin/AllMessages'
import AddUser from './Admin/User Info/AddUser'
import AdminHome from './Admin/User Info/AdminHome'
import SuccessAppo from './Doctor/Appointment/SuccessAppo'
function App() {
  const username = window.localStorage.getItem("username")
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/update' element={<Update />} />
        <Route path='/updatepass' element={<UpdatePass />} />
        <Route path='/' element={<User />}>
          <Route path={username + "/"} element={<About />}>
            <Route path='editimg' element={<UpdateImage />} />
            <Route path='update' element={<Update />} />
            <Route path='updatepass' element={<UpdatePass />} />
          </Route>
          <Route path='mydoctor' element={<MyDoctor />} />
          <Route path='myAppointment' element={<MyAppointment />} />
          <Route path='help' element={<Help />} />
          <Route path='' element={<Home />} />
          <Route path='bookaslot' element={<BookASlot />} />
        </Route>
        <Route path='/Admin/' element={<Admin />}>
          <Route path='' element={<AdminHome />} />
          <Route path='allusers' element={<AllUsers />}>
            <Route path='addUser' element={<AddUser />} />
            <Route path='upgrade' element={<Update />} />
          </Route>
          <Route path='allmessage' element={<AllMessages />}>
          </Route>
          <Route path={username + "/"} element={<About />}>
            <Route path='editimg' element={<UpdateImage />} />
            <Route path='updatepass' element={<UpdatePass />} />
          </Route>
        </Route>
        <Route path='/doctor/' element={<Doctor />}>
          <Route path='' element={<DoctorHome/>}>
          <Route path='save' element={<SuccessAppo />} />
          </Route>
          <Route path='help' element={<Help />} />
          <Route path='appointment' element={<VisitAppointment />} />
          <Route path={username + "/"} element={<About />}>
            <Route path='editimg' element={<UpdateImage />} />
            <Route path='update' element={<Update />} />
            <Route path='updatepass' element={<UpdatePass />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
