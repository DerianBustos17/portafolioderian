import React  from 'react'
import Skills from './Skills';

const AboutMe = () => { 
    return (
        <div id='aboutme' className='flex flex-col justify-around  h-screen  items-center bg-gray-800' >   
            <h1 className='text-fuchsia-500 text-4xl font-bold pt-10'>About me:</h1>
              <h2 className=' text-lime-600 text-3xl font-bold text-center w-full py-7 '> Who I am? </h2>
                <p className='font-bold text-xl text-justify text-neutral-400'>I'm Derian Bustos, Software Developer. Front-End/Back-End. </p>
                  <p className='text-lg text-justify text-white p-4' >I'm Derian Bustos, study at University of Costa Rica, Informática Empresarial, passionate the world tecnology, love the world the software developer, like Front-End and Back-End.</p>
                    <a href='/CV_DerianBustosR.pdf' target="_blank" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center w-6/12 md:w-56 md:justify-center">
                      <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                          Download CV
                    </a>
                          <div className='h-80'>
              <h2 className='text-lime-400 text-3xl font-bold pt-8 md:py-11'> Skills</h2>         
                        <Skills></Skills>  
                          </div>
        </div> 
    );
}
export default  AboutMe ;

