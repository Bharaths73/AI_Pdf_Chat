import React from 'react'

function MessageBox() {
  return (
    <div className='w-full h-16 bg-transparent flex flex-row justify-between items-center px-5 gap-x-5'>
        <input className='w-full h-10 border-b-2 border-b-gray-200 outline-none text-lg px-1.5 pb-1' placeholder='Enter the message'></input>
        <button className=' py-2 px-5 border-black rounded-md bg-amber-300 text-black font-bold cursor-pointer'>Send</button>
    </div>
  )
}

export default MessageBox