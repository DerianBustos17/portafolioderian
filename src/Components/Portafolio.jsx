import React, {useEffect } from 'react';
import Contact from './Contact';
import { Fade } from 'react-awesome-reveal';

const Portafolio = () => {
    useEffect(() => {
        const removeHoverClass = () => {
          document.querySelectorAll('.card').forEach((card) => {
            card.classList.remove('hover');
            });
          document.querySelectorAll('a.hover').forEach((anchor) => {
            anchor.classList.remove('hover');
            });
            };
        const delay = 1800;
        const timer = setTimeout(removeHoverClass, delay);
        return () => clearTimeout(timer);
      }, []);
    return (
        <div id='portafolio' className="flex flex-col justify-around  h-screen items-center bg-white dark:bg-gray-800">
            <Fade>
            <h1 className="text-2xl font-bold text-black dark:text-gray-200 py-8 border-b-4 border-indigo-400 ">Portafolio</h1>
            </Fade>
            <Fade>
                <p className="text-xl text-black dark:text-amber-400 text-justify mx-2">Here, you can see the projects I have worked on.</p>
                </Fade>
                <Fade>
                    <div className="card hover:translate-y-[-4px] hover:shadow-lg ">
                        <div className="card-img" style={{backgroundImage:'url(/imagen_portafolio.jpg)',}}>
                            <div className="overlay opacity-0 bg-black/60 transition-opacity duration-200">
                                <div className="overlay-content">
                                    <a href="https://github.com/DerianBustos17/portafolioderian.git"  className="hover:bg-amber-400 hover:border-amber-400 hover:text-black py-2 px-4 rounded-full" >View Project</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-content">
                            <a>
                                <h2 className="text-lg font-semibold text-center">Portfolio </h2>
                                    <p className="text-sm text-gray-700">Hi, here see my code the project in Github.</p>
                            </a>
                        </div>
                    </div>
                    </Fade>
                    <Fade>
                    <h2 className='text-2xl text-orange-500 font-bold '>Contact me</h2>
                    </Fade>
                    <Fade>
                    <Contact></Contact>
                    </Fade>           
        </div> 
    );
}
export default  Portafolio ;