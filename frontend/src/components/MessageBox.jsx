import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { IoSend } from "react-icons/io5";

function MessageBox({messages,setMessages, isTyping, setIsTyping}) {
  const [message, setMessage]=useState("")

  const messageHandler=(e)=>{
    const chat=e.target.value;
    setMessage(chat);
  }

  const sendChat=async(e)=>{
    e.preventDefault();
    if (!message.trim() || isTyping) return;
    
    const userMessage = message;
    setMessage("");
    setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: 'User' }]);
    setIsTyping(true);
    
    try {
      console.log("sending-----");
      
      const response = await axios.post("http://localhost:4000/api/v1/chat/pdf-chat", {message:userMessage}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if(response.status===200){
        const data = response.data.data;
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, { text: data, sender: 'Assistant' }]);
        console.log("Response from server:", data);
      }
    } catch (error) {
      console.log("Error sending message ",error);
      setIsTyping(false);
      // Add error message to chat
      setMessages((prevMessages) => [...prevMessages, { 
        text: "Sorry, I'm having trouble connecting. Please try again.", 
        sender: 'Assistant' 
      }]);
    }
  }

  return (
    <div className='w-full p-3 sm:p-4'>
        <div className='flex flex-row items-center gap-x-2 sm:gap-x-4 max-w-4xl mx-auto'>
            <div className='flex-1 relative'>
                <input 
                    className='w-full h-12 bg-gray-700/50 border border-gray-600/50 focus:border-gray-400/50 rounded-xl outline-none text-white text-base px-4 pr-12 placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:ring-gray-400/20 backdrop-blur-sm' 
                    placeholder='Type your message...' 
                    onChange={messageHandler} 
                    name='chat' 
                    value={message}
                    onKeyPress={(e) => e.key === 'Enter' && sendChat(e)}
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-pulse'></div>
                </div>
            </div>
            <button 
                className='group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white h-12 px-4 sm:px-6 rounded-xl font-medium cursor-pointer transition-all duration-300 shadow-lg hover:shadow-gray-500/25 hover:scale-105 flex items-center justify-center min-w-[3rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100' 
                onClick={sendChat}
                disabled={!message.trim() || isTyping}
            >
                <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <IoSend className='text-xl relative z-10 group-hover:translate-x-1 transition-transform duration-300'/>
            </button>
        </div>
    </div>
  )
}

export default MessageBox