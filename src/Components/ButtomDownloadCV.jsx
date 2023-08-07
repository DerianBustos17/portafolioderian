import React from 'react'

const ButtomDownloadCV = () => { 
    return (
        <a href='/CV_DerianBustosR.pdf' target="_blank" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center w-full md:w-56 md:justify-center">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Download CV
        </a>
    );
}
export default  ButtomDownloadCV ;