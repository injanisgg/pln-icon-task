import React from 'react'
import PLN_LOGO from '../assets/pln.png'
import ProfilePicture from '../assets/profile.png'
import { useLocation } from 'react-router-dom'
import Gear from '../assets/gear.png';

export default function Navbar({ onOpen }) {
  const location = useLocation();

  const isHome = location.pathname === '/'

  return (
    <>
    {isHome
      ? <div className='flex justify-between border-b border-gray-200 shadow-b p-5'>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <img src={Gear} alt="Gear Icon" className="w-10" /> DASHBOARD
        </h1>
        <button onClick={onOpen} className="fa-solid fa-xl fa-chevron-right"></button>
      </div>
      : <header className='bg-gradient-to-r from-first-blue to-second-blue p-3 text-white'>
          <div className="flex justify-between">
            <span className='flex items-center gap-3'>
                <button onClick={onOpen} className="block md:hidden">
                  <i className="fa-solid fa-bars fa-lg"></i>
                </button>
                <img src={PLN_LOGO} alt="PLN LOGO" className='w-10' />
                <h2 className='font-bold'>iMeeting</h2>
            </span>
            <span className='flex gap-2 items-center'>
                <i className="fa-regular fa-bell fa-lg"></i>
                <img src={ProfilePicture} alt="Profile Picture" className='size-10 rounded-full'/>
            </span>
          </div>
        </header>
    }
    </>
  )
}
