import { useState } from 'react'
import Upload from './components/Upload'
import Chat from './components/Chat'
import Navbar from './components/Navbar'

function App() {
  const [displayNav, setdisplayNav]=useState(true)

  const handleNavbar=(e)=>{
    console.log("navbar");
    setdisplayNav(displayNav=>!displayNav)
  }

  return (

    <div className='min-h-screen w-screen bg-black flex flex-col overflow-x-hidden'>
      <Navbar handleNavbar={handleNavbar}/>
      <div className={`w-full h-[100vh] flex flex-row lg:mb-0`}>
          <div className={`text-white w-[85vw] max-w-[20rem] h-[100vh] pt-16 flex flex-col bg-black backdrop-blur-xl border-r border-gray-800 shadow-2xl transform ${displayNav ? 'translate-x-0 lg:static' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 fixed lg:relative`}>
           <Upload/>
         </div>
      <div className={`h-full py-5 pt-20 transition-all duration-500 ease-in-out ${displayNav ? 'flex-1 md:px-8 px-4' : 'fixed inset-0 pt-20 flex items-start justify-center px-4'}`}>
      <div className={`text-white z-30 h-full bg-black backdrop-blur-xl flex flex-col transition-all duration-500 ease-in-out ${displayNav ? 'w-full' : 'w-full max-w-4xl'}`}>
        <Chat/>
      </div>
      </div>
      </div>
    </div>
  )
}

export default App
