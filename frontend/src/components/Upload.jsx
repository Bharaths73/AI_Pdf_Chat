import axios from 'axios';
import React from 'react'
import { FaUpload } from "react-icons/fa";

function Upload() {

    const handleFileUpload=async()=>{
        const el=document.createElement('input');
        el.setAttribute('type','file')
        el.setAttribute('accept','application/pdf')

        el.addEventListener('change',async(e)=>{
            const file = e.target?.files?.[0];
            console.log(file);

            if (!file) return;

            const formData = new FormData();
            formData.append('pdf', file);

            try {
                const response = await axios.post('http://localhost:4000/upload/pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });

                if (response.status === 200) {
                console.log("File uploaded successfully");
                }
            } catch (error) {
                console.error("Upload failed:", error);
            }
        })
        el.click()
    }

  return (
    <div className='flex flex-col justify-center items-center lg:gap-y-7 gap-y-4 bg-gray-900 w-[60%] border border-gray-600 lg:py-9 py-3 cursor-pointer rounded-lg' onClick={handleFileUpload}>
       <FaUpload className='text-gray-400 lg:text-5xl text-2xl lg:block hidden'/>
       <button className='text-base bg-amber-300 text-black w-[70%] lg:py-2 py-1.5 px-5 border-gray-950 rounded-md cursor-pointer font-bold flex gap-x-4 items-center justify-center'>
        Upload
        <FaUpload className='text-black font-bold lg:text-5xl text-xl lg:hidden block'/>
       </button>
    </div>
  )
}

export default Upload