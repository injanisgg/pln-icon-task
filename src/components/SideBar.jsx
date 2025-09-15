import React from "react";
import { NavLink } from "react-router-dom";

function SideBar({ isOpen, onClose }) {
  return (
    <>
      {/* ===== MOBILE SIDEBAR  ===== */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 lg:hidden`}
      >
        <div className="flex items-center justify-between border-b border-second-blue">
          <h3 className="ml-5 font-semibold">Menu</h3>
          <button
            className="p-4 text-gray-700"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <ul className="p-4 space-y-4 text-gray-800">
          <li>
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-gradient-to-r from-first-blue to-second-blue text-white"
                    : "text-primary"
                }`
              }
            >
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-house"></i> Dashboard
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/form"
              onClick={onClose}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-gradient-to-r from-first-blue to-second-blue text-white"
                    : "text-primary"
                }`
              }
            >
              <span className="flex gap-2 items-center">
                <i className="fa-solid fa-file"></i> Form
              </span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* DESKTOP: icon-only (collapsed) -> expand on hover */}
      <aside
        className="hidden lg:flex group fixed top-20 left-0 h-full bg-white shadow-lg z-50
                   w-16 hover:w-64 transition-all duration-300 overflow-hidden flex-col"
      >
        <nav className="flex-1">
          <ul className="flex flex-col">
            {/* Dashboard */}
            <li>
              <NavLink to="/" end className="block">
                {({ isActive }) => (
                  <div className="flex items-center w-full mx-12 my-1 transition-all justify-center group-hover:justify-start group-hover:mx-6">
                    <div className={`flex items-center justify-center py-5 px-3 rounded-lg transition-colors
                                     ${isActive ? "bg-primary text-white" : "text-primary"}`}>
                      <i className="fa-regular fa-house fa-lg" />
                    </div>

                    <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                      Dashboard
                    </span>
                  </div>
                )}
              </NavLink>
            </li>

            {/* Form */}
            <li>
              <NavLink to="/form" className="block">
                {({ isActive }) => (
                  <div className="flex items-center w-full mx-6 my-1 transition-all justify-center group-hover:justify-start">
                    <div className={`flex items-center justify-center py-5 px-3 rounded-lg transition-colors 
                                     ${isActive ? "bg-primary text-white" : "text-primary"}`}>
                      <i className="fa-regular fa-file fa-lg" />
                    </div>

                    <span className="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
                      Form
                    </span>
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;