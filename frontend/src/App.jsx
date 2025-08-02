import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Upload from './components/Upload'
import Chat from './components/Chat'

function App() {

  return (
    <div className='h-screen w-screen bg-gray-950 flex justify-center items-center'>
      <div className='h-full w-11/12 flex flex-row'>
        <div className='text-white w-[50%]  m-7 flex flex-col items-center justify-center px-5 bg-white/10 backdrop-blur-3xl rounded-lg border-4 border-white/20 p-6 shadow-lg'>
        <Upload/>
      </div>
      <div className='text-white w-[50%] bg-gray-700 m-7 flex flex-col rounded-lg border-4 border-gray-500'>
        <Chat/>
      </div>
      </div>
    </div>
  )
}

export default App
