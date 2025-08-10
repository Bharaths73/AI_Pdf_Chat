import React, { useState } from 'react'
import MessageBox from './MessageBox'
import { RiRobotFill } from "react-icons/ri"
import { FaUser } from "react-icons/fa"

function Chat() {
  const [messages,setMessages]=useState([])
  const [isTyping, setIsTyping] = useState(false)

  return (
    <div className='w-full h-full flex flex-col'>
        <div className='w-full flex justify-center items-center p-4'>
            <div className='flex items-center gap-x-3'>
              <div className='w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full animate-pulse'></div>
              <h2 className='text-xl font-bold tracking-wide bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent'>
                Your AI Assistant
              </h2>
            </div>
        </div>
        <div className={`w-full flex-1 overflow-y-auto scroll-smooth flex flex-col p-3 sm:p-6 gap-y-4 scrollbar-custom`}>
            {
                messages.length!==0 ? (<div className='space-y-6'>
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message?.sender === 'User' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                            <div className={`flex items-end gap-x-2 max-w-[85%] sm:max-w-[75%] ${message?.sender === 'User' ? 'flex-row-reverse ml-2 sm:ml-4' : 'mr-2 sm:mr-4'}`}>
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                                    message?.sender === 'User' 
                                        ? 'bg-gradient-to-br from-gray-600 to-gray-700' 
                                        : 'bg-gradient-to-br from-gray-500 to-gray-600'
                                }`}>
                                    {message?.sender === 'User' ? (
                                        <FaUser className="w-4 h-4 text-white" />
                                    ) : (
                                        <RiRobotFill className="w-4 h-4 text-white" />
                                    )}
                                </div>
                                
                                {/* Message Bubble */}
                                <div className="relative group">
                                    <div className={`relative p-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                                        message?.sender === 'User' 
                                            ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-br-md' 
                                            : 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 text-white rounded-bl-md border border-gray-700/50'
                                    }`}>
                                        <div className='flex flex-col gap-y-2'>
                                            <div className="flex items-center gap-x-2">
                                                <p className={`text-xs font-bold tracking-wider uppercase ${message?.sender === 'User' ? 'text-gray-200' : 'text-gray-400'}`}>
                                                    {message?.sender}
                                                </p>
                                            </div>
                                            <p className='text-sm leading-relaxed'>{message?.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start animate-fade-in">
                            <div className="flex items-end gap-x-2 max-w-[85%] sm:max-w-[75%] mr-2 sm:mr-4">
                                {/* Assistant Avatar */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-gray-500 to-gray-600">
                                    <RiRobotFill className="w-4 h-4 text-white" />
                                </div>
                                
                                {/* Typing Message Bubble */}
                                <div className="relative group">
                                    <div className="relative p-4 rounded-2xl shadow-lg backdrop-blur-sm bg-gradient-to-br from-gray-800/90 to-gray-900/90 text-white rounded-bl-md border border-gray-700/50">
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-2">
                                                <p className="text-xs font-bold tracking-wider uppercase text-gray-400">ASSISTANT</p>
                                            </div>
                                            <div className="flex items-center gap-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>) : (<div className='flex flex-col justify-center items-center gap-y-8 my-auto min-h-[60%]'>
                    <div className='text-center space-y-4'>
                        <div className='w-16 h-16 mx-auto bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center'>
                            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                            </svg>
                        </div>
                        <h3 className='text-xl font-semibold text-white'>Welcome to PDF Chat</h3>
                        <p className='text-gray-300 text-base max-w-md mx-auto leading-relaxed'>
                            Upload a PDF document to start an intelligent conversation with your AI assistant.
                        </p>
                    </div>
                </div>)
            }
        </div>
        <MessageBox messages={messages} setMessages={setMessages} isTyping={isTyping} setIsTyping={setIsTyping}/>
    </div>
  )
}

export default Chat