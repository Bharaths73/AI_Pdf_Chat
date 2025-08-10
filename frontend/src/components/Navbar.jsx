import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar({handleNavbar}) {
  return (
      <nav className='w-full h-16 bg-black backdrop-blur-xl flex justify-between items-center px-6 shadow-2xl border-b border-gray-800 fixed z-50'>
      <div className='flex justify-center items-center gap-x-4'>
      <RxHamburgerMenu className='text-white font-bold text-3xl cursor-pointer hover:text-gray-300 transition-colors duration-200' onClick={handleNavbar}/>
        <header className='text-2xl font-bold ml-2 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent'>
            Chat with Your PDF
        </header>
      </div>
      <div className='hidden md:flex items-center space-x-2'>
        <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
        <span className='text-sm text-green-400 font-medium'>AI Ready</span>
      </div>
    </nav>
  )
}

export default Navbar