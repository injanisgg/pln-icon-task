import React from 'react'
import PLN_LOGO from '../assets/pln.png'
import ProfilePicture from '../assets/profile.png'
import { useLocation } from 'react-router-dom'
import Gear from '../assets/gear.png';

export default function Navbar({ onOpen , showComplainBtn}) {
  const location = useLocation();

  const isHome = location.pathname === '/'

  return (
    <>
    {isHome
      ? <div className='flex justify-between border-b border-gray-200 shadow-b p-4 fixed top-0 left-0 right-0 z-40 bg-white'>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <img src={Gear} alt="Gear Icon" className="w-10" /> DASHBOARD
          </h1>
          <button onClick={onOpen} className="fa-solid fa-xl fa-chevron-right"></button>
        </div>
      : <header className='fixed bg-gradient-to-r from-first-blue to-second-blue p-3 text-white z-40 top-0 left-0 right-0'>
          <div className="flex justify-between">
            <span className='flex items-center gap-3'>
                <button onClick={onOpen} className="block lg:hidden">
                  <i className="fa-solid fa-bars fa-lg"></i>
                </button>
                <img src={PLN_LOGO} alt="PLN LOGO" className='w-10' />
                <h2 className='font-bold'>iMeeting</h2>
            </span>
            <span className='flex gap-2 md:gap-5 items-center mr-0 md:mr-5'>
              <span className='bg-gray-50/20 rounded-lg p-2 flex gap-2 items-center hover:cursor-pointer hover:border hover:border-white'>
                <i className="fa-solid fa-bullhorn"></i>
                <p className='hidden md:block'>Kontak Aduan</p>
              </span>
                <i className="fa-regular fa-bell fa-lg hover:cursor-pointer"></i>
                <span className='flex gap-1 items-center'>
                  <img src={ProfilePicture} alt="Profile Picture" className='size-10 rounded-full'/>
                  <p className='text-xs md:text-base'>John Doe</p>
                  <i className='fa-solid fa-chevron-down fa-sm hover:cursor-pointer'></i>
                </span>
            </span>
          </div>
        </header>
    }
    </>
  )
}
