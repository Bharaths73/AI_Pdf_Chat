import React, { useState } from 'react'
import MessageBox from './MessageBox'

function Chat() {
  const [messages,setMessages]=useState([])

  return (
    <div className='w-full h-full'>
        <div className='w-full max-h-max flex justify-center items-center bg-gray-700 border-b-4 border-black  p-2 text-xl font-semibold tracking-widest'>
            Your AI Assistant
        </div>
        <div className={`w-full h-[84%] bg-gray-800 overflow-y-auto scroll-smooth flex flex-col p-5 gap-y-5 scrollbar-none`}>
            {
                messages.length!==0 ? (<div>
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message?.sender === 'User' ? 'justify-end' : 'justify-start'} mb-7`}>
                            <div className={`p-3 rounded-md max-w-[70%] ${message?.sender === 'User' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-white'} flex flex-col gap-y-0.5`}>
                                <p className={`text-sm ${message?.sender === 'User' ? 'text-lime-300':'text-emerald-300'} font-semibold`}>{message?.sender}</p>
                                <p>{message?.text}</p>
                            </div>
                        </div>
                    ))}
                </div>) : (<div className='flex flex-col justify-center items-center gap-y-5 my-auto'>
                    <p className='text-gray-400 text-lg font-semibold'>Chat with the AI assistant by uploading a PDF file.</p>
                </div>)
            }
        </div>
        <MessageBox messages={messages} setMessages={setMessages}/>
    </div>
  )
}

export default Chat