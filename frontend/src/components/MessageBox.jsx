import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { IoSend } from "react-icons/io5";

function MessageBox() {
  const [message, setMessage]=useState("")

  const messageHandler=(e)=>{
    const chat=e.target.value;
    setMessage(chat);
  }

  const sendChat=async(e)=>{
    e.preventDefault();
    try {
      console.log("sending-----");
      
      const response = await axios.post("http://localhost:4000/chat", {message:message}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if(response.status===200){
        console.log("Message sent successfully ",response?.data?.data);
      }
    } catch (error) {
      console.log("Error sending message ",error);
    }
  }

  return (
    <div className='w-full h-16 bg-transparent flex flex-row justify-between items-center px-5 gap-x-5'>
        <input className='w-full h-10 border-b-2 border-b-gray-200 outline-none text-lg px-1.5 pb-1' placeholder='Enter the message' onChange={messageHandler} name='chat'></input>
        <button className=' py-2 px-5 border-black rounded-md bg-amber-300 text-black font-bold cursor-pointer' onClick={sendChat}>
        <IoSend className='text-2xl'/>
        </button>
    </div>
  )
}

export default MessageBox