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
    <div className='flex flex-col justify-center items-center gap-y-7 bg-gray-900 w-[60%] border border-gray-600 py-9 cursor-pointer rounded-lg' onClick={handleFileUpload}>
       <FaUpload className='text-gray-400 text-5xl'/>
       <button className='text-base bg-amber-300 text-black w-[70%] py-2 px-5 border-gray-950 rounded-md cursor-pointer font-bold'>Upload</button>
    </div>
  )
}

export default Upload