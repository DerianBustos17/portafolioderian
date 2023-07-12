import React, { useRef, useEffect }  from 'react'
const AboutMe = () => { 
    const aboutMeRef = useRef(null);

    useEffect(() => {
      if (aboutMeRef.current) {
        aboutMeRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, []);
    return (
      <div ref={aboutMeRef}>
            <div className='flex flex-col h-screen  items-center  justify-center p-4 ' >
          
<h1 className='text-fuchsia-500 text-2xl pb-5 font-bold'>About me:</h1>
<h2 className=' text-lime-600 text-xl font-bold text-left w-full pb-2'> Who I am? </h2>
<p className='text-lg text-justify' >I'm Derian Bustos, study in University of Costa Rica, Informática Empresarial, apasionaty the world tecnology, love the software developer, like Front-End and Back-End.</p>
           <img className='w-36' src="nave_AboutMe.gif" alt="" />
            </div>
      </div>
    );
}
export default  AboutMe ;