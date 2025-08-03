import React from 'react'
import MessageBox from './MessageBox'

function Chat() {
    let arr=[];
    let ai=true
    for(let i=0;i<30;i++){
        arr.push({
            isAI:!ai
        })
        ai=!ai
    }
    
  return (
    <div className='w-full h-full'>
        <div className='w-full max-h-max flex justify-center items-center bg-gray-700 border-b-4 border-black  p-2 text-xl font-semibold tracking-widest'>
            AI PDF CHAT
        </div>
        <div className={`w-full h-[84%] bg-gray-800 overflow-y-auto scroll-smooth flex flex-col p-5 gap-y-5 scrollbar-none`}>
            {
                arr.map((ele)=>(
                    <div className={` ${ele.isAI ? 'self-start':'self-end'} rounded flex flex-col max-w-max bg-gray-600 px-3 py-2`}>Message</div>
                ))
            }
        </div>
        <MessageBox/>
    </div>
  )
}

export default Chat