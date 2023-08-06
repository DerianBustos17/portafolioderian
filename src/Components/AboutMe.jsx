import React from 'react';
import Skills from './Skills';
import { Fade } from 'react-awesome-reveal';

const AboutMe = () => {
  return (
    <div id='aboutme' className='flex flex-col justify-around h-screen items-center bg-white dark:bg-gray-800'>
      <Fade>
        <h1 className='text-fuchsia-500 text-4xl font-bold pt-10'>About me:</h1>
      </Fade>
      <Fade>
        <h2 className='text-lime-600 text-3xl font-bold text-center w-full py-7'>Who I am?</h2>
      </Fade>
      <Fade>
        <p className='font-bold text-2xl text-justify text-neutral-400'>
          I'm Derian Bustos, Software Developer. Front-End/Back-End.
        </p>
      </Fade>
      <Fade>
        <p className='text-xl text-justify text-black dark:text-white p-4'>
          I'm Derian Bustos, study at University of Costa Rica, Informática Empresarial, passionate about the world of technology,
          love the world of software development, like Front-End and Back-End.
        </p>
      </Fade>
      <Fade>
        <a href='/CV_DerianBustosR.pdf' target="_blank" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center w-full md:w-56 md:justify-center">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Download CV
        </a>
      </Fade>
      <div className='h-80'>
        <Fade>
          <h2 className='text-lime-700 dark:text-lime-400 text-3xl font-bold pt-8 md:py-11'>Skills</h2>
        </Fade>
        <Fade>
          <Skills></Skills>
        </Fade>
      </div>
    </div>
  );
};

export default AboutMe;
