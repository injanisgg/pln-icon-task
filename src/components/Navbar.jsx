import React from 'react'
import PLN_LOGO from '../assets/pln.png'
import ProfilePicture from '../assets/profile.png'

export default function Navbar({ onOpen }) {
  return (
    <header className='bg-gradient-to-r from-first-blue to-second-blue p-3 text-white'>
      <div className="flex justify-between">
        <span className='flex items-center gap-3'>
            <button onClick={onOpen} className="fa-solid fa-bars fa-lg"></button>
            <img src={PLN_LOGO} alt="PLN LOGO" className='w-10' />
            <h2 className='font-bold'>iMeeting</h2>
        </span>
        <span className='flex gap-2 items-center'>
            <i className="fa-regular fa-bell fa-lg"></i>
            <img src={ProfilePicture} alt="Profile Picture" className='size-10 rounded-full'/>
        </span>
      </div>
    </header>
  )
}
