import React from 'react'
import { NavLink } from 'react-router-dom'

function SideBar({ isOpen, onClose }) {
  return (
    <>
      {/* overlay */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-gray-50 bg-opacity-50 z-40"></div>
      )}

      {/* sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300`}
      >
        <div className='flex items-center justify-between border-b border-second-blue'>
            <h3 className='ml-5 font-semibold'>Menu</h3>
            <button className="p-4 text-right w-full text-gray-700" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
        <ul className="p-4 space-y-4 text-gray-800">
          <li>
            <NavLink 
             to="/" 
             onClick={onClose}
             className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive ? "bg-gradient-to-r from-first-blue to-second-blue text-white" : "text-primary"}`}>
             {({ isActive }) => 
              <span className='flex gap-2 items-center'>
                <i className={isActive ? 'fa-solid fa-house' : 'fa-regular fa-house'}></i>
                Dashboard
             </span>
             }
            </NavLink>
          </li>
          <li>
            <NavLink 
             to="/form" 
             onClick={onClose}
             className={({ isActive }) => `block px-3 py-2 rounded-md ${isActive ? 'bg-gradient-to-r from-first-blue to-second-blue text-white' : 'text-primary'}`}>
             {({ isActive }) => 
              <span className="flex gap-2 items-center">
                <i className={isActive ? "fa-solid fa-file" : "fa-regular fa-file"}></i>
                Form
              </span>
             }
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SideBar