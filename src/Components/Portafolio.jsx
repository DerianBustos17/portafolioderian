import React, {useEffect } from 'react';
import Contact from './Contact';

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
        <div className="flex flex-col h-screen items-center bg-gray-200">
        <h1 className="text-2xl font-bold text-sky-700 py-8">Portafolio</h1>
        <p className="text-xl text-amber-400">Here you can see the projects I have worked on.</p>
        <div className="card hover:translate-y-[-4px] hover:shadow-lg">
          <div className="card-img" style={{
            backgroundImage:
              'url(/imagen_portafolio.jpg)',
          }}>
            <div className="overlay opacity-0 bg-black/60 transition-opacity duration-200">
              <div className="overlay-content">
                <a href="https://github.com/DerianBustos17/portafolioderian.git"  className="hover:bg-amber-400 hover:border-amber-400 hover:text-black py-2 px-4 rounded-full" >View Project</a>
              </div>
            </div>
          </div>
      
          <div className="card-content">
            <a >
              <h2 className="text-lg font-semibold">Portafolio</h2>
              <p className="text-sm text-gray-700">Hi, here see my code the project in Github.</p>
            </a>
          </div>
        </div>

        <h2 className='text-2xl text-orange-500 font-bold'>Contact me</h2>

<Contact></Contact>
      </div>
    
      
      
      
    );
}
export default  Portafolio ;