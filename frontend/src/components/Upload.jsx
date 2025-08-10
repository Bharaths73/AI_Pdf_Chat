import axios from 'axios';
import React, { useState } from 'react'
import { FaUpload } from "react-icons/fa";
import { MdDeleteForever} from "react-icons/md";

function Upload() {
    const [selectedDocument, setSelectedDocument] = useState(null);

    const handleFileUpload=async()=>{
        const el=document.createElement('input');
        el.setAttribute('type','file')
        el.setAttribute('accept','application/pdf')

        el.addEventListener('change',async(e)=>{
            const file = e.target?.files?.[0];
            console.log(file);

            if (!file) return;

            // Check file size (limit to 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB');
                return;
            }

            const formData = new FormData();
            formData.append('pdf', file);

            try {
                const response = await axios.post('http://localhost:4000/api/v1/pdf/upload/pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });

                if (response.status === 200) {
                console.log("File uploaded successfully");
                // Add success feedback here
                }
            } catch (error) {
                console.error("Upload failed:", error);
                // Add error feedback here
                alert('Upload failed. Please try again.');
            }
        })
        el.click()
    }

    const handleDocumentClick = (documentName) => {
        setSelectedDocument(documentName);
    }

    const handleDeleteClick = (e, documentName) => {
        e.stopPropagation(); // Prevent triggering document selection when clicking delete
        console.log(`Delete ${documentName}`);
        // Add delete logic here
    }

  return (

    <div className='flex flex-col w-full h-full items-center justify-start gap-y-6 mt-8 px-4'>
        <div className='w-full flex flex-col items-center gap-y-4'>
          <h3 className='text-lg font-semibold text-gray-300 tracking-wide'>Document Library</h3>
          <button className='group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white w-full max-w-[16rem] py-3 px-6 rounded-xl cursor-pointer font-bold flex gap-x-3 items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gray-500/25 hover:scale-105' onClick={handleFileUpload}>
            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <span className='relative z-10'>Upload PDF</span>
            <FaUpload className='relative z-10 text-white font-bold text-xl group-hover:rotate-12 transition-transform duration-300'/>
          </button>
        </div>
        
        <div className='flex flex-col w-full py-4 gap-y-3 px-2 overflow-y-auto scroll-smooth scrollbar-custom'>
          <h4 className='text-sm font-medium text-gray-300 mb-2 px-2'>Recent Files</h4>
          <div 
            className={`group py-4 px-4 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm cursor-pointer relative overflow-hidden ${
              selectedDocument === 'Sample Document.pdf' 
                ? 'bg-gradient-to-r from-gray-700/80 to-gray-600/80 border-gray-400 shadow-xl shadow-gray-500/30 scale-[1.02]' 
                : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-gray-700/30 hover:to-gray-600/30 border-gray-700/50 hover:border-gray-500/50 hover:scale-[1.01]'
            }`}
            onClick={() => handleDocumentClick('Sample Document.pdf')}
          >
            {/* Selected indicator */}
            {selectedDocument === 'Sample Document.pdf' && (
              <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-300'></div>
            )}
            
            <div className='flex justify-between items-center'>
              <div className='flex flex-col gap-y-1'>
                <div className='flex items-center gap-x-2'>
                  <p className={`text-sm font-semibold transition-colors ${
                    selectedDocument === 'Sample Document.pdf' 
                      ? 'text-white' 
                      : 'text-gray-200 group-hover:text-white'
                  }`}>Sample Document.pdf</p>
                  {selectedDocument === 'Sample Document.pdf' && (
                    <div className='w-2 h-2 bg-gray-300 rounded-full animate-pulse'></div>
                  )}
                </div>
                <p className='text-xs text-gray-400'>2.3 MB • Just now</p>
              </div>
              <MdDeleteForever 
                className={`text-2xl cursor-pointer hover:scale-110 transition-all duration-200 ${
                  selectedDocument === 'Sample Document.pdf' 
                    ? 'text-red-300 hover:text-red-200' 
                    : 'text-red-400 hover:text-red-300'
                }`}
                onClick={(e) => handleDeleteClick(e, 'Sample Document.pdf')}
              />
            </div>
          </div>
          <div 
            className={`group py-4 px-4 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm cursor-pointer relative overflow-hidden ${
              selectedDocument === 'Research Paper.pdf' 
                ? 'bg-gradient-to-r from-gray-700/80 to-gray-600/80 border-gray-400 shadow-xl shadow-gray-500/30 scale-[1.02]' 
                : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-gray-700/30 hover:to-gray-600/30 border-gray-700/50 hover:border-gray-500/50 hover:scale-[1.01]'
            }`}
            onClick={() => handleDocumentClick('Research Paper.pdf')}
          >
            {/* Selected indicator */}
            {selectedDocument === 'Research Paper.pdf' && (
              <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-300'></div>
            )}
            
            <div className='flex justify-between items-center'>
              <div className='flex flex-col gap-y-1'>
                <div className='flex items-center gap-x-2'>
                  <p className={`text-sm font-semibold transition-colors ${
                    selectedDocument === 'Research Paper.pdf' 
                      ? 'text-white' 
                      : 'text-gray-200 group-hover:text-white'
                  }`}>Research Paper.pdf</p>
                  {selectedDocument === 'Research Paper.pdf' && (
                    <div className='w-2 h-2 bg-gray-300 rounded-full animate-pulse'></div>
                  )}
                </div>
                <p className='text-xs text-gray-400'>1.8 MB • 5 mins ago</p>
              </div>
              <MdDeleteForever 
                className={`text-2xl cursor-pointer hover:scale-110 transition-all duration-200 ${
                  selectedDocument === 'Research Paper.pdf' 
                    ? 'text-red-300 hover:text-red-200' 
                    : 'text-red-400 hover:text-red-300'
                }`}
                onClick={(e) => handleDeleteClick(e, 'Research Paper.pdf')}
              />
            </div>
          </div>
          
          <div className='text-center py-8'>
            <p className='text-sm text-gray-400'>Upload a PDF to start chatting</p>
          </div>
        </div>
    </div>
  )
}

export default Upload