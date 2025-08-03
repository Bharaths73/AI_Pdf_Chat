import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Upload from './components/Upload'
import Chat from './components/Chat'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='min-h-screen w-screen bg-gray-950 flex items-center overflow-x-hidden flex-col'>
      <Navbar/>
      <div className='w-11/12 flex flex-col lg:flex-row lg:mb-0 mb-5 gap-x-10'>
        <div className='text-white lg:w-[50%] lg:max-h-[42rem]  w-full mt-7 flex flex-col items-center justify-center bg-white/10 backdrop-blur-3xl rounded-lg border-4 border-white/20 lg:py-6 py-2 shadow-lg'>
        <Upload/>
      </div>
      <div className='text-white lg:w-[50%] w-full h-[42rem] bg-gray-700 mt-7 flex flex-col rounded-lg border-4 border-gray-500'>
        <Chat/>
      </div>
      </div>
    </div>
  )
}

export default App
